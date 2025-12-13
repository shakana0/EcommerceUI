import { useApiVersion } from "./useApiVersion";

const PROD_API_URL = import.meta.env.VITE_PROD_API_URL;
const DEV_API_URL = import.meta.env.VITE_DEV_API_URL;

export const useApiBase = () => {
  const version = useApiVersion();
  return version === "dev" ? DEV_API_URL : PROD_API_URL;
};
