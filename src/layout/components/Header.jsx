import { SettingsButton } from "../../features/settings";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import LogoTradimedika from "./LogoTradimedika";

export default function Header() {
  const scrollDirection = useScrollDirection();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const shouldHide = !isDesktop && scrollDirection === "down";

  return (
    <header
      className={`bg-light dark:bg-dark fixed top-0 right-0 left-0 z-50 h-auto w-full transition-transform duration-300 ease-in-out motion-reduce:transform-none ${shouldHide ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="border-out border-dark/80 dark:border-light/60 mx-auto flex h-20 w-full items-center border-b-2 border-dashed transition duration-300 ease-in-out lg:w-3/4">
        <div className="mx-4 flex w-full items-center justify-between py-6 lg:mx-8">
          <LogoTradimedika />
          <SettingsButton />
        </div>
      </div>
    </header>
  );
}
