import { navigationLinks } from "@/data/navigation-links";
import { showSidebarAtom } from "@/stores/app";
import { MenuItem } from "@/types/menu-item";
import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { MdChevronRight, MdClose } from "react-icons/md";
import AppLogo from "./AppLogo";
import Backdrop from "./Backdrop";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useAtom(showSidebarAtom);
  const router = useRouter();

  const menuItems = useMemo((): MenuItem[] => {
    const route = router.asPath.split("/")[1];
    return [
      {
        label: "Home",
        href: "/",
        isActive: route === "",
      },
      ...navigationLinks.map<MenuItem>((item) => ({
        ...item,
        isActive: route === item.href.split("/")[1],
      })),
    ];
  }, [router]);

  const handleCloseSidebar = useCallback(() => {
    setShowSidebar(false);
  }, [setShowSidebar]);

  if (!showSidebar) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30">
      <Backdrop onClick={handleCloseSidebar} />
      <div className="absolute top-0 bottom-0 left-0 w-80 max-w-[100%] bg-white dark:bg-black z-10 overflow-y-auto">
        <div className="h-14 flex items-center gap-4 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 lg:px-8 sticky top-0 left-0 right-0 z-20">
          <Link href="/">
            <a className="flex-1" onClick={handleCloseSidebar}>
              <AppLogo />
            </a>
          </Link>
          <button
            onClick={handleCloseSidebar}
            className="w-10 h-10 rounded-md hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600 flex items-center justify-center"
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
