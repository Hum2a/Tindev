'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import AuthModal from '../modals/AuthModal';
import { useAuth } from '@/lib/hooks/useAuth';
import { logOut } from '@/lib/firebase/auth';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          TinDev
        </Link>

        <nav className={styles.nav}>
          {!loading && (
            <>
              {user ? (
                <div className={styles.userSection}>
                  <div className={styles.userInfo}>
                    {profile?.photoURL ? (
                      <img 
                        src={profile.photoURL} 
                        alt={profile.displayName || 'User'} 
                        className={styles.userAvatar}
                      />
                    ) : (
                      <div className={styles.userAvatarPlaceholder}>
                        {profile?.displayName?.[0] || user.email?.[0] || 'U'}
                      </div>
                    )}
                    <span className={styles.userName}>
                      {profile?.displayName || user.email}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className={styles.loginButton}
                >
                  Login
                </button>
              )}
            </>
          )}
        </nav>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header; 