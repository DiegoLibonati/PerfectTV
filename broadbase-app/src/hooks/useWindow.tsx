import type { UseWindow } from "@/types/hooks";

export const useWindow = (): UseWindow => {
  const handleChangeUrl = (route: string): void => {
    window.history.pushState({}, "", route);
  };

  const handleReloadWindow = (): void => {
    window.location.reload();
  };

  return {
    hash: window.location.hash,
    handleChangeUrl: handleChangeUrl,
    handleReloadWindow: handleReloadWindow,
  };
};
