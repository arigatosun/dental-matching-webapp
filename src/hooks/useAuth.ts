// src/hooks/useAuth.ts
import { AuthContext, AuthContextType } from '@/auth/context/auth-context';
import { useContext } from 'react';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
