import { IoMdArrowForward } from "react-icons/io";

import Button from "../../../../components/ui/button/Button";

/**
 * Composant HeroSearch - CTA vers le catalogue produits
 *
 * Affiche un bouton principal qui redirige vers /products
 */
export default function HeroSearch() {
  return (
    <div className="flex w-full justify-center">
      <Button
        as="link"
        to="/products"
        variant="primary"
        ariaLabel="Voir les produits naturels"
      >
        <span className="flex items-center gap-2">
          Voir les produits naturels
          <IoMdArrowForward className="text-xl" />
        </span>
      </Button>
    </div>
  );
}
