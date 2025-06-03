import React, { useState } from 'react';
import styles from './Home.module.css';
import AuthModal from '../modals/AuthModal';
import { useAuth } from '../lib/hooks/useAuth';
import { updateUserProfile, getUserProfile } from '../lib/firebase/firestore';
import DevForm from '../forms/DevForm';
import ClientForm from '../forms/ClientForm';

interface UserProfile {
  isDeveloper?: boolean;
  isClient?: boolean;
  uid: string;
  // Add other profile fields as needed
}

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'developer' | 'client' | null>(null);
  const { user, profile, loading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(profile);

  const isDevSelected = selectedRole === 'developer' || (selectedRole === null && localProfile?.isDeveloper);
  const isClientSelected = selectedRole === 'client' || (selectedRole === null && localProfile?.isClient);

  React.useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const handleRoleSelect = async (role: 'developer' | 'client') => {
    if (!user) {
      setSelectedRole(role === selectedRole ? null : role);
      setIsAuthModalOpen(true);
      return;
    }
    try {
      setIsUpdating(true);
      setError(null);
      // Toggle logic
      const isCurrentlyActive = (role === 'developer' && (selectedRole === 'developer' || (!selectedRole && localProfile?.isDeveloper))) ||
                              (role === 'client' && (selectedRole === 'client' || (!selectedRole && localProfile?.isClient)));
      if (isCurrentlyActive) {
        // Deselect both
        const { error: updateError } = await updateUserProfile(user.uid, { isDeveloper: false, isClient: false });
        if (updateError) throw new Error(updateError);
        setSelectedRole(null);
        const { profile: updatedProfile } = await getUserProfile(user.uid);
        setLocalProfile(updatedProfile as UserProfile);
        return;
      }
      // Select the clicked role, deselect the other
      const { error: updateError } = await updateUserProfile(user.uid, {
        isDeveloper: role === 'developer',
        isClient: role === 'client',
      });
      if (updateError) throw new Error(updateError);
      setSelectedRole(role);
      const { profile: updatedProfile } = await getUserProfile(user.uid);
      setLocalProfile(updatedProfile as UserProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      console.error('Error updating role:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDevFormSubmit = async (data: any) => {
    // Handle developer form submission
    console.log('Developer form submitted:', data);
  };

  const handleClientFormSubmit = async (data: any) => {
    // Handle client form submission
    console.log('Client form submitted:', data);
  };

  if (loading) {
    return (
      <div className={styles.home}>
        <div className={styles.hero}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      {/* Animated Background Shapes */}
      <div className={styles.animatedBg}>
        <div className={`${styles.animatedShape} ${styles.animatedShape1}`}></div>
        <div className={`${styles.animatedShape} ${styles.animatedShape2}`}></div>
        <div className={`${styles.animatedShape} ${styles.animatedShape3}`}></div>
      </div>

      {/* Hero Section with Glass Card */}
      <div className={styles.hero}>
        <div className={styles.glassCard}>
          <h1 className={styles.title}>
            Find Your Perfect
            <span> Tech Match</span>
          </h1>
          <p className={styles.subtitle}>
            Connect with developers and clients in the tech industry.<br />
            Build your network and grow your career.
          </p>

          {error && (
            <div className={styles.errorMessage}>{error}</div>
          )}

          {/* Interactive Role Selection */}
          <div className={styles.roleSelect}>
            <div
              className={
                `${styles.roleCard} ${isDevSelected ? styles.selected : ''}`
              }
              onClick={() => handleRoleSelect('developer')}
              tabIndex={0}
              role="button"
              aria-pressed={isDevSelected ? "true" : "false"}
            >
              <span className={styles.roleIcon} role="img" aria-label="Developer">💻</span>
              Developer
              {isDevSelected && <div style={{fontSize: '0.9rem', color: '#6a82fb', marginTop: 4}}>Active</div>}
            </div>
            <div
              className={
                `${styles.roleCard} ${styles.client} ${isClientSelected ? styles.selected : ''}`
              }
              onClick={() => handleRoleSelect('client')}
              tabIndex={0}
              role="button"
              aria-pressed={isClientSelected ? "true" : "false"}
            >
              <span className={styles.roleIcon} role="img" aria-label="Client">🚀</span>
              Client
              {isClientSelected && <div style={{fontSize: '0.9rem', color: '#fc5c7d', marginTop: 4}}>Active</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Forms */}
      {(selectedRole === 'developer' || localProfile?.isDeveloper) &&
        <DevForm onSubmit={handleDevFormSubmit} />}
      {(selectedRole === 'client' || localProfile?.isClient) &&
        <ClientForm onSubmit={handleClientFormSubmit} />}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setSelectedRole(null);
        }}
      />

      {/* Features Section */}
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🎯</div>
          <h3>Smart Matching</h3>
          <p>Our algorithm matches developers with projects that fit their skills and preferences.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🔒</div>
          <h3>Verified & Secure</h3>
          <p>All profiles are verified and your data is protected with industry best practices.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💬</div>
          <h3>Seamless Communication</h3>
          <p>Built-in chat system for effortless collaboration between developers and clients.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🌐</div>
          <h3>Global Network</h3>
          <p>Connect with top talent and clients from around the world.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and create your detailed profile highlighting your skills or project requirements.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Find Matches</h3>
            <p>Browse through potential matches and swipe right on the ones you like.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Connect & Collaborate</h3>
            <p>Start conversations with your matches and begin your collaboration journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 