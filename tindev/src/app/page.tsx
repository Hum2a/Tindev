import Link from 'next/link';
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Perfect Developer Match</h1>
          <p className="hero-subtitle">
            Connect with skilled developers or find your next project. Tindev makes it easy to build your tech team.
          </p>
          <div className="cta-buttons">
            <Link href="/signup/developer" className="cta-button primary">
              I'm a Developer
            </Link>
            <Link href="/signup/client" className="cta-button secondary">
              I'm a Client
            </Link>
          </div>
        </div>
      </section>

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
