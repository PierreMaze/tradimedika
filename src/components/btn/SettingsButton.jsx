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
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-all duration-200"
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
