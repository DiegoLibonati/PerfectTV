import { UseWindow } from "@/src/entities/hooks";

export const useWindow = (): UseWindow => {
  const handleChangeUrl = (route: string) => {
    window.history.pushState({}, "", route);
  };

  const handleReloadWindow = () => {
    window.location.reload()
  }

  return {
    hash: window.location.hash,
    handleChangeUrl: handleChangeUrl,
    handleReloadWindow: handleReloadWindow
  };
};
