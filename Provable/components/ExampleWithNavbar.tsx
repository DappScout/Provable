"use client";
import { useState } from "react";
import BottomNavbar from "./BottomNavbar";

export default function ExampleWithNavbar() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (route: string) => {
    setCurrentPage(route);
    console.log(`Navigating to: ${route}`);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            <p className="text-gray-600">
              Welcome to the home page! This is where your main content goes.
            </p>
          </div>
        );
      case "offers":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Offers Page</h1>
            <p className="text-gray-600">
              Check out our latest offers and deals here!
            </p>
          </div>
        );
      case "profile":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <p className="text-gray-600">
              Manage your profile and account settings here.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-gray-600">The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
