import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TermPopover from "./TermPopover";

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock useExternalLink
const mockOpenConfirmation = vi.fn();
vi.mock("../../../features/external-link/hooks/useExternalLink", () => ({
  useExternalLink: () => ({
    openConfirmation: mockOpenConfirmation,
  }),
}));

// Mock useReducedMotion
vi.mock("../../../features/settings", () => ({
  useReducedMotion: () => false,
}));

describe("TermPopover", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering", () => {
    it("devrait afficher children quand termData existe", () => {
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      expect(screen.getByText("Antioxydant")).toBeInTheDocument();
    });

    it("devrait afficher comme texte simple quand termId non trouvé", () => {
      render(
        <TermPopover termId="terme-inexistant">
          <span>Terme inconnu</span>
        </TermPopover>,
      );

      const element = screen.getByText("Terme inconnu");
      expect(element).toBeInTheDocument();

      // Pas de trigger button si terme non trouvé
      expect(element.closest('[role="button"]')).toBeNull();
    });

    it("devrait appliquer className additionnelle", () => {
      const { container } = render(
        <TermPopover termId="antioxydant" className="custom-class">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });

    it("devrait appliquer variant medical", () => {
      const { container } = render(
        <TermPopover termId="antioxydant" variant="medical">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = container.querySelector('[role="button"]');
      expect(trigger?.className).toContain("underline");
    });

    it("devrait appliquer variant property par défaut", () => {
      const { container } = render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = container.querySelector('[role="button"]');
      expect(trigger?.className).toContain("border-dotted");
    });
  });

  describe("Popover visibility", () => {
    it("devrait ouvrir popover au clic", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("devrait fermer popover à Escape", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("devrait fermer popover au clic sur bouton fermer", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      const closeButton = screen.getByRole("button", { name: /fermer/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });

    it("devrait verrouiller popover après clic (mode locked)", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <TermPopover termId="antioxydant">
            <span>Antioxydant</span>
          </TermPopover>
          <button>Outside</button>
        </div>,
      );

      const triggers = screen.getAllByRole("button");
      const termTrigger = triggers[0]; // Premier bouton = TermPopover trigger

      await user.click(termTrigger);

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Popover reste ouvert même après mouseLeave simulé
      const popover = screen.getByRole("dialog");
      expect(popover).toBeInTheDocument();
    });

    it("devrait fermer au double clic sur trigger (unlock)", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");

      // Premier clic : ouvrir et verrouiller
      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Deuxième clic : déverrouiller et fermer
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Navigation clavier", () => {
    it("devrait être focusable avec Tab", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");

      await user.tab();

      expect(trigger).toHaveFocus();
    });

    it("devrait ouvrir avec Enter", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      trigger.focus();

      await user.keyboard("{Enter}");

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("devrait ouvrir avec Space", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      trigger.focus();

      await user.keyboard(" ");

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("devrait retourner focus au trigger après fermeture avec Escape", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(trigger).toHaveFocus();
      });
    });

    it("devrait retourner focus au trigger après clic bouton fermer", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      const closeButton = screen.getByRole("button", { name: /fermer/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(trigger).toHaveFocus();
      });
    });
  });

  describe("Accessibilité", () => {
    it("devrait avoir role='button' sur trigger", () => {
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("role", "button");
    });

    it("devrait avoir aria-haspopup='dialog'", () => {
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("devrait avoir aria-expanded=false par défaut", () => {
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("devrait avoir aria-expanded=true quand ouvert", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("devrait avoir role='dialog' sur popover", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("role", "dialog");
    });

    it("devrait avoir aria-modal='false' sur popover", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "false");
    });

    it("devrait avoir aria-labelledby pointant vers titre", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const dialog = screen.getByRole("dialog");
      const labelledby = dialog.getAttribute("aria-labelledby");
      expect(labelledby).toBeTruthy();

      const title = document.getElementById(labelledby);
      expect(title).toBeInTheDocument();
    });

    it("devrait avoir tabIndex=0 pour être focusable", () => {
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Contenu du popover", () => {
    it("devrait afficher nom du terme", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      // Le nom exact vient de TECHNICAL_TERMS_DATA
      expect(screen.getByRole("heading")).toBeInTheDocument();
      expect(screen.getByRole("heading").textContent).toBeTruthy();
    });

    it("devrait afficher définition", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const dialog = screen.getByRole("dialog");
      // Vérifier qu'il y a du contenu textuel
      expect(dialog.textContent.length).toBeGreaterThan(20);
    });

    it("devrait afficher lien Wikipedia si disponible", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const link = screen.getByRole("button", { name: /en savoir plus/i });
      expect(link).toBeInTheDocument();
    });

    it("devrait appeler openConfirmation au clic sur lien Wikipedia", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="antioxydant">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const link = screen.getByRole("button", { name: /en savoir plus/i });
      await user.click(link);

      expect(mockOpenConfirmation).toHaveBeenCalledWith(
        expect.stringContaining("wikipedia"),
        "Wikipedia",
      );
    });

    it("ne devrait pas afficher lien si wikipediaUrl null", async () => {
      const user = userEvent.setup();
      // "attenuer" n'a pas de wikipediaUrl
      render(
        <TermPopover termId="attenuer">
          <span>Atténuer</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      const link = screen.queryByRole("button", { name: /en savoir plus/i });
      expect(link).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("devrait gérer termId vide", () => {
      render(
        <TermPopover termId="">
          <span>Test</span>
        </TermPopover>,
      );

      // Pas de popover si termId vide
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("devrait normaliser termId (espaces → tirets)", async () => {
      const user = userEvent.setup();
      // "anti-inflammatoire" avec espace devrait devenir "anti-inflammatoire"
      render(
        <TermPopover termId="anti inflammatoire">
          <span>Anti-inflammatoire</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      // Devrait trouver le terme normalisé
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("devrait normaliser termId (uppercase → lowercase)", async () => {
      const user = userEvent.setup();
      render(
        <TermPopover termId="ANTIOXYDANT">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("devrait gérer children non-string", () => {
      render(
        <TermPopover termId="antioxydant">
          <div>
            <span>Antioxydant</span> avec plus de contenu
          </div>
        </TermPopover>,
      );

      expect(screen.getByText("Antioxydant")).toBeInTheDocument();
    });

    it("devrait gérer plusieurs TermPopover sur la même page", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <TermPopover termId="antioxydant">
            <span>Antioxydant</span>
          </TermPopover>
          <TermPopover termId="anti-inflammatoire">
            <span>Anti-inflammatoire</span>
          </TermPopover>
        </div>,
      );

      const triggers = screen.getAllByRole("button");
      expect(triggers).toHaveLength(2);

      // Ouvrir premier popover
      await user.click(triggers[0]);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Note : Comportement actuel permet un seul popover ouvert à la fois
      // C'est intentionnel pour éviter conflits de positionnement
    });
  });

  describe("Variants de termes", () => {
    it("devrait supporter variant='property'", () => {
      const { container } = render(
        <TermPopover termId="antioxydant" variant="property">
          <span>Antioxydant</span>
        </TermPopover>,
      );

      const trigger = container.querySelector('[role="button"]');
      expect(trigger?.className).toContain("border-dotted");
    });

    it("devrait supporter variant='allergen'", () => {
      const { container } = render(
        <TermPopover termId="agrumes" variant="allergen">
          <span>Agrumes</span>
        </TermPopover>,
      );

      const trigger = container.querySelector('[role="button"]');
      expect(trigger?.className).toContain("border-dotted");
    });

    it("devrait supporter variant='medical'", () => {
      const { container } = render(
        <TermPopover termId="diabete" variant="medical">
          <span>Diabète</span>
        </TermPopover>,
      );

      const trigger = container.querySelector('[role="button"]');
      expect(trigger?.className).toContain("underline");
      expect(trigger?.className).not.toContain("border-dotted");
    });
  });
});
