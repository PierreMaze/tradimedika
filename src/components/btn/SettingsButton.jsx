import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { ARIA_SETTINGS_BUTTON } from "../../constants/buttonLabels";
import SettingsModal from "../settings/SettingsModal";

export default function SettingsButton() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        aria-label={ARIA_SETTINGS_BUTTON}
        className="group mr-2 flex h-10 w-10 cursor-pointer items-center justify-center p-2"
      >
        <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <IoMdSettings className="text-dark dark:text-light text-2xl transition-colors duration-200 lg:text-3xl 2xl:text-4xl" />
        </div>
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
