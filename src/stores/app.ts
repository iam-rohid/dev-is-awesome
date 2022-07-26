import atomWithAsyncStorage from "@/lib/atomWithLocalStorage";
import { atom } from "jotai";

export type ColorScheme = "dark" | "light";

export const colorSchemeAtom = atomWithAsyncStorage<ColorScheme>(
  "theme",
  "light"
);
export const showSidebarAtom = atom(false);
