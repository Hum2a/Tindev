'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import AuthModal from './modals/AuthModal';
import { useAuth } from '@/lib/hooks/useAuth';
import { updateUserRole, getDocument } from '@/lib/firebase/firestore';
import type { UserProfile } from '@/lib/hooks/useAuth';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'developer' | 'client' | null>(null);
  const { user, profile, loading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(profile);

  React.useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleRoleSelect = async (role: 'developer' | 'client') => {
    if (!user) {
      setSelectedRole(role);
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setIsUpdating(true);
      setError(null);
      
      // Don't update if the role is already set
      if (
        (role === 'developer' && localProfile?.isDeveloper) ||
        (role === 'client' && localProfile?.isClient)
      ) {
        return;
      }

      const { error: updateError } = await updateUserRole(user.uid, role);
      if (updateError) {
        throw new Error(updateError);
      }
      // Refetch the user profile after update
      const { data: updatedProfile } = await getDocument<UserProfile>('users', user.uid);
      setLocalProfile(updatedProfile as UserProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      console.error('Error updating role:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Find Your Perfect
          <span className={styles.highlight}> Tech Match</span>
        </h1>
        <p className={styles.subtitle}>
          Connect with developers and clients in the tech industry.
          Build your network and grow your career.
        </p>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.ctaContainer}>
          <button
            className={`${styles.ctaButton} ${localProfile?.isDeveloper ? styles.selectedButton : ''}`}
            onClick={() => handleRoleSelect('developer')}
            disabled={isUpdating || localProfile?.isDeveloper}
          >
            {isUpdating && !localProfile?.isDeveloper ? 'Updating...' : 
             localProfile?.isDeveloper ? 'Developer Profile Active' : 
             "I'm a Developer"}
          </button>
          <button
            className={`${styles.ctaButton} ${localProfile?.isClient ? styles.selectedButton : ''}`}
            onClick={() => handleRoleSelect('client')}
            disabled={isUpdating || localProfile?.isClient}
          >
            {isUpdating && !localProfile?.isClient ? 'Updating...' : 
             localProfile?.isClient ? 'Client Profile Active' : 
             "I'm a Client"}
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setSelectedRole(null);
        }}
      />

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Tindev?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Matching</h3>
            <p>Our algorithm matches developers with projects that fit their skills and preferences.</p>
          </div>
          <div className="feature-card">
            <h3>Verified Profiles</h3>
            <p>All developers are verified and their skills are validated by our team.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Communication</h3>
            <p>Built-in chat system for seamless communication between developers and clients.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and create your detailed profile highlighting your skills or project requirements.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Find Matches</h3>
            <p>Browse through potential matches and swipe right on the ones you like.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect & Collaborate</h3>
            <p>Start conversations with your matches and begin your collaboration journey.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
