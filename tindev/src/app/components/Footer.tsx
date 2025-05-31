import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Tindev</h4>
          <p>Connecting developers with opportunities</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="/about">About Us</a>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tindev. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 