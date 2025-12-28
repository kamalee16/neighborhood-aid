import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import './BrowseOffers.css';

const BrowseOffers = () => {
  const { offers } = useData();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    availability: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Shopping', 'Pet Care', 'Technology', 'Home Repair', 'Transportation', 'Education', 'Other'];
  const locations = ['Downtown Area', 'Riverside District', 'Oak Street', 'University District', 'Suburban Area'];
  const availabilities = ['Weekdays', 'Weekends', 'Evenings', 'Mornings', 'Flexible'];

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filters.category || offer.category === filters.category;
    const matchesLocation = !filters.location || offer.location === filters.location;
    const matchesAvailability = !filters.availability || offer.availability.includes(filters.availability);

    return matchesSearch && matchesCategory && matchesLocation && matchesAvailability;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      availability: ''
    });
    setSearchTerm('');
  };

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
    <div className="browse-offers">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Browse Help Offers</h1>
            <p>Find neighbors ready to help in your community</p>
          </div>
          {user && (
            <Link to="/create-offer" className="btn btn-primary">
              Create Offer
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search offers or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location-filter">Location</label>
              <select
                id="location-filter"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="availability-filter">Availability</label>
              <select
                id="availability-filter"
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              >
                <option value="">All Times</option>
                {availabilities.map(availability => (
                  <option key={availability} value={availability}>{availability}</option>
                ))}
              </select>
            </div>

            <div className="filter-actions">
              <button onClick={clearFilters} className="btn btn-outline">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing {filteredOffers.length} of {offers.length} helpers
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="offers-grid">
          {filteredOffers.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No helpers found</h3>
              <p>Try adjusting your filters or search terms</p>
              {user && (
                <Link to="/create-offer" className="btn btn-primary mt-2">
                  Be the First Helper
                </Link>
              )}
            </div>
          ) : (
            filteredOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <div className="card-header">
                  <div className="helper-info">
                    <div className="helper-avatar">
                      <span className="avatar-placeholder">👤</span>
                    </div>
                    <div className="helper-details">
                      <h3>{offer.title}</h3>
                      <div className="helper-rating">
                        {offer.rating > 0 ? (
                          <>
                            <span className="stars">{getRatingStars(offer.rating)}</span>
                            <span className="rating-text">
                              {offer.rating} ({offer.completedJobs} jobs)
                            </span>
                          </>
                        ) : (
                          <span className="new-helper">New Helper</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="verification-badge">
                    <span className="badge badge-success">✓ Verified</span>
                  </div>
                </div>

                <div className="card-content">
                  <p className="offer-description">
                    {offer.description}
                  </p>

                  <div className="skills-section">
                    <h4>Skills & Services</h4>
                    <div className="skills-list">
                      {offer.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="offer-details">
                    <div className="detail-item">
                      <span className="detail-icon">📂</span>
                      <span>{offer.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{offer.location} (within {offer.radius})</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <span>{offer.availability}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>Joined {new Date(offer.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <Link 
                    to={`/offer/${offer.id}`} 
                    className="btn btn-outline"
                  >
                    View Profile
                  </Link>
                  {user && (
                    <button className="btn btn-primary">
                      Contact Helper
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Helper Stats */}
        <div className="helper-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🤝</div>
              <div className="stat-content">
                <div className="stat-number">{offers.length}</div>
                <div className="stat-label">Active Helpers</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-number">4.8</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-number">200+</div>
                <div className="stat-label">Tasks Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="cta-section">
            <div className="cta-content">
              <h3>Ready to Get Help from Your Neighbors?</h3>
              <p>Join our community to connect with trusted helpers in your area</p>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-primary">
                  Join Now
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseOffers;