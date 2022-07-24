import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import {
  MdClose,
  MdComputer,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdSearch,
} from "react-icons/md";
import { useColorScheme } from "@/contexts/ColorSchemeContext";
import { useSpotlight } from "@/contexts/SportlightContext";
import { MenuItem } from "@/types/menu-item";
import { navigationLinks } from "@/data/navigation-links";
import { useAtom } from "jotai";
import { showSidebarAtom } from "@/stores/app";
import AppLogo from "./AppLogo";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const { toggleColorScheme, colorScheme } = useColorScheme();
  const { openSpotlight } = useSpotlight();
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    const route = router.asPath.split("/")[1];
    return navigationLinks.map<MenuItem>((item) => ({
      ...item,
      isActive: route === item.href.split("/")[1],
    }));
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  return (
    <nav className="h-14 flex items-center gap-4 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 lg:px-8 sticky top-0 left-0 right-0 z-20">
      <div className="flex-1 justify-start gap-4 flex items-center overflow-hidden">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-10 h-10 rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700 flex items-center justify-center md:hidden"
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
      <ul className="items-center justify-end gap-4 hidden md:flex">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <a
                className={classNames("", {
                  "text-primary-500 dark:text-primary-400 py-3": item.isActive,
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
      <div className="flex justify-end gap-2">
        {[
          {
            icon: <MdSearch className="text-2xl" />,
            onClick: openSpotlight,
          },
          {
            icon:
              colorScheme === "system" ? (
                <MdComputer className="text-2xl" />
              ) : colorScheme === "light" ? (
                <MdLightMode className="text-2xl" />
              ) : (
                <MdDarkMode className="text-2xl" />
              ),
            onClick: toggleColorScheme,
          },
        ].map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="relative w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 flex items-center justify-center"
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;

type Divider = {
  type: "divider";
};

type IDropDownButtonItem = {
  type: "button";
  onClick: () => void;
  label: string;
};
type IDropDownLinkItem = {
  type: "link";
  href: string;
  label: string;
};

type IDropDownItem = Divider | IDropDownButtonItem | IDropDownLinkItem;
