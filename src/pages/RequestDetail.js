import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const RequestDetail = () => {
  const { id } = useParams();
  const { requests } = useData();
  const { user } = useAuth();
  
  const request = requests.find(req => req.id === id);

  if (!request) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Request Not Found</h2>
        <p>The request you're looking for doesn't exist.</p>
        <Link to="/browse-requests" className="btn btn-primary">
          Browse Requests
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'success';
      case 'In Progress': return 'warning';
      case 'Completed': return 'primary';
      default: return 'primary';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
              {request.title}
            </h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <span className={`badge badge-${getStatusColor(request.status)}`}>
                {request.status}
              </span>
              <span className={`badge badge-${getUrgencyColor(request.urgency)}`}>
                {request.urgency} Priority
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Description</h3>
          <p style={{ lineHeight: '1.6', fontSize: '1.125rem' }}>
            {request.description}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <strong>Category:</strong>
            <p>📂 {request.category}</p>
          </div>
          <div>
            <strong>Location:</strong>
            <p>📍 {request.location}</p>
          </div>
          <div>
            <strong>Estimated Time:</strong>
            <p>⏰ {request.estimatedTime}</p>
          </div>
          <div>
            <strong>Preferred Time:</strong>
            <p>📅 {request.preferredTime}</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Posted on {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/browse-requests" className="btn btn-outline">
            ← Back to Requests
          </Link>
          {user && request.status === 'Open' && (
            <button className="btn btn-primary">
              Offer to Help
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;