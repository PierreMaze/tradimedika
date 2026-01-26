import { useState } from "react";
import CookieSettingsModal from "./CookieSettingsModal";

export default function CookieSettingsButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="transform cursor-pointer font-medium text-neutral-900 underline decoration-current underline-offset-2 duration-150 ease-in-out hover:text-emerald-600 dark:text-neutral-100 dark:hover:text-emerald-500"
      >
        Paramètres des cookies
      </button>

      <CookieSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
