import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Simple vertical virtualization for fixed-height list items.
 * Props:
 * - items: array of data
 * - itemHeight: px height of each row
 * - renderItem: (item, index) => ReactNode
 * - overscan: extra rows to render above/below viewport (default 4)
 * - style: container style
 */
export default function VirtualizedList({ items, itemHeight, renderItem, overscan = 4, style = {} }) {
  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIdx = Math.min(items.length, Math.ceil((scrollTop + (containerRef.current?.clientHeight || 400)) / itemHeight) + overscan);
  const visibleItems = items.slice(startIdx, endIdx);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        position: 'relative',
        height: '100%',
        ...style,
      }}
      tabIndex={0}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, idx) => {
          const realIdx = startIdx + idx;
          return (
            <div
              key={item.tokenId || realIdx}
              style={{
                position: 'absolute',
                top: realIdx * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
                width: '100%',
              }}
            >
              {renderItem(item, realIdx)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
