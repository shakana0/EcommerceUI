import { useState, useEffect } from "react";

export const useApiVersion = () => {
  const [version, setVersion] = useState<"dev" | "prod">(
    (localStorage.getItem("apiVersion") as "dev" | "prod") || "prod"
  );

  useEffect(() => {
    const stored = localStorage.getItem("apiVersion");
    if (stored === "prod" || stored === "dev") {
      setVersion(stored);
    }
  }, []);

  return version;
};
