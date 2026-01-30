import { IoMdSettings } from "react-icons/io";
import { ARIA_SETTINGS_BUTTON } from "../../../constants/buttonLabels";
import { useSettingsModal } from "../context/SettingsModalContext";
import SettingsModal from "./SettingsModal";

export default function SettingsButton() {
  const { openSettings } = useSettingsModal();

  return (
    <>
      <button
        onClick={openSettings}
        aria-label={ARIA_SETTINGS_BUTTON}
        className="group mr-2 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-2"
      >
        <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <IoMdSettings className="text-dark dark:text-light text-2xl transition-colors duration-200 lg:text-3xl 2xl:text-4xl" />
        </div>
      </button>

      <SettingsModal />
    </>
  );
}
