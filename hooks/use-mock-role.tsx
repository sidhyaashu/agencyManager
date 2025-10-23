"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the roles for type safety
export type Role = 'agency-owner' | 'va' | 'client';

type User = {
  name: string;
  avatar?: string;
};

type MockRoleContextType = {
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
  user: User;
};

// Create the context
const MockRoleContext = createContext<MockRoleContextType | undefined>(undefined);

// Define the provider component
export function MockRoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('agency-owner'); // Default role

  // Dummy user data that changes based on the role
  const users: Record<Role, User> = {
    'agency-owner': { name: 'Shekhar', avatar: '/avatars/user.jpg' },
    'va': { name: 'VA Jessica', avatar: '/avatars/va.png' },
    'client': { name: 'Junaid Asghar', avatar: '/avatars/junaid.png' },
  };

  const user = users[role];

  return (
    <MockRoleContext.Provider value={{ role, setRole, user }}>
      {children}
    </MockRoleContext.Provider>
  );
}

// Custom hook to easily access the context
export function useMockRole() {
  const context = useContext(MockRoleContext);
  if (context === undefined) {
    throw new Error('useMockRole must be used within a MockRoleProvider');
  }
  return context;
}