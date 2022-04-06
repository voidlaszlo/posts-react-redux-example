import { NavigateFunction } from "react-router-dom";

export const navigateBack = (navigate: NavigateFunction) => () => {
  navigate(-1);
};
