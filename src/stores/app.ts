import atomWithAsyncStorage from "@/lib/atomWithLocalStorage";
import { atom } from "jotai";

export type ColorScheme = "system" | "dark" | "light";

export const colorSchemeAtom = atomWithAsyncStorage<ColorScheme>("", "system");
export const showSidebarAtom = atom(false);
