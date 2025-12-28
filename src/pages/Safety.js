import React from 'react';
import { Link } from 'react-router-dom';
import './Safety.css';

const Safety = () => {
  return (
    <div className="safety">
      <div className="container">
        {/* Hero Section */}
        <section className="safety-hero">
          <div className="hero-icon">🛡️</div>
          <h1>Safety & Community Guidelines</h1>
          <p className="hero-subtitle">
            Your safety and security are our top priorities. Learn how we keep our community safe and trusted.
          </p>
        </section>

        {/* Quick Safety Tips */}
        <section className="quick-tips">
          <h2>Quick Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🔒</div>
              <h3>Protect Your Privacy</h3>
              <p>Never share exact addresses, phone numbers, or personal details in public posts</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💬</div>
              <h3>Use Our Messaging</h3>
              <p>Always communicate through our secure platform before meeting in person</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">👥</div>
              <h3>Meet Safely</h3>
              <p>First meetings should be in public places during daylight hours when possible</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚨</div>
              <h3>Trust Your Instincts</h3>
              <p>If something feels wrong, don't hesitate to cancel or report concerning behavior</p>
            </div>
          </div>
        </section>

        {/* Detailed Guidelines */}
        <section className="guidelines-section">
          <h2>Detailed Safety Guidelines</h2>
          
          <div className="guideline-category">
            <h3>🔐 Account Security</h3>
            <div className="guideline-content">
              <ul>
                <li><strong>Email Verification:</strong> All accounts must be verified with a valid email address</li>
                <li><strong>Strong Passwords:</strong> Use unique, strong passwords and never share your login credentials</li>
                <li><strong>Profile Information:</strong> Only share general location areas, never exact addresses</li>
                <li><strong>Phone Verification:</strong> Optional but recommended for additional security</li>
              </ul>
            </div>
          </div>

          <div className="guideline-category">
            <h3>💬 Communication Safety</h3>
            <div className="guideline-content">
              <ul>
                <li><strong>Platform Messaging:</strong> Always start conversations through our secure messaging system</li>
                <li><strong>Personal Information:</strong> Never share phone numbers, addresses, or financial information in messages</li>
                <li><strong>Appropriate Language:</strong> Keep all communication respectful and professional</li>
                <li><strong>Suspicious Messages:</strong> Report any inappropriate or suspicious communication immediately</li>
              </ul>
            </div>
          </div>

          <div className="guideline-category">
            <h3>🤝 Meeting Guidelines</h3>
            <div className="guideline-content">
              <ul>
                <li><strong>Public First Meetings:</strong> Always meet new helpers/requesters in public places first</li>
                <li><strong>Daylight Hours:</strong> Schedule initial meetings during daylight hours when possible</li>
                <li><strong>Tell Someone:</strong> Let a friend or family member know where you're going and when</li>
                <li><strong>Bring a Friend:</strong> Consider bringing someone with you for first meetings</li>
                <li><strong>Trust Your Gut:</strong> If you feel uncomfortable, it's okay to leave or cancel</li>
              </ul>
            </div>
          </div>

          <div className="guideline-category">
            <h3>🏠 Home Safety</h3>
            <div className="guideline-content">
              <ul>
                <li><strong>Gradual Trust Building:</strong> Only invite helpers into your home after establishing trust</li>
                <li><strong>Valuables Security:</strong> Secure valuable items and important documents</li>
                <li><strong>Emergency Contacts:</strong> Keep emergency contacts easily accessible</li>
                <li><strong>Exit Strategy:</strong> Always have a way to contact help if needed</li>
                <li><strong>Background Checks:</strong> For ongoing help, consider requesting references</li>
              </ul>
            </div>
          </div>

          <div className="guideline-category">
            <h3>💰 Financial Safety</h3>
            <div className="guideline-content">
              <ul>
                <li><strong>No Upfront Payments:</strong> Never pay for services before they're completed</li>
                <li><strong>Reasonable Rates:</strong> Be wary of prices that seem too good to be true</li>
                <li><strong>Payment Methods:</strong> Use secure payment methods and keep receipts</li>
                <li><strong>No Financial Information:</strong> Never share bank details, credit card info, or passwords</li>
                <li><strong>Scam Awareness:</strong> Be alert to common scams and report suspicious requests</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Verification System */}
        <section className="verification-section">
          <h2>Our Verification System</h2>
          <div className="verification-grid">
            <div className="verification-item">
              <div className="verification-icon">📧</div>
              <h3>Email Verification</h3>
              <p>All users must verify their email address before accessing the platform</p>
            </div>
            <div className="verification-item">
              <div className="verification-icon">📱</div>
              <h3>Phone Verification</h3>
              <p>Optional phone verification adds an extra layer of security and trust</p>
            </div>
            <div className="verification-item">
              <div className="verification-icon">⭐</div>
              <h3>Review System</h3>
              <p>User ratings and reviews help build trust and identify reliable community members</p>
            </div>
            <div className="verification-item">
              <div className="verification-icon">✅</div>
              <h3>Verification Badges</h3>
              <p>Verified users display badges showing their verification status</p>
            </div>
          </div>
        </section>

        {/* Reporting System */}
        <section className="reporting-section">
          <h2>Reporting & Support</h2>
          <div className="reporting-content">
            <div className="reporting-text">
              <h3>When to Report</h3>
              <ul>
                <li>Inappropriate or threatening messages</li>
                <li>Suspicious or scam-like behavior</li>
                <li>Violation of community guidelines</li>
                <li>Safety concerns or incidents</li>
                <li>Fake profiles or impersonation</li>
              </ul>
              
              <h3>How to Report</h3>
              <ul>
                <li>Use the "Report" button on user profiles or messages</li>
                <li>Contact our support team directly</li>
                <li>For emergencies, contact local authorities first</li>
              </ul>
            </div>
            <div className="reporting-actions">
              <div className="action-card">
                <h4>Report a User</h4>
                <p>Report inappropriate behavior or safety concerns</p>
                <button className="btn btn-outline">Report User</button>
              </div>
              <div className="action-card">
                <h4>Contact Support</h4>
                <p>Get help with safety questions or concerns</p>
                <a href="mailto:safety@neighbouraid.com" className="btn btn-primary">
                  Email Support
                </a>
              </div>
              <div className="action-card emergency">
                <h4>Emergency</h4>
                <p>For immediate safety concerns</p>
                <a href="tel:911" className="btn btn-danger">
                  Call 911
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Community Standards */}
        <section className="standards-section">
          <h2>Community Standards</h2>
          <div className="standards-grid">
            <div className="standard-item">
              <h3>🤝 Respect & Kindness</h3>
              <p>Treat all community members with respect, kindness, and understanding</p>
            </div>
            <div className="standard-item">
              <h3>🎯 Honest Communication</h3>
              <p>Be honest about your needs, abilities, and availability</p>
            </div>
            <div className="standard-item">
              <h3>🔒 Privacy Respect</h3>
              <p>Respect others' privacy and personal boundaries</p>
            </div>
            <div className="standard-item">
              <h3>⚖️ Fair Exchange</h3>
              <p>Ensure fair and reasonable exchanges of help and services</p>
            </div>
            <div className="standard-item">
              <h3>🚫 Zero Tolerance</h3>
              <p>No harassment, discrimination, or illegal activities</p>
            </div>
            <div className="standard-item">
              <h3>🌟 Community First</h3>
              <p>Prioritize the wellbeing and safety of our community</p>
            </div>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="emergency-section">
          <h2>Emergency Resources</h2>
          <div className="emergency-grid">
            <div className="emergency-item">
              <h3>🚨 Emergency Services</h3>
              <p>Police, Fire, Medical Emergency</p>
              <a href="tel:911" className="emergency-number">911</a>
            </div>
            <div className="emergency-item">
              <h3>🆘 Crisis Hotline</h3>
              <p>24/7 Crisis Support</p>
              <a href="tel:988" className="emergency-number">988</a>
            </div>
            <div className="emergency-item">
              <h3>👮 Non-Emergency Police</h3>
              <p>Non-urgent police matters</p>
              <a href="tel:311" className="emergency-number">311</a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="safety-cta">
          <div className="cta-content">
            <h2>Ready to Join Our Safe Community?</h2>
            <p>Follow these guidelines to help us maintain a safe, trusted environment for everyone</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Join Safely
              </Link>
              <Link to="/about" className="btn btn-outline btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Safety;