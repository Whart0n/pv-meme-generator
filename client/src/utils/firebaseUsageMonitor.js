/**
 * Firebase Usage Monitor
 * Tracks and reports Firebase usage to help stay within budget limits
 */

// In-memory storage for usage data
const usageData = {
  reads: 0,
  writes: 0,
  bandwidth: 0, // in bytes
  startTime: Date.now(),
  dailyUsage: [] // Store daily usage data
};

// Load persisted data from localStorage
const loadPersistedData = () => {
  try {
    const saved = localStorage.getItem('firebaseUsageData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Only keep data from the last 30 days
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      usageData.dailyUsage = parsed.dailyUsage.filter(day => {
        const dayDate = new Date(day.date).getTime();
        return dayDate > thirtyDaysAgo;
      });
      usageData.reads = parsed.reads || 0;
      usageData.writes = parsed.writes || 0;
      usageData.bandwidth = parsed.bandwidth || 0;
      usageData.startTime = parsed.startTime || Date.now();
    }
  } catch (error) {
    console.warn('Failed to load Firebase usage data from localStorage:', error);
  }
};

// Save data to localStorage
const savePersistedData = () => {
  try {
    localStorage.setItem('firebaseUsageData', JSON.stringify(usageData));
  } catch (error) {
    console.warn('Failed to save Firebase usage data to localStorage:', error);
  }
};

// Reset counters for new period
const resetCounters = () => {
  usageData.reads = 0;
  usageData.writes = 0;
  usageData.bandwidth = 0;
  usageData.startTime = Date.now();
  savePersistedData();
};

// Update daily usage record
const updateDailyUsage = () => {
  const today = new Date().toDateString();
  const todayRecord = usageData.dailyUsage.find(day => day.date === today);
  
  if (todayRecord) {
    todayRecord.reads += usageData.reads;
    todayRecord.writes += usageData.writes;
    todayRecord.bandwidth += usageData.bandwidth;
  } else {
    usageData.dailyUsage.push({
      date: today,
      reads: usageData.reads,
      writes: usageData.writes,
      bandwidth: usageData.bandwidth
    });
  }
  
  // Keep only last 30 days
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  usageData.dailyUsage = usageData.dailyUsage.filter(day => {
    const dayDate = new Date(day.date).getTime();
    return dayDate > thirtyDaysAgo;
  });
  
  savePersistedData();
};

// Estimate bandwidth based on operation type and data size
const estimateBandwidth = (operation, data) => {
  // Rough estimates in bytes
  const baseSizes = {
    read: 1024, // 1KB base read
    write: 512, // 0.5KB base write
    query: 2048, // 2KB base query
  };
  
  let size = baseSizes[operation] || 1024;
  
  // If we have data, estimate its size
  if (data) {
    try {
      const jsonString = JSON.stringify(data);
      size += new TextEncoder().encode(jsonString).length;
    } catch (error) {
      // If we can't serialize, use base size
    }
  }
  
  return size;
};

// Public API
export const firebaseUsageMonitor = {
  // Record a read operation
  recordRead: (data = null) => {
    usageData.reads++;
    usageData.bandwidth += estimateBandwidth('read', data);
    savePersistedData();
  },
  
  // Record a write operation
  recordWrite: (data = null) => {
    usageData.writes++;
    usageData.bandwidth += estimateBandwidth('write', data);
    savePersistedData();
  },
  
  // Record a query operation
  recordQuery: (data = null) => {
    usageData.reads++;
    usageData.bandwidth += estimateBandwidth('query', data);
    savePersistedData();
  },
  
  // Get current usage data
  getUsageData: () => {
    return { ...usageData };
  },
  
  // Get formatted usage data
  getFormattedUsage: () => {
    const data = { ...usageData };
    const totalBandwidth = data.bandwidth;
    
    // Convert bandwidth to readable units
    const formatBytes = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // Calculate daily averages
    const dailyAverages = {
      reads: 0,
      writes: 0,
      bandwidth: 0
    };
    
    if (data.dailyUsage.length > 0) {
      const sum = data.dailyUsage.reduce((acc, day) => {
        acc.reads += day.reads;
        acc.writes += day.writes;
        acc.bandwidth += day.bandwidth;
        return acc;
      }, { reads: 0, writes: 0, bandwidth: 0 });
      
      dailyAverages.reads = Math.round(sum.reads / data.dailyUsage.length);
      dailyAverages.writes = Math.round(sum.writes / data.dailyUsage.length);
      dailyAverages.bandwidth = Math.round(sum.bandwidth / data.dailyUsage.length);
    }
    
    // Calculate projection for days until Firebase bandwidth limit is reached
    // Assuming $25/month budget with ~35GB download limit
    const BANDWIDTH_LIMIT_GB = 35; // GB
    const BANDWIDTH_LIMIT_BYTES = BANDWIDTH_LIMIT_GB * 1024 * 1024 * 1024; // Convert to bytes
    
    let daysUntilLimit = null;
    if (dailyAverages.bandwidth > 0) {
      const remainingBandwidth = BANDWIDTH_LIMIT_BYTES - totalBandwidth;
      if (remainingBandwidth > 0) {
        daysUntilLimit = Math.ceil(remainingBandwidth / dailyAverages.bandwidth);
      } else {
        daysUntilLimit = 0; // Already exceeded
      }
    }
    
    return {
      ...data,
      totalBandwidthFormatted: formatBytes(totalBandwidth),
      dailyAverages,
      dailyAveragesFormatted: {
        bandwidth: formatBytes(dailyAverages.bandwidth)
      },
      projection: {
        daysUntilLimit,
        limitInGB: BANDWIDTH_LIMIT_GB
      }
    };
  },
  
  // Reset all usage data
  resetUsage: () => {
    usageData.reads = 0;
    usageData.writes = 0;
    usageData.bandwidth = 0;
    usageData.startTime = Date.now();
    usageData.dailyUsage = [];
    savePersistedData();
  },
  
  // End of day report (should be called once per day)
  endOfDayReport: () => {
    updateDailyUsage();
    resetCounters();
  }
};

// Initialize usage data from localStorage
loadPersistedData();

// Set up daily report interval (check every hour)
setInterval(() => {
  const now = new Date();
  // Check if it's past midnight
  const lastReport = new Date(usageData.startTime);
  if (now.getDate() !== lastReport.getDate() || 
      now.getMonth() !== lastReport.getMonth() || 
      now.getFullYear() !== lastReport.getFullYear()) {
    firebaseUsageMonitor.endOfDayReport();
  }
}, 60 * 60 * 1000); // Check every hour

// Set up periodic usage update (every minute)
// This only aggregates current usage into daily totals without resetting counters
setInterval(() => {
  updateDailyUsage();
}, 60 * 1000); // Update every minute
