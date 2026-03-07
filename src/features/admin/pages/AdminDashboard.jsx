import { useState } from "react";
import {
  IoAddOutline,
  IoRefreshOutline,
  IoServerOutline,
} from "react-icons/io5";
import AdminProductForm from "../components/AdminProductForm";
import AdminProductTable from "../components/AdminProductTable";
import { useAdminData } from "../hooks/useAdminData";

export default function AdminDashboard() {
  const {
    products,
    stats,
    addProduct,
    updateProduct,
    deleteProduct,
    resetOverrides,
  } = useAdminData();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  const handleSave = (product) => {
    if (editingProduct) {
      updateProduct({ ...product, id: editingProduct.id });
    } else {
      addProduct(product);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-neutral-800 dark:text-white">
            <IoServerOutline className="text-rose-600 dark:text-rose-400" />
            Gestion des données
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Gérer les produits naturels de la base de données
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            <IoAddOutline className="text-lg" />
            Ajouter
          </button>
          {(stats.added > 0 || stats.modified > 0 || stats.deleted > 0) && (
            <button
              onClick={resetOverrides}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-700"
              title="Réinitialiser les modifications locales"
            >
              <IoRefreshOutline className="text-lg" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-2xl font-bold text-neutral-800 dark:text-white">
            {stats.total}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Nombres de produits
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.added}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Ajoutés
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {stats.modified}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Modifiés
          </p>
        </div>
      </div>

      {/* Types breakdown */}
      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(stats.types).map(([type, count]) => (
          <span
            key={type}
            className="rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 capitalize dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
          >
            {type}: {count}
          </span>
        ))}
      </div>

      {/* Info modifications locales */}
      {(stats.added > 0 || stats.modified > 0 || stats.deleted > 0) && (
        <div className="mb-6 rounded-lg border-2 border-dashed border-amber-400/60 bg-amber-50 p-3 dark:border-amber-500/40 dark:bg-amber-900/20">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Modifications locales : {stats.added} ajouté
            {stats.added > 1 ? "s" : ""}, {stats.modified} modifié
            {stats.modified > 1 ? "s" : ""}, {stats.deleted} supprimé
            {stats.deleted > 1 ? "s" : ""}. Ces données sont stockées dans votre
            navigateur (localStorage).
          </p>
        </div>
      )}

      {/* Product table */}
      <AdminProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Product form modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
