import PropTypes from "prop-types";
import { memo } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useAuth } from "../../features/auth";
import { SettingsButton } from "../../features/settings";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import LogoTradimedika from "./LogoTradimedika";

function Header({ sticky = false, fullWidth = false }) {
  const scrollDirection = useScrollDirection();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isAuthenticated, userName, userTitle } = useAuth();

  const shouldHide = !sticky && !isDesktop && scrollDirection === "down";

  return (
    <header
      className={`bg-light dark:bg-dark h-auto w-full transition-transform duration-150 ease-out motion-reduce:transform-none ${
        sticky
          ? "sticky top-0 z-50"
          : `fixed top-0 right-0 left-0 z-100 ${shouldHide ? "-translate-y-full" : "translate-y-0"}`
      }`}
    >
      <div
        className={`border-out border-dark/80 dark:border-light/60 mx-auto flex h-20 w-full items-center border-b-2 border-dashed transition-colors duration-150 ease-out ${fullWidth ? "" : "lg:w-3/4"}`}
      >
        <div className="mx-4 flex w-full items-center justify-between py-6 lg:mx-8">
          <LogoTradimedika />
          <div className="flex items-center gap-x-0 lg:gap-x-2 2xl:gap-x-4">
            <Link
              to={isAuthenticated ? "/dashboard/profil" : "/login"}
              aria-label={isAuthenticated ? "Mon profil" : "Se connecter"}
              className="group flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 p-2"
            >
              {isAuthenticated && userName ? (
                <div className="flex items-center gap-2 transition-transform duration-200 group-hover:scale-105">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white lg:h-9 lg:w-9 lg:text-base 2xl:h-10 2xl:w-10">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden text-sm font-medium text-neutral-700 lg:inline dark:text-neutral-300">
                    {userTitle} {userName}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <FaUserCircle className="text-dark dark:text-light text-xl transition-colors duration-200 lg:text-2xl 2xl:text-3xl" />
                </div>
              )}
            </Link>
            {!isAuthenticated && <SettingsButton />}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  sticky: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default memo(Header);
