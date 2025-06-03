import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { getCurrentUser, onAuthStateChange } from '../firebase/auth';
import { getUserProfile } from '../firebase/firestore';
import type { UserProfile } from '../firebase/firestore';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        const { profile, error } = await getUserProfile(user.uid);
        setState({
          user,
          profile,
          loading: false,
          error
        });
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return state;
}; 