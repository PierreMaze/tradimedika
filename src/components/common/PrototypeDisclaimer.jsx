import { IoInformationCircleOutline } from "react-icons/io5";

export default function PrototypeDisclaimer() {
  return (
    <div className="-mx-[50vw] mb-8 ml-[calc(50%-50vw)] w-screen border-b-2 border-dashed border-orange-300 bg-orange-50 py-3 dark:border-orange-600/50 dark:bg-orange-900/20">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4">
        <IoInformationCircleOutline className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400" />
        <div className="text-center">
          <span className="text-sm font-semibold text-orange-900 dark:text-orange-300">
            Prototype de démonstration
          </span>
          <span className="mx-2 text-orange-800 dark:text-orange-600">•</span>
          <span className="text-sm font-medium text-orange-900 dark:text-orange-200">
            Les données affichées sont <strong>à titre démonstratif</strong> et
            peuvent être incomplètes ou fictives
          </span>
        </div>
      </div>
    </div>
  );
}
