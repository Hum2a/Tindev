import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tindev - Find Your Perfect Developer Match",
  description: "Connect with skilled developers or find your next project. Tindev makes it easy to build your tech team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="header">
          <nav className="nav-container">
            <div className="logo">Tindev</div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="/login" className="login-button">Login</a>
            </div>
          </nav>
        </header>
        {children}
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
      </body>
    </html>
  );
}
