"use client";
import { useState } from "react";
import BottomNavbar from "../../components/BottomNavbar";
import type { ValidRoute } from "../../components/AppLayout";

export default function TestNavbarPage() {
  const [currentPage, setCurrentPage] = useState<ValidRoute>("home");

  const handleNavigation = (route: ValidRoute) => {
    setCurrentPage(route);
    console.log(`Navigating to: ${route}`);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>🏠 Home Page</h1>
            <p className="mb-4" style={{ color: '#B0B0B0' }}>
              Welcome to the home page! This is where your main content goes.
            </p>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1E1E1E', borderColor: '#757575' }}>
              <h2 className="text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>Quick Actions</h2>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>• View your dashboard</li>
                <li>• Check recent activity</li>
                <li>• Access quick tools</li>
              </ul>
            </div>
          </div>
        );
      case "offers":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>⭐ Offers Page</h1>
            <p className="mb-4" style={{ color: '#B0B0B0' }}>
              Check out our latest offers and deals here!
            </p>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1E1E1E', borderColor: '#757575' }}>
              <h2 className="text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>Special Deals</h2>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>• 20% off premium features</li>
                <li>• Free trial extension</li>
                <li>• Exclusive member benefits</li>
              </ul>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>👤 Profile Page</h1>
            <p className="mb-4" style={{ color: '#B0B0B0' }}>
              Manage your profile and account settings here.
            </p>
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#1E1E1E', borderColor: '#757575' }}>
              <h2 className="text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>Account Settings</h2>
              <ul className="space-y-2" style={{ color: '#B0B0B0' }}>
                <li>• Update personal information</li>
                <li>• Change password</li>
                <li>• Notification preferences</li>
              </ul>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#FFFFFF' }}>❌ Page Not Found</h1>
            <p style={{ color: '#B0B0B0' }}>The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#1E1E1E', borderBottomColor: '#757575' }} className="shadow-sm border-b">
        <div className="p-4">
          <h1 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>Bottom Navbar Demo</h1>
          <p className="text-sm" style={{ color: '#B0B0B0' }}>Tap the buttons below to navigate</p>
        </div>
      </div>

      {/* Main content area */}
      <div className="pb-20"> {/* Add bottom padding to account for fixed navbar */}
        {renderPageContent()}
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavbar 
        onNavigate={handleNavigation}
        activeRoute={currentPage}
      />
    </div>
  );
}
