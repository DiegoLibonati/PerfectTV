import { UseWindow } from "@/src/entities/hooks";

export const useWindow = (): UseWindow => {
  const handleChangeUrl = (route: string) => {
    window.history.pushState({}, "", route);
  };

  return {
    hash: window.location.hash,
    handleChangeUrl: handleChangeUrl,
  };
};
