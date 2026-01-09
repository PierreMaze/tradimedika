// hooks/useLRUCache.js
import { useCallback, useRef } from "react";

/**
 * Custom hook for LRU (Least Recently Used) caching
 *
 * Provides a memory-efficient cache with automatic eviction of least recently used entries
 * when the cache size limit is reached. Perfect for caching expensive computations.
 *
 * @param {number} [maxSize=200] - Maximum number of entries in the cache
 * @returns {{
 *   get: (key: any, computeFn: Function) => any,
 *   has: (key: any) => boolean,
 *   clear: () => void,
 *   size: () => number
 * }} Cache operations object
 *
 * @example
 * // Basic usage with expensive computation
 * const { get } = useLRUCache(100);
 * const normalized = get(symptom, normalizeForMatching);
 *
 * @example
 * // With custom max size
 * const { get, has, clear, size } = useLRUCache(50);
 * if (has(key)) {
 *   console.log('Cache hit!');
 * }
 * console.log(`Cache size: ${size()}`);
 * clear(); // Clear all entries
 */
export function useLRUCache(maxSize = 200) {
  // Use useRef to persist cache across renders without causing re-renders
  const cache = useRef(new Map());

  /**
   * Get value from cache or compute it
   * Implements LRU behavior by moving accessed entries to the end
   *
   * @param {any} key - Cache key
   * @param {Function} computeFn - Function to compute value if not cached
   * @returns {any} Cached or computed value
   */
  const get = useCallback(
    (key, computeFn) => {
      // Cache hit: move to end (most recently used)
      if (cache.current.has(key)) {
        const value = cache.current.get(key);
        // LRU: Remove and re-add to move to end
        cache.current.delete(key);
        cache.current.set(key, value);
        return value;
      }

      // Cache miss: compute value
      const value = computeFn(key);
      cache.current.set(key, value);

      // Evict oldest entry if size exceeds limit
      if (cache.current.size > maxSize) {
        // Map iterates in insertion order, so first key is oldest
        const firstKey = cache.current.keys().next().value;
        cache.current.delete(firstKey);
      }

      return value;
    },
    [maxSize],
  );

  /**
   * Check if key exists in cache
   *
   * @param {any} key - Cache key to check
   * @returns {boolean} True if key exists in cache
   */
  const has = useCallback((key) => {
    return cache.current.has(key);
  }, []);

  /**
   * Clear all cache entries
   */
  const clear = useCallback(() => {
    cache.current.clear();
  }, []);

  /**
   * Get current cache size
   *
   * @returns {number} Number of entries in cache
   */
  const size = useCallback(() => {
    return cache.current.size;
  }, []);

  return { get, has, clear, size };
}
