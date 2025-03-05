import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to AI Job Match</h1>
      <p className="mt-2 text-gray-600">Find jobs that match your skills!</p>
      <div className="mt-6">
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-md">
          Get Started
        </Link>
      </div>
    </div>
  );
}
