import { useCallback, useMemo, useState } from "react";
import dbOriginal from "../../../data/db.json";

const ADMIN_DATA_KEY = "tradimedika-admin-data";

function getStoredOverrides() {
  try {
    const item = window.localStorage.getItem(ADMIN_DATA_KEY);
    if (!item) return { added: [], updated: {}, deleted: [] };
    return JSON.parse(item);
  } catch {
    return { added: [], updated: {}, deleted: [] };
  }
}

function saveOverrides(overrides) {
  try {
    window.localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

export function useAdminData() {
  const [overrides, setOverrides] = useState(() => getStoredOverrides());

  const products = useMemo(() => {
    const base = dbOriginal
      .filter((p) => !overrides.deleted.includes(p.id))
      .map((p) => (overrides.updated[p.id] ? overrides.updated[p.id] : p));
    return [...base, ...overrides.added];
  }, [overrides]);

  const nextId = useMemo(() => {
    const allIds = [
      ...dbOriginal.map((p) => p.id),
      ...overrides.added.map((p) => p.id),
    ];
    return Math.max(...allIds, -1) + 1;
  }, [overrides.added]);

  const addProduct = useCallback(
    (product) => {
      const newProduct = { ...product, id: nextId };
      const next = {
        ...overrides,
        added: [...overrides.added, newProduct],
      };
      setOverrides(next);
      saveOverrides(next);
      return newProduct;
    },
    [overrides, nextId],
  );

  const updateProduct = useCallback(
    (product) => {
      const isAdded = overrides.added.some((p) => p.id === product.id);
      let next;
      if (isAdded) {
        next = {
          ...overrides,
          added: overrides.added.map((p) =>
            p.id === product.id ? product : p,
          ),
        };
      } else {
        next = {
          ...overrides,
          updated: { ...overrides.updated, [product.id]: product },
        };
      }
      setOverrides(next);
      saveOverrides(next);
    },
    [overrides],
  );

  const deleteProduct = useCallback(
    (productId) => {
      const isAdded = overrides.added.some((p) => p.id === productId);
      let next;
      if (isAdded) {
        next = {
          ...overrides,
          added: overrides.added.filter((p) => p.id !== productId),
        };
      } else {
        next = {
          ...overrides,
          deleted: [...overrides.deleted, productId],
          updated: Object.fromEntries(
            Object.entries(overrides.updated).filter(
              ([key]) => Number(key) !== productId,
            ),
          ),
        };
      }
      setOverrides(next);
      saveOverrides(next);
    },
    [overrides],
  );

  const resetOverrides = useCallback(() => {
    const empty = { added: [], updated: {}, deleted: [] };
    setOverrides(empty);
    saveOverrides(empty);
  }, []);

  const stats = useMemo(() => {
    const types = {};
    products.forEach((p) => {
      types[p.type] = (types[p.type] || 0) + 1;
    });
    return {
      total: products.length,
      original: dbOriginal.length,
      added: overrides.added.length,
      modified: Object.keys(overrides.updated).length,
      deleted: overrides.deleted.length,
      types,
      verified: products.filter((p) => p.verifiedByProfessional).length,
    };
  }, [products, overrides]);

  return {
    products,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    resetOverrides,
  };
}
