"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl text-violet-950 font-bold mb-4">Login</h2>
      <button onClick={handleLogin} className="px-6 py-3 bg-blue-600 text-white rounded-md">
        Continue as John Doe
      </button>
    </div>
  );
}
