// Progressive loading hook for better performance
import { useState, useEffect, useCallback, useRef } from 'react';

export const useProgressiveLoading = (items, initialBatchSize = 10, batchSize = 5) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadedCountRef = useRef(0);

  // Reset when items change
  useEffect(() => {
    if (items.length === 0) {
      setVisibleItems([]);
      setHasMore(false);
      loadedCountRef.current = 0;
      return;
    }

    // Load initial batch
    const initialBatch = items.slice(0, initialBatchSize);
    setVisibleItems(initialBatch);
    loadedCountRef.current = initialBatch.length;
    setHasMore(items.length > initialBatchSize);
  }, [items, initialBatchSize]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate slight delay for better UX (prevents jarring instant loads)
    setTimeout(() => {
      const currentCount = loadedCountRef.current;
      const nextBatch = items.slice(currentCount, currentCount + batchSize);
      
      setVisibleItems(prev => [...prev, ...nextBatch]);
      loadedCountRef.current = currentCount + nextBatch.length;
      setHasMore(currentCount + nextBatch.length < items.length);
      setLoading(false);
    }, 100);
  }, [items, batchSize, loading, hasMore]);

  return {
    visibleItems,
    hasMore,
    loading,
    loadMore,
    totalItems: items.length,
    loadedCount: loadedCountRef.current
  };
};
