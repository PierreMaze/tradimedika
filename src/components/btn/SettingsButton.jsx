import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { ARIA_SETTINGS_BUTTON } from "../../constants/buttonLabels";
import SettingsModal from "../settings/SettingsModal";

export default function SettingsButton() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        aria-label={ARIA_SETTINGS_BUTTON}
        className="border-dark dark:border-light flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:border-emerald-500 dark:hover:bg-emerald-950"
      >
        <IoSettings className="text-dark dark:text-light text-xl transition-colors duration-200" />
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
