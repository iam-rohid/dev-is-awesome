import { atom } from "jotai";

const atomWithAsyncStorage = <T>(key: string, initialValue: T) => {
  const baseAtom = atom<T>(initialValue);
  baseAtom.onMount = (setValue) => {
    const item = localStorage.getItem(key);
    if (item) {
      setValue(JSON.parse(item));
    }
  };
  const derivedAtom = atom<T, T>(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      if (!!nextValue) {
        localStorage.setItem(key, JSON.stringify(nextValue));
      }
    }
  );
  return derivedAtom;
};
export default atomWithAsyncStorage;
