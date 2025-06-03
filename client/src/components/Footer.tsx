import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Tindev</h4>
          <p>Connecting developers with opportunities</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <Link to="/about">About Us</Link>
        </div>
        <div className={styles.footerSection}>
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Tindev. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 