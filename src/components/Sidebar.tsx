import { navigationLinks } from "@/data/navigation-links";
import { showSidebarAtom } from "@/stores/app";
import { MenuItem } from "@/types/menu-item";
import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo } from "react";
import { MdChevronRight, MdClose } from "react-icons/md";
import AppLogo from "./AppLogo";
import Backdrop from "./Backdrop";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    return [
      {
        label: "Home",
        href: "/",
        isActive: router.asPath === "/",
      },
      ...navigationLinks.map<MenuItem>((item) => ({
        ...item,
        isActive: router.asPath === item.href,
      })),
    ];
  }, [router]);

  const handleCloseSidebar = useCallback(() => {
    setShowSidebar(false);
  }, [setShowSidebar]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", showSidebar);
  }, [showSidebar]);

  if (!showSidebar) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30">
      <Backdrop onClick={handleCloseSidebar} />
      <div className="absolute top-0 bottom-0 left-0 z-10 w-80 max-w-[100%] overflow-y-auto bg-white dark:bg-black">
        <div className="sticky top-0 left-0 right-0 z-20 flex h-14 items-center gap-4 border-b border-gray-100 bg-white px-4 dark:border-gray-800 dark:bg-black md:px-6 lg:px-8">
          <Link href="/">
            <a className="flex-1" onClick={handleCloseSidebar}>
              <AppLogo />
            </a>
          </Link>
          <button
            onClick={handleCloseSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600"
          >
            <MdClose className="text-2xl" />
          </button>
        </div>

        <ul className="flex flex-col p-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>
                <a
                  className={classNames(
                    "flex w-full items-center gap-3 rounded-md px-4 py-3",
                    {
                      "bg-transparent hover:text-gray-600 dark:hover:text-gray-300":
                        !item.isActive,
                      "bg-accent-500 text-white": item.isActive,
                    }
                  )}
                  onClick={handleCloseSidebar}
                >
                  <p className="flex-1 line-clamp-1">{item.label}</p>
                  <MdChevronRight className="text-2xl" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
