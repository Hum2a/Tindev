import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import app from './config';

const db = getFirestore(app);

// User profile types
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'developer' | 'client';
  createdAt: Date;
  updatedAt: Date;
  isDeveloper?: boolean;
  isClient?: boolean;
}

export interface DeveloperProfile extends UserProfile {
  role: 'developer';
  firstName: string;
  middleNames?: string;
  lastName: string;
  city: string;
  country: string;
  timezone: string;
  phoneCode: string;
  phone: string;
  currentJobTitle?: string;
  currentEmployer?: string;
  yearsExperience?: number;
  employmentType?: string;
  availability?: string;
  salary?: {
    currency: string;
    period: string;
    amount: number;
  };
  skills: {
    frameworks: string[];
    languages: string[];
    tools: string[];
    databases: string[];
    devops: string[];
    testingTools: string[];
    methodologies: string[];
  };
  spokenLanguages: {
    language: string;
    proficiency: string;
  }[];
}

export interface ClientProfile extends UserProfile {
  role: 'client';
  companyName: string;
  projectDescription: string;
}

// Create or update a user profile
export const setUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Get a user profile
export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { profile: userSnap.data() as UserProfile, error: null };
    }
    return { profile: null, error: 'Profile not found' };
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};

// Get all developers
export const getDevelopers = async (constraints: QueryConstraint[] = []) => {
  try {
    const developersRef = collection(db, 'users');
    const q = query(
      developersRef,
      where('role', '==', 'developer'),
      ...constraints
    );
    const querySnapshot = await getDocs(q);
    
    const developers = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as DeveloperProfile[];
    
    return { developers, error: null };
  } catch (error: any) {
    return { developers: [], error: error.message };
  }
};

// Get all clients
export const getClients = async (constraints: QueryConstraint[] = []) => {
  try {
    const clientsRef = collection(db, 'users');
    const q = query(
      clientsRef,
      where('role', '==', 'client'),
      ...constraints
    );
    const querySnapshot = await getDocs(q);
    
    const clients = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    })) as ClientProfile[];
    
    return { clients, error: null };
  } catch (error: any) {
    return { clients: [], error: error.message };
  }
};

// Update a user profile
export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Delete a user profile
export const deleteUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}; 