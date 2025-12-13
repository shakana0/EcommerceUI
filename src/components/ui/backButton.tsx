import { useRouter } from "@tanstack/react-router";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.history.back()}
      className="px-6 py-3 rounded-lg bg-gray-700 text-white font-semibold shadow-md 
                 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
    >
      ← Back
    </button>
  );
}
