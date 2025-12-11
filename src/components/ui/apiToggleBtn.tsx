import { useApiVersion } from "../hooks/api/useApiVersion";
import { useState, useEffect } from "react";

export const ApiToggleBtn = () => {
  const version = useApiVersion();
  const [isProd, setIsProd] = useState(version === "prod");

  useEffect(() => {
    setIsProd(version === "prod");
  }, [version]);

  const toggleVersion = () => {
    const newVersion = isProd ? "dev" : "prod";
    localStorage.setItem("apiVersion", newVersion);
    setIsProd(newVersion === "prod");
  };

  return (
    <button
      onClick={toggleVersion}
      className={`w-16 h-8 rounded-full relative transition-colors duration-300 ${
        isProd ? "bg-green-500" : "bg-gray-700"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-300 ${
          isProd ? "left-9" : "left-1"
        }`}
      />
    </button>
  );
};
