import { useApiVersion } from "./useApiVersion";

const PROD_API_URL =
  "https://ecommerceapi-cnhvepg9gkgrg3et.swedencentral-01.azurewebsites.net/api/";
const DEV_API_URL = "https://localhost:5001";

export const useApiBase = () => {
  const version = useApiVersion();
  return version === "dev" ? DEV_API_URL : PROD_API_URL;
};
