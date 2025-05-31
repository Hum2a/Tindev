import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from './config';
import { createUserProfile, getDocument } from './firestore';

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's profile with their display name
    await updateProfile(user, {
      displayName: displayName
    });

    // Create user profile in Firestore
    const { error: profileError } = await createUserProfile(user.uid, {
      displayName,
      email,
      createdAt: new Date(),
      photoURL: user.photoURL || undefined,
    });

    if (profileError) {
      console.error('Error creating user profile:', profileError);
      // We don't throw here because the user is already created in Firebase Auth
    }

    return { user, error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { user: null, error: error.message };
    }
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { user: null, error: error.message };
    }
    return { user: null, error: 'An unexpected error occurred' };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    return { error: 'An unexpected error occurred' };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user profile already exists
    const { data: existingProfile } = await getDocument('users', user.uid);

    // Only create profile if it doesn't exist
    if (!existingProfile) {
      const { error: profileError } = await createUserProfile(user.uid, {
        displayName: user.displayName || '',
        email: user.email || '',
        createdAt: new Date(),
        photoURL: user.photoURL || undefined,
      });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // We don't throw here because the user is already signed in
      }
    }

    return { user, error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { user: null, error: error.message };
    }
    return { user: null, error: 'An unexpected error occurred' };
  }
}; 