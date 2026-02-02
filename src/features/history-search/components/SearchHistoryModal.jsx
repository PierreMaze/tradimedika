import PropTypes from "prop-types";
import { useState } from "react";
import { RiDeleteBin2Fill, RiHistoryLine } from "react-icons/ri";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";
import { BUTTON_CLEAR_HISTORY } from "../../../constants/buttonLabels";
import SearchHistoryItem from "./SearchHistoryItem";

/**
 * SearchHistoryModal Component
 *
 * Modal displaying search history
 * Utilise ModalLayout standard pour la structure
 */
export default function SearchHistoryModal({
  isOpen,
  onClose,
  history,
  onSearchSelect,
  onClearHistory,
  onRemoveItem,
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClearAllRequest = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmClear = () => {
    onClearHistory();
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelClear = () => {
    setShowConfirmDialog(false);
  };

  const handleSearchSelect = (search) => {
    onSearchSelect(search);
    onClose();
  };

  return (
    <>
      <ModalLayout
        isOpen={isOpen}
        onClose={onClose}
        title="Historique de recherche"
        icon={RiHistoryLine}
        subtitle="Les 10 dernières recherches sont conservées automatiquement"
        maxWidth="2xl"
        footer={
          <ModalButton
            variant="danger"
            onClick={handleClearAllRequest}
            disabled={history.length === 0}
            ariaLabel="Effacer tout l'historique"
            className="ml-auto"
          >
            {BUTTON_CLEAR_HISTORY}
          </ModalButton>
        }
      >
        {history.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              Aucun historique de recherche
            </p>
            <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">
              Vos recherches apparaîtront ici
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto pr-2">
            <ul role="list" className="space-y-3">
              {history.map((search) => (
                <SearchHistoryItem
                  key={search.id}
                  search={search}
                  onClick={handleSearchSelect}
                  onRemove={onRemoveItem}
                />
              ))}
            </ul>
          </div>
        )}
      </ModalLayout>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <ModalLayout
          isOpen={showConfirmDialog}
          onClose={handleCancelClear}
          title="Confirmer la suppression"
          maxWidth="md"
          footer={
            <>
              <ModalButton variant="secondary" onClick={handleCancelClear}>
                Annuler
              </ModalButton>
              <ModalButton
                variant="danger"
                onClick={handleConfirmClear}
                icon={RiDeleteBin2Fill}
              >
                Supprimer
              </ModalButton>
            </>
          }
        >
          <p className="mb-6 font-medium text-neutral-600 dark:text-neutral-400">
            Êtes-vous sûr de vouloir effacer tout l&apos;historique ? <br />{" "}
            <span className="font-bold">Cette action est irréversible.</span>
          </p>
        </ModalLayout>
      )}
    </>
  );
}

SearchHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      symptoms: PropTypes.arrayOf(PropTypes.string).isRequired,
      timestamp: PropTypes.number.isRequired,
      resultCount: PropTypes.number,
    }),
  ).isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
