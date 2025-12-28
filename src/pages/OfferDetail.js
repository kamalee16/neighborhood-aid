import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const OfferDetail = () => {
  const { id } = useParams();
  const { offers } = useData();
  const { user } = useAuth();
  
  const offer = offers.find(off => off.id === id);

  if (!offer) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Offer Not Found</h2>
        <p>The helper profile you're looking for doesn't exist.</p>
        <Link to="/browse-offers" className="btn btn-primary">
          Browse Helpers
        </Link>
      </div>
    );
  }

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'var(--accent-color)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '2.5rem',
            flexShrink: 0
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              {offer.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              {offer.rating > 0 ? (
                <>
                  <span style={{ color: 'var(--warning-color)', fontSize: '1.125rem' }}>
                    {getRatingStars(offer.rating)}
                  </span>
                  <span style={{ color: 'var(--text-color)' }}>
                    {offer.rating} ({offer.completedJobs} jobs completed)
                  </span>
                </>
              ) : (
                <span style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>
                  New Helper
                </span>
              )}
              <span className="badge badge-success">✓ Verified</span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>About This Helper</h3>
          <p style={{ lineHeight: '1.6', fontSize: '1.125rem' }}>
            {offer.description}
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Skills & Services</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {offer.skills.map((skill, index) => (
              <span 
                key={index} 
                style={{
                  background: 'var(--accent-color)',
                  color: 'var(--primary-color)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <strong>Category:</strong>
            <p>📂 {offer.category}</p>
          </div>
          <div>
            <strong>Location:</strong>
            <p>📍 {offer.location}</p>
          </div>
          <div>
            <strong>Service Radius:</strong>
            <p>🌍 {offer.radius}</p>
          </div>
          <div>
            <strong>Availability:</strong>
            <p>⏰ {offer.availability}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Helper since {new Date(offer.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/browse-offers" className="btn btn-outline">
            ← Back to Helpers
          </Link>
          {user && (
            <button className="btn btn-primary">
              Contact Helper
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;