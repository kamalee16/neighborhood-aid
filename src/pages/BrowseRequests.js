import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import './BrowseRequests.css';

const BrowseRequests = () => {
  const { requests } = useData();
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    urgency: '',
    location: '',
    status: 'Open'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Shopping', 'Pet Care', 'Technology', 'Home Repair', 'Transportation', 'Education', 'Other'];
  const urgencyLevels = ['Low', 'Medium', 'High'];
  const locations = ['Downtown Area', 'Riverside District', 'Oak Street', 'University District', 'Suburban Area'];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || request.category === filters.category;
    const matchesUrgency = !filters.urgency || request.urgency === filters.urgency;
    const matchesLocation = !filters.location || request.location === filters.location;
    const matchesStatus = !filters.status || request.status === filters.status;

    return matchesSearch && matchesCategory && matchesUrgency && matchesLocation && matchesStatus;
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
      urgency: '',
      location: '',
      status: 'Open'
    });
    setSearchTerm('');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
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
    <div className="browse-requests">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Browse Help Requests</h1>
            <p>Find ways to help your neighbors in need</p>
          </div>
          {user && (
            <Link to="/create-request" className="btn btn-primary">
              Create Request
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search requests..."
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
              <label htmlFor="urgency-filter">Urgency</label>
              <select
                id="urgency-filter"
                value={filters.urgency}
                onChange={(e) => handleFilterChange('urgency', e.target.value)}
              >
                <option value="">All Urgency Levels</option>
                {urgencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
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
              <label htmlFor="status-filter">Status</label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
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
            Showing {filteredRequests.length} of {requests.length} requests
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Requests Grid */}
        <div className="requests-grid">
          {filteredRequests.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No requests found</h3>
              <p>Try adjusting your filters or search terms</p>
              {user && (
                <Link to="/create-request" className="btn btn-primary mt-2">
                  Create the First Request
                </Link>
              )}
            </div>
          ) : (
            filteredRequests.map(request => (
              <div key={request.id} className="request-card">
                <div className="card-header">
                  <h3>{request.title}</h3>
                  <div className="card-badges">
                    <span className={`badge badge-${getUrgencyColor(request.urgency)}`}>
                      {request.urgency}
                    </span>
                    <span className={`badge badge-${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>

                <div className="card-content">
                  <p className="request-description">
                    {request.description}
                  </p>

                  <div className="request-details">
                    <div className="detail-item">
                      <span className="detail-icon">📂</span>
                      <span>{request.category}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{request.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <span>{request.estimatedTime}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{request.preferredTime}</span>
                    </div>
                  </div>

                  <div className="request-meta">
                    <span className="posted-date">
                      Posted on {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="card-actions">
                  <Link 
                    to={`/request/${request.id}`} 
                    className="btn btn-outline"
                  >
                    View Details
                  </Link>
                  {user && request.status === 'Open' && (
                    <button className="btn btn-primary">
                      Offer Help
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        {!user && (
          <div className="cta-section">
            <div className="cta-content">
              <h3>Want to Help Your Neighbors?</h3>
              <p>Join our community to start offering help and making a difference</p>
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

export default BrowseRequests;