import {
  NavigateOptions,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { UseRouter } from "@src/entities/hooks";

export const useRouter = (): UseRouter => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateTo = (route: string, options?: NavigateOptions): void => {
    navigate(route, options);
  };

  const handleNavigateToGridChannels = (): void => {
    handleNavigateTo("/channels");
  };

  const handleNavigateToChannel = (number: number): void => {
    handleNavigateTo(`/channel/${number}`);
  };

  return {
    params: params,
    pathname: location.pathname,
    handleNavigateTo: handleNavigateTo,
    handleNavigateToGridChannels: handleNavigateToGridChannels,
    handleNavigateToChannel: handleNavigateToChannel,
  };
};
