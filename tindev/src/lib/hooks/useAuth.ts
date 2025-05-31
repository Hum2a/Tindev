import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getDocument } from '../firebase/firestore';

export interface UserProfile {
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
  isDeveloper?: boolean;
  isClient?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        const { data: userProfile } = await getDocument<UserProfile>('users', user.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
};