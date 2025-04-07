import { UseLocalStorage } from "@/src/entities/hooks";

export const useLocalStorage = (): UseLocalStorage => {
  const get = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const set = <T,>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
      return true;
    } catch {
      return false;
    }
  };

  const del = (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  };

  const clear = (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  };

  return {
    get: get,
    set: set,
    del: del,
    clear: clear,
  };
};
