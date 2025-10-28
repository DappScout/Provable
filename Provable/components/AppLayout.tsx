"use client";
import { useRouter, usePathname } from "next/navigation";
import BottomNavbar from "./BottomNavbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Define valid routes as a union type for type safety
export type ValidRoute = 'home' | 'offers' | 'profile';

// Route configuration - easier to maintain
const ROUTES: Record<string, ValidRoute> = {
  '/home': 'home',
  '/offers': 'offers',
  '/profile': 'profile',
} as const;

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  /**
   * Why: Determines which nav item should be highlighted
   * How: Maps current pathname to route name, with fallback
   */
  const getActiveRoute = (): ValidRoute => {
    // Use type assertion since we know ROUTES values are ValidRoute
    return (ROUTES[pathname] as ValidRoute) ?? 'home';
  };

  /**
   * Why: Handles navigation when user clicks nav items
   * How: Uses Next.js router for client-side navigation (faster than full page reload)
   * @param route - The route to navigate to (type-safe)
   */
  const handleNavigation = (route: ValidRoute) => {
    router.push(`/${route}`);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* 
        Why pb-20: Creates space for fixed bottom navbar
        Why not padding on children: Children shouldn't know about navbar
      */}
      <main className="pb-20">
        {children}
      </main>
      
      {/* Fixed bottom navigation - stays visible while scrolling */}
      <BottomNavbar 
        onNavigate={handleNavigation}
        activeRoute={getActiveRoute()}
      />
    </div>
  );
}