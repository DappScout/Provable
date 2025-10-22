"use client";
import { useRouter } from "next/navigation";

export default function WithNavbarPage() {
  const router = useRouter();

  const navigateToPage = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
        Navbar Integration Demo
      </h1>
      <p className="mb-6" style={{ color: '#B0B0B0' }}>
        This page demonstrates the navbar with real Next.js routing. 
        Use the bottom navigation to switch between pages.
      </p>
      
      <div className="space-y-4">
        <button
          onClick={() => navigateToPage('home')}
          className="block w-full p-4 rounded-lg border"
          style={{ 
            backgroundColor: '#1E1E1E', 
            borderColor: '#757575',
            color: '#FFFFFF'
          }}
        >
          Go to Home Page
        </button>
        
        <button
          onClick={() => navigateToPage('offers')}
          className="block w-full p-4 rounded-lg border"
          style={{ 
            backgroundColor: '#1E1E1E', 
            borderColor: '#757575',
            color: '#FFFFFF'
          }}
        >
          Go to Offers Page
        </button>
        
        <button
          onClick={() => navigateToPage('profile')}
          className="block w-full p-4 rounded-lg border"
          style={{ 
            backgroundColor: '#1E1E1E', 
            borderColor: '#757575',
            color: '#FFFFFF'
          }}
        >
          Go to Profile Page
        </button>
      </div>
    </div>
  );
}
