"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the shape of your branding settings
interface BrandingState {
  logo: string | null;
  platformName: string;
}

type WhiteLabelContextType = {
  branding: BrandingState;
  setBranding: Dispatch<SetStateAction<BrandingState>>;
};

const WhiteLabelContext = createContext<WhiteLabelContextType | undefined>(undefined);

// Define the provider component
export function WhiteLabelProvider({ children }: { children: ReactNode }) {
  const [branding, setBranding] = useState<BrandingState>({
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png", // Default logo
    platformName: "Leadshike", // Default name
  });

  return (
    <WhiteLabelContext.Provider value={{ branding, setBranding }}>
      {children}
    </WhiteLabelContext.Provider>
  );
}

// Custom hook to easily access the context
export function useWhiteLabel() {
  const context = useContext(WhiteLabelContext);
  if (context === undefined) {
    throw new Error('useWhiteLabel must be used within a WhiteLabelProvider');
  }
  return context;
}