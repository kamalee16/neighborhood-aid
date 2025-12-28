import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { requests, offers } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const userRequests = requests.filter(req => req.createdBy === 'current-user');
  const userOffers = offers.filter(offer => offer.createdBy === 'current-user');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'success';
      case 'In Progress': return 'warning';
      case 'Completed': return 'primary';
      default: return 'primary';
    }
  };

  return (
    <div className="profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              <span className="avatar-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              <p className="profile-location">📍 {user.location}</p>
              <p className="profile-member-since">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
              <div className="profile-badges">
                {user.verified && (
                  <span className="badge badge-success">✓ Verified</span>
                )}
                {user.rating > 0 && (
                  <span className="badge badge-primary">
                    ⭐ {user.rating} Rating
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button 
              onClick={logout}
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="edit-profile">
            <form onSubmit={handleEditSubmit} className="edit-form">
              <h3>Edit Profile</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={editData.location}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={editData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell your neighbors about yourself..."
                  className="form-textarea"
                  rows={4}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-number">{userRequests.length}</div>
            <div className="stat-label">Requests Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{userOffers.length}</div>
            <div className="stat-label">Help Offers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{user.completedRequests}</div>
            <div className="stat-label">Tasks Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{user.helpedNeighbors}</div>
            <div className="stat-label">Neighbors Helped</div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              My Requests ({userRequests.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'offers' ? 'active' : ''}`}
              onClick={() => setActiveTab('offers')}
            >
              My Offers ({userOffers.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-section">
                    <h3>About Me</h3>
                    <p>
                      {user.bio || 'No bio added yet. Click "Edit Profile" to add information about yourself.'}
                    </p>
                  </div>
                  <div className="overview-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                      {userRequests.slice(0, 3).map(request => (
                        <div key={request.id} className="activity-item">
                          <span className="activity-type">📝 Request:</span>
                          <span className="activity-title">{request.title}</span>
                          <span className={`badge badge-${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                      ))}
                      {userOffers.slice(0, 2).map(offer => (
                        <div key={offer.id} className="activity-item">
                          <span className="activity-type">🤝 Offer:</span>
                          <span className="activity-title">{offer.title}</span>
                          <span className="badge badge-primary">Active</span>
                        </div>
                      ))}
                      {userRequests.length === 0 && userOffers.length === 0 && (
                        <p className="no-activity">No recent activity</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <div className="requests-tab">
                {userRequests.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No Requests Yet</h3>
                    <p>You haven't created any help requests yet.</p>
                    <button 
                      onClick={() => navigate('/create-request')}
                      className="btn btn-primary"
                    >
                      Create Your First Request
                    </button>
                  </div>
                ) : (
                  <div className="items-grid">
                    {userRequests.map(request => (
                      <div key={request.id} className="item-card">
                        <div className="item-header">
                          <h4>{request.title}</h4>
                          <span className={`badge badge-${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="item-description">
                          {request.description.substring(0, 100)}...
                        </p>
                        <div className="item-meta">
                          <span>📂 {request.category}</span>
                          <span>📅 {new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="item-actions">
                          <button className="btn btn-outline btn-sm">
                            View Details
                          </button>
                          {request.status === 'Open' && (
                            <button className="btn btn-primary btn-sm">
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Offers Tab */}
            {activeTab === 'offers' && (
              <div className="offers-tab">
                {userOffers.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🤝</div>
                    <h3>No Offers Yet</h3>
                    <p>You haven't created any help offers yet.</p>
                    <button 
                      onClick={() => navigate('/create-offer')}
                      className="btn btn-primary"
                    >
                      Create Your First Offer
                    </button>
                  </div>
                ) : (
                  <div className="items-grid">
                    {userOffers.map(offer => (
                      <div key={offer.id} className="item-card">
                        <div className="item-header">
                          <h4>{offer.title}</h4>
                          <span className="badge badge-success">Active</span>
                        </div>
                        <p className="item-description">
                          {offer.description.substring(0, 100)}...
                        </p>
                        <div className="skills-list">
                          {offer.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="item-meta">
                          <span>📂 {offer.category}</span>
                          <span>📅 {new Date(offer.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="item-actions">
                          <button className="btn btn-outline btn-sm">
                            View Details
                          </button>
                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="empty-state">
                  <div className="empty-icon">⭐</div>
                  <h3>No Reviews Yet</h3>
                  <p>Complete some tasks to start receiving reviews from your neighbors.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;