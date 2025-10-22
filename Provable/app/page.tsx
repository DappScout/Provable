"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page by default
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#121212' }}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Loading...</h1>
        <p style={{ color: '#B0B0B0' }}>Redirecting to home page</p>
      </div>
    </div>
  );
}
