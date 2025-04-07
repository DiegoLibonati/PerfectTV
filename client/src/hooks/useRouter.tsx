import {
  NavigateOptions,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import { UseRouter } from "@/src/entities/hooks";

export const useRouter = (): UseRouter => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateTo = (route: string, options?: NavigateOptions) => {
    navigate(route, options);
  };

  return {
    params: params,
    pathname: location.pathname,
    handleNavigateTo: handleNavigateTo,
  };
};
