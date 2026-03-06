import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLRUCache } from "./useLRUCache";

describe("useLRUCache", () => {
  describe("Basic functionality", () => {
    it("should compute value on cache miss", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      const value = result.current.get("key1", computeFn);

      expect(computeFn).toHaveBeenCalledWith("key1");
      expect(computeFn).toHaveBeenCalledTimes(1);
      expect(value).toBe("computed-key1");
    });

    it("should return cached value on cache hit", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      // First call - cache miss
      const value1 = result.current.get("key1", computeFn);
      expect(computeFn).toHaveBeenCalledTimes(1);

      // Second call - cache hit
      const value2 = result.current.get("key1", computeFn);
      expect(computeFn).toHaveBeenCalledTimes(1); // Not called again
      expect(value1).toBe(value2);
    });

    it("should cache multiple values", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      result.current.get("key1", computeFn);
      result.current.get("key2", computeFn);
      result.current.get("key3", computeFn);

      expect(computeFn).toHaveBeenCalledTimes(3);
      expect(result.current.size()).toBe(3);
    });
  });

  describe("LRU eviction", () => {
    it("should evict oldest entry when maxSize exceeded", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      // Fill cache to maxSize
      result.current.get("key1", computeFn);
      result.current.get("key2", computeFn);
      result.current.get("key3", computeFn);
      expect(result.current.size()).toBe(3);

      // Add one more - should evict key1
      result.current.get("key4", computeFn);
      expect(result.current.size()).toBe(3);
      expect(result.current.has("key1")).toBe(false);
      expect(result.current.has("key2")).toBe(true);
      expect(result.current.has("key3")).toBe(true);
      expect(result.current.has("key4")).toBe(true);
    });

    it("should move accessed entry to end (most recently used)", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      // Fill cache
      result.current.get("key1", computeFn);
      result.current.get("key2", computeFn);
      result.current.get("key3", computeFn);

      // Access key1 again - moves it to end
      result.current.get("key1", computeFn);

      // Add key4 - should evict key2 (now oldest)
      result.current.get("key4", computeFn);

      expect(result.current.has("key1")).toBe(true); // Still cached
      expect(result.current.has("key2")).toBe(false); // Evicted
      expect(result.current.has("key3")).toBe(true);
      expect(result.current.has("key4")).toBe(true);
    });

    it("should handle maxSize of 1", () => {
      const { result } = renderHook(() => useLRUCache(1));
      const computeFn = vi.fn((key) => `computed-${key}`);

      result.current.get("key1", computeFn);
      expect(result.current.size()).toBe(1);

      result.current.get("key2", computeFn);
      expect(result.current.size()).toBe(1);
      expect(result.current.has("key1")).toBe(false);
      expect(result.current.has("key2")).toBe(true);
    });
  });

  describe("Cache operations", () => {
    it("has() should return true for cached keys", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = (key) => `computed-${key}`;

      result.current.get("key1", computeFn);

      expect(result.current.has("key1")).toBe(true);
      expect(result.current.has("key2")).toBe(false);
    });

    it("clear() should remove all entries", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = (key) => `computed-${key}`;

      result.current.get("key1", computeFn);
      result.current.get("key2", computeFn);
      expect(result.current.size()).toBe(2);

      act(() => {
        result.current.clear();
      });

      expect(result.current.size()).toBe(0);
      expect(result.current.has("key1")).toBe(false);
      expect(result.current.has("key2")).toBe(false);
    });

    it("size() should return correct number of entries", () => {
      const { result } = renderHook(() => useLRUCache(5));
      const computeFn = (key) => `computed-${key}`;

      expect(result.current.size()).toBe(0);

      result.current.get("key1", computeFn);
      expect(result.current.size()).toBe(1);

      result.current.get("key2", computeFn);
      expect(result.current.size()).toBe(2);

      result.current.get("key3", computeFn);
      expect(result.current.size()).toBe(3);
    });
  });

  describe("Default maxSize", () => {
    it("should use default maxSize of 200", () => {
      const { result } = renderHook(() => useLRUCache());
      const computeFn = (key) => `computed-${key}`;

      // Add 200 entries
      for (let i = 0; i < 200; i++) {
        result.current.get(`key${i}`, computeFn);
      }

      expect(result.current.size()).toBe(200);

      // Add one more - should evict first
      result.current.get("key200", computeFn);
      expect(result.current.size()).toBe(200);
      expect(result.current.has("key0")).toBe(false);
      expect(result.current.has("key200")).toBe(true);
    });
  });

  describe("Different value types", () => {
    it("should cache numbers", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => parseInt(key) * 2);

      const value = result.current.get("5", computeFn);
      expect(value).toBe(10);

      result.current.get("5", computeFn);
      expect(computeFn).toHaveBeenCalledTimes(1);
    });

    it("should cache objects", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => ({ id: key, name: `Item ${key}` }));

      const value1 = result.current.get("1", computeFn);
      const value2 = result.current.get("1", computeFn);

      expect(value1).toBe(value2); // Same reference
      expect(computeFn).toHaveBeenCalledTimes(1);
    });

    it("should cache arrays", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => [key, key * 2]);

      const value1 = result.current.get(5, computeFn);
      const value2 = result.current.get(5, computeFn);

      expect(value1).toBe(value2);
      expect(computeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe("Persistence across renders", () => {
    it("should persist cache across component re-renders", () => {
      const { result, rerender } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      result.current.get("key1", computeFn);
      expect(computeFn).toHaveBeenCalledTimes(1);

      // Force re-render
      rerender();

      // Cache should still be available
      result.current.get("key1", computeFn);
      expect(computeFn).toHaveBeenCalledTimes(1); // Not called again
    });
  });

  describe("Complex LRU scenarios", () => {
    it("should handle complex access patterns correctly", () => {
      const { result } = renderHook(() => useLRUCache(3));
      const computeFn = vi.fn((key) => `computed-${key}`);

      // Fill cache: [key1, key2, key3]
      result.current.get("key1", computeFn);
      result.current.get("key2", computeFn);
      result.current.get("key3", computeFn);

      // Access key2: [key1, key3, key2]
      result.current.get("key2", computeFn);

      // Access key1: [key3, key2, key1]
      result.current.get("key1", computeFn);

      // Add key4: Should evict key3
      result.current.get("key4", computeFn);

      expect(result.current.has("key1")).toBe(true);
      expect(result.current.has("key2")).toBe(true);
      expect(result.current.has("key3")).toBe(false);
      expect(result.current.has("key4")).toBe(true);
    });
  });
});
