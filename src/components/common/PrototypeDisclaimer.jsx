import { IoInformationCircleOutline } from "react-icons/io5";

export default function PrototypeDisclaimer() {
  return (
    <div className="sticky top-20 z-40 -mx-[50vw] mb-8 ml-[calc(50%-50vw)] w-screen border-b-2 border-dashed border-amber-300 bg-amber-50 py-3 dark:border-amber-600/50 dark:bg-amber-900/20">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4">
        <IoInformationCircleOutline className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="text-center">
          <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Prototype de démonstration
          </span>
          <span className="mx-2 text-amber-800 dark:text-amber-600">•</span>
          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Les données affichées sont <strong>à titre démonstratif</strong> et
            peuvent être <strong>incomplètes ou fictives</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
