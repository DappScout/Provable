"use client";
import { useState } from "react";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { Pressable } from "./ui/pressable";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";
import { 
  HomeIcon, 
  OffersIcon, 
  ProfileIcon 
} from "./ui/icon";

interface BottomNavbarProps {
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

export default function BottomNavbar({ 
  onNavigate, 
  activeRoute = "home" 
}: BottomNavbarProps) {
  const [currentRoute, setCurrentRoute] = useState(activeRoute);

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
    },
    {
      id: "offers",
      label: "Offers", 
      icon: OffersIcon,
    },
    {
      id: "profile",
      label: "Profile",
      icon: ProfileIcon,
    },
  ];

  const handleNavigation = (route: string) => {
    setCurrentRoute(route);
    onNavigate?.(route);
  };

  return (
    <Box 
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: '#2C2C2C',
        boxShadow: '0px -4px 9px rgba(44, 44, 44, 0.39)',
        height: '58px'
      }}
    >
      <HStack space="md" className="justify-around h-full">
        {navigationItems.map((item) => {
          const isActive = currentRoute === item.id;
          const IconComponent = item.icon;
          
          return (
            <Pressable
              key={item.id}
              onPress={() => handleNavigation(item.id)}
              className={`flex-1 items-center justify-center h-full transition-all duration-200 ${
                isActive 
                  ? "bg-opacity-20" 
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <VStack space="xs" className="items-center">
                <Icon
                  as={IconComponent}
                  className={`transition-colors duration-200 ${
                    isActive 
                      ? "text-white" 
                      : "text-gray-400"
                  }`}
                  style={{ 
                    fontSize: '33px',
                    width: '33px',
                    height: '33px'
                  }}
                />
                <Text
                  size="xs"
                  className={`text-center font-medium transition-colors duration-200 ${
                    isActive 
                      ? "text-white font-semibold" 
                      : "text-gray-400"
                  }`}
                  style={{ 
                    fontSize: '9px',
                    color: isActive ? '#FFFFFF' : '#757575'
                  }}
                >
                  {item.label}
                </Text>
              </VStack>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
}
