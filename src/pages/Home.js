import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { requests, offers } = useData();

  const recentRequests = requests.slice(0, 3);
  const recentOffers = offers.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Building Stronger Communities Together</h1>
            <p className="hero-subtitle">
              Connect with your neighbors to give and receive help. 
              From grocery runs to tech support, we're here to make community care simple and safe.
            </p>
            
            <div className="hero-actions">
              <Link to="/create-request" className="btn btn-primary btn-large">
                🆘 Need Help
              </Link>
              <Link to="/create-offer" className="btn btn-secondary btn-large">
                🤝 Offer Help
              </Link>
            </div>

            {!user && (
              <p className="hero-auth-prompt">
                <Link to="/register">Join our community</Link> to start helping your neighbors
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{requests.length}</div>
              <div className="stat-label">Active Requests</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{offers.length}</div>
              <div className="stat-label">Available Helpers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Neighbors Helped</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">Community Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="text-center mb-4">How Neighbour Aid Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">📝</div>
              <h3>1. Create Your Request</h3>
              <p>Tell us what kind of help you need - from groceries to tech support, no request is too small.</p>
            </div>
            <div className="step">
              <div className="step-icon">🔍</div>
              <h3>2. Find Your Match</h3>
              <p>Browse available helpers in your area or wait for someone to respond to your request.</p>
            </div>
            <div className="step">
              <div className="step-icon">💬</div>
              <h3>3. Connect Safely</h3>
              <p>Message each other through our secure platform to arrange the details.</p>
            </div>
            <div className="step">
              <div className="step-icon">✅</div>
              <h3>4. Help & Review</h3>
              <p>Complete the task and leave feedback to build trust in our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <div className="container">
          <div className="activity-grid">
            <div className="activity-section">
              <div className="section-header">
                <h3>Recent Help Requests</h3>
                <Link to="/browse-requests" className="view-all-link">View All →</Link>
              </div>
              <div className="activity-list">
                {recentRequests.map(request => (
                  <div key={request.id} className="activity-item">
                    <div className="activity-content">
                      <h4>{request.title}</h4>
                      <p>{request.description.substring(0, 100)}...</p>
                      <div className="activity-meta">
                        <span className="location">📍 {request.location}</span>
                        <span className={`badge badge-${request.urgency.toLowerCase()}`}>
                          {request.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="activity-section">
              <div className="section-header">
                <h3>Available Helpers</h3>
                <Link to="/browse-offers" className="view-all-link">View All →</Link>
              </div>
              <div className="activity-list">
                {recentOffers.map(offer => (
                  <div key={offer.id} className="activity-item">
                    <div className="activity-content">
                      <h4>{offer.title}</h4>
                      <p>{offer.description.substring(0, 100)}...</p>
                      <div className="activity-meta">
                        <span className="location">📍 {offer.location}</span>
                        <span className="rating">⭐ {offer.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="safety-banner">
        <div className="container">
          <div className="safety-content">
            <div className="safety-icon">🛡️</div>
            <div className="safety-text">
              <h3>Your Safety is Our Priority</h3>
              <p>All interactions are monitored, users are verified, and we provide safety guidelines for every interaction.</p>
            </div>
            <Link to="/safety" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;