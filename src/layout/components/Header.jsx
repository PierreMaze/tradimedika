import { memo } from "react";
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { useAuth } from "../../features/auth";
import { SettingsButton } from "../../features/settings";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import LogoTradimedika from "./LogoTradimedika";

function Header() {
  const scrollDirection = useScrollDirection();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isAuthenticated } = useAuth();

  const shouldHide = !isDesktop && scrollDirection === "down";

  return (
    <header
      className={`bg-light dark:bg-dark fixed top-0 right-0 left-0 z-100 h-auto w-full transition-transform duration-150 ease-out motion-reduce:transform-none ${shouldHide ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="border-out border-dark/80 dark:border-light/60 mx-auto flex h-20 w-full items-center border-b-2 border-dashed transition-colors duration-150 ease-out lg:w-3/4">
        <div className="mx-4 flex w-full items-center justify-between py-6 lg:mx-8">
          <LogoTradimedika />
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              aria-label={
                isAuthenticated ? "Accéder au dashboard" : "Se connecter"
              }
              className="group mr-2 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center p-2"
            >
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <IoPersonOutline className="text-dark dark:text-light text-2xl transition-colors duration-200 lg:text-3xl 2xl:text-4xl" />
              </div>
            </Link>
            <SettingsButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
