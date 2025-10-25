"use client";
import { useRouter, usePathname } from "next/navigation";
import BottomNavbar from "../../components/BottomNavbar";

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine active route based on current pathname
  const getActiveRoute = () => {
    if (pathname === '/home') return 'home';
    if (pathname === '/offers') return 'offers';
    if (pathname === '/profile') return 'profile';
    return 'home'; // default
  };

  const handleNavigation = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Main content area */}
      <div className="pb-20"> {/* Add bottom padding to account for fixed navbar */}
        {children}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavbar 
        onNavigate={handleNavigation}
        activeRoute={getActiveRoute()}
      />
    </div>
  );
}
