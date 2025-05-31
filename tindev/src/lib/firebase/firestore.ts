import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  DocumentData,
  QueryConstraint,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './config';

// Generic function to add or update a document
export const setDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

// Generic function to get a document
export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: docSnap.data() as T, error: null };
    }
    return { data: null, error: 'Document not found' };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An unexpected error occurred' };
  }
};

// Generic function to get multiple documents with filters
export const getDocuments = async <T extends DocumentData & { id: string }>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const documents: T[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() } as T);
    });
    
    return { data: documents, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An unexpected error occurred' };
  }
};

// Generic function to update a document
export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data as DocumentData);
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

// Generic function to delete a document
export const deleteDocument = async (
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

export const createUserProfile = async (userId: string, userData: {
  displayName: string;
  email: string;
  createdAt: Date;
  photoURL?: string;
}) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      updatedAt: new Date(),
    });
    return { error: null };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { error: 'Failed to create user profile' };
  }
};

export const updateUserRole = async (userId: string, role: 'developer' | 'client') => {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData = {
      isDeveloper: role === 'developer',
      isClient: role === 'client',
      updatedAt: new Date(),
    };
    await updateDoc(userRef, updateData);
    return { error: null };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { error: 'Failed to update user role' };
  }
}; 