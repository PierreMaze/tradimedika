import PropTypes from "prop-types";
import { TbFilterCog } from "react-icons/tb";
import { ModalButton, ModalLayout } from "../../../components/ui/modal";
import { TAG_LABELS_CATEGORIES } from "../../../constants/tagsLabelsHelper";
import FilterAccordion from "./FilterAccordion";

/**
 * FilterModal Component
 *
 * Modal pour afficher les filtres organisés en accordéons
 * Utilise le ModalLayout standard pour la structure
 * Les filtres ne s'appliquent qu'au clic sur "Appliquer"
 */
function FilterModal({
  isOpen,
  onClose,
  tempFilters,
  onToggleTempFilter,
  onResetTempFilters,
  onApplyFilters,
}) {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Filtrer les remèdes"
      icon={TbFilterCog}
      subtitle="Sélectionnez les critères pour affiner votre recherche"
      footer={
        <>
          <ModalButton variant="danger" onClick={onResetTempFilters}>
            Réinitialiser
          </ModalButton>
          <ModalButton variant="primary" onClick={onApplyFilters}>
            Appliquer
          </ModalButton>
        </>
      }
    >
      <div className="space-y-0">
        {TAG_LABELS_CATEGORIES.map((category, index) => (
          <FilterAccordion
            key={category.id}
            category={category}
            activeFilters={tempFilters[category.id]}
            onToggle={onToggleTempFilter}
            isOpenByDefault={index === 0}
          />
        ))}
      </div>
    </ModalLayout>
  );
}

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tempFilters: PropTypes.object.isRequired,
  onToggleTempFilter: PropTypes.func.isRequired,
  onResetTempFilters: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};

export default FilterModal;
