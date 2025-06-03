import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Tindev</h1>
          <p>Connecting developers, fostering growth, and building the future of tech together.</p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.container}>
          <h2>Our Mission</h2>
          <p>
            At Tindev, we believe that meaningful connections between developers can lead to
            incredible innovations and growth opportunities. Our mission is to create a platform
            where developers can find their perfect professional match, whether it's for
            collaboration, mentorship, or career advancement.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>Our Values</h2>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <h3>Community First</h3>
              <p>
                We prioritize building a strong, supportive community where developers can
                learn, grow, and succeed together.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Continuous Learning</h3>
              <p>
                We encourage knowledge sharing and continuous learning to help developers
                stay at the forefront of technology.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Authentic Connections</h3>
              <p>
                We focus on creating genuine, meaningful connections between developers
                based on shared interests and goals.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3>Innovation</h3>
              <p>
                We embrace innovation and creativity, supporting developers in their
                journey to build the next generation of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className={styles.container}>
          <h2>Our Team</h2>
          <p className={styles.teamIntro}>
            We're a team of passionate developers and tech enthusiasts dedicated to
            making the developer community more connected and collaborative.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/team/placeholder.jpg" alt="Team Member" />
              </div>
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/team/placeholder.jpg" alt="Team Member" />
              </div>
              <h3>Jane Smith</h3>
              <p>Head of Product</p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamMemberImage}>
                <img src="/team/placeholder.jpg" alt="Team Member" />
              </div>
              <h3>Mike Johnson</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.join}>
        <div className={styles.container}>
          <h2>Join Our Community</h2>
          <p>
            Be part of a growing community of developers who are shaping the future of
            technology. Sign up today and start connecting with like-minded professionals.
          </p>
          <button className={styles.joinButton}>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default About; 