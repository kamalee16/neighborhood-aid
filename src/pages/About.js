import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About Neighbour Aid</h1>
          <p className="hero-subtitle">
            Building stronger, more connected communities through mutual support and neighborly care.
          </p>
        </section>

        {/* Who We Are */}
        <section className="about-section">
          <div className="section-content">
            <div className="section-text">
              <h2>Who We Are</h2>
              <p>
                Neighbour Aid is a community-driven platform that connects neighbors who need help 
                with those who can provide it. We believe that strong communities are built on 
                mutual support, trust, and the simple act of neighbors helping neighbors.
              </p>
              <p>
                Founded in 2024, our platform has already facilitated hundreds of meaningful 
                connections, from grocery runs for elderly neighbors to tech support for those 
                less familiar with technology.
              </p>
            </div>
            <div className="section-image">
              <div className="placeholder-image">
                <span>🏘️</span>
                <p>Community Connection</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="about-section alternate">
          <div className="section-content">
            <div className="section-image">
              <div className="placeholder-image">
                <span>🎯</span>
                <p>Our Mission</p>
              </div>
            </div>
            <div className="section-text">
              <h2>Our Mission</h2>
              <p>
                To create a secure, accessible platform that strengthens neighborhood bonds by 
                making it easy for community members to request help, offer assistance, and 
                connect safely with their neighbors.
              </p>
              <p>
                We envision a world where no one feels isolated or unable to get the help they 
                need, and where everyone has the opportunity to contribute to their community's 
                wellbeing.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="about-section">
          <div className="section-content">
            <div className="section-text">
              <h2>What We Do</h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">🛒</div>
                  <div className="feature-content">
                    <h4>Daily Assistance</h4>
                    <p>Grocery shopping, errands, and everyday tasks that make life easier.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔧</div>
                  <div className="feature-content">
                    <h4>Home & Garden Help</h4>
                    <p>Basic repairs, gardening, moving assistance, and home maintenance.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💻</div>
                  <div className="feature-content">
                    <h4>Technology Support</h4>
                    <p>Computer setup, smartphone help, and digital literacy assistance.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🐕</div>
                  <div className="feature-content">
                    <h4>Pet & Childcare</h4>
                    <p>Pet sitting, dog walking, babysitting, and tutoring services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works-detailed">
          <h2 className="text-center mb-4">How It Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up Safely</h3>
                <p>Create your account with email verification. Add your location (general area only) and tell us about yourself.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Request or Offer Help</h3>
                <p>Post what you need help with, or browse requests to see how you can help others in your community.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Connect Securely</h3>
                <p>Use our built-in messaging system to discuss details. Your personal information stays private.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Help & Build Trust</h3>
                <p>Complete the task and leave reviews. Build your reputation as a trusted community member.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="values-section">
          <h2 className="text-center mb-4">Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>Every interaction is designed with safety in mind. We verify users, protect privacy, and provide clear guidelines.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Community Trust</h3>
              <p>We foster trust through transparency, user reviews, and a commitment to authentic community connections.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">♿</div>
              <h3>Accessibility</h3>
              <p>Our platform is designed to be usable by everyone, regardless of age, technical skill, or physical ability.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌍</div>
              <h3>Inclusivity</h3>
              <p>We welcome all community members and strive to create an environment where everyone feels valued.</p>
            </div>
          </div>
        </section>

        {/* Safety Commitment */}
        <section className="safety-commitment">
          <div className="safety-content">
            <h2>Our Safety Commitment</h2>
            <p>
              Your safety and privacy are our top priorities. We've implemented multiple layers 
              of protection to ensure every interaction on our platform is secure and trustworthy.
            </p>
            <div className="safety-features">
              <div className="safety-feature">
                <span className="safety-icon">✅</span>
                <span>Email verification for all users</span>
              </div>
              <div className="safety-feature">
                <span className="safety-icon">🔒</span>
                <span>Private messaging system</span>
              </div>
              <div className="safety-feature">
                <span className="safety-icon">📍</span>
                <span>Location privacy protection</span>
              </div>
              <div className="safety-feature">
                <span className="safety-icon">⭐</span>
                <span>User rating and review system</span>
              </div>
              <div className="safety-feature">
                <span className="safety-icon">🚨</span>
                <span>Report and block functionality</span>
              </div>
              <div className="safety-feature">
                <span className="safety-icon">👮</span>
                <span>24/7 content moderation</span>
              </div>
            </div>
            <Link to="/safety" className="btn btn-primary mt-3">
              Read Full Safety Guidelines
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-content">
            <h2>Contact & Support</h2>
            <p>
              Have questions, suggestions, or need help? We're here to support our community.
            </p>
            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div className="contact-info">
                  <h4>Email Support</h4>
                  <p><a href="mailto:support@neighbouraid.com">support@neighbouraid.com</a></p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div className="contact-info">
                  <h4>Emergency Line</h4>
                  <p><a href="tel:+1-555-0123">(555) 012-3456</a></p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">💬</div>
                <div className="contact-info">
                  <h4>Community Forum</h4>
                  <p><a href="#">Join the Discussion</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <p>Start building connections with your neighbors today.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/browse-requests" className="btn btn-outline btn-large">
                Browse Requests
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;