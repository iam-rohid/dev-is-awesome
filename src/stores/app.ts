import atomWithAsyncStorage from "@/lib/atomWithLocalStorage";
import { atom } from "jotai";

export type ColorScheme = "dark" | "light";

export const colorSchemeAtom = atomWithAsyncStorage<ColorScheme>(
  "color-scheme",
  "light"
);
export const showSidebarAtom = atom(false);
