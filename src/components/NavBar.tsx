import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import { useSpotlight } from "@/contexts/SportlightContext";
import { MenuItem } from "@/types/menu-item";
import { navigationLinks } from "@/data/navigation-links";
import { useAtom } from "jotai";
import { colorSchemeAtom, showSidebarAtom } from "@/stores/app";
import AppLogo from "./AppLogo";

const NavBar = () => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);

  const { openSpotlight } = useSpotlight();
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    const route = router.asPath.split("/")[1];
    return navigationLinks.map<MenuItem>((item) => ({
      ...item,
      isActive: route === item.href.split("/")[1],
    }));
  }, [router]);

  const toggleColorScheme = useCallback(() => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", colorScheme === "dark");
  }, [colorScheme]);

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 flex h-14 items-center gap-4 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="container mx-auto my-16 flex h-full items-center px-4 xl:max-w-7xl">
        <div className="flex flex-1 items-center justify-start gap-4 overflow-hidden">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 md:hidden"
          >
            {showSidebar ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
          <Link href="/">
            <a>
              <AppLogo />
            </a>
          </Link>
        </div>
        <div>
          <ul className="hidden items-center justify-end gap-4 md:flex">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={classNames("", {
                      "py-3 text-primary-500 dark:text-primary-400":
                        item.isActive,
                      "hover:text-gray-600 dark:hover:text-gray-300":
                        !item.isActive,
                    })}
                  >
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-2 md:flex-1">
          {[
            {
              icon: <MdSearch className="text-2xl" />,
              onClick: openSpotlight,
            },
            {
              icon:
                colorScheme === "dark" ? (
                  <MdDarkMode className="text-2xl" />
                ) : (
                  <MdLightMode className="text-2xl" />
                ),
              onClick: toggleColorScheme,
            },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
