import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import './CreateRequest.css';

const CreateRequest = () => {
  const { user } = useAuth();
  const { addRequest } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'Medium',
    location: '',
    estimatedTime: '',
    preferredTime: '',
    contactPreference: 'message'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Shopping',
    'Pet Care', 
    'Technology',
    'Home Repair',
    'Transportation',
    'Education',
    'Companionship',
    'Other'
  ];

  const urgencyLevels = [
    { value: 'Low', label: 'Low - Can wait a few days', color: 'success' },
    { value: 'Medium', label: 'Medium - Within 1-2 days', color: 'warning' },
    { value: 'High', label: 'High - Urgent, ASAP', color: 'danger' }
  ];

  const timeEstimates = [
    '30 minutes',
    '1 hour',
    '2-3 hours',
    'Half day',
    'Full day',
    'Multiple days',
    'Ongoing'
  ];

  const preferredTimes = [
    'Weekday mornings',
    'Weekday afternoons', 
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings',
    'Flexible'
  ];

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.estimatedTime) {
      newErrors.estimatedTime = 'Estimated time is required';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest = addRequest(formData);
      
      // Success - redirect to the new request
      navigate(`/request/${newRequest.id}`);
    } catch (error) {
      console.error('Error creating request:', error);
      setErrors({ submit: 'Failed to create request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-request">
      <div className="container">
        <div className="page-header">
          <h1>Create Help Request</h1>
          <p>Tell your neighbors what kind of help you need</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="request-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Request Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Need help with grocery shopping"
                className={`form-input ${errors.title ? 'error' : ''}`}
                maxLength={100}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
              <span className="char-count">{formData.title.length}/100</span>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide details about what you need help with, any special requirements, etc."
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                rows={5}
                maxLength={500}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
              <span className="char-count">{formData.description.length}/500</span>
            </div>

            {/* Category and Urgency */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`form-select ${errors.category ? 'error' : ''}`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <span className="error-message">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="urgency" className="form-label">
                  Urgency Level *
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {urgencyLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                General Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Area, Near Main Street"
                className={`form-input ${errors.location ? 'error' : ''}`}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
              <span className="help-text">
                🔒 For your safety, only provide a general area, not your exact address
              </span>
            </div>

            {/* Time Details */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="estimatedTime" className="form-label">
                  Estimated Time Needed *
                </label>
                <select
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  className={`form-select ${errors.estimatedTime ? 'error' : ''}`}
                >
                  <option value="">Select estimated time</option>
                  {timeEstimates.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.estimatedTime && <span className="error-message">{errors.estimatedTime}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="preferredTime" className="form-label">
                  Preferred Time *
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className={`form-select ${errors.preferredTime ? 'error' : ''}`}
                >
                  <option value="">Select preferred time</option>
                  {preferredTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
              </div>
            </div>

            {/* Contact Preference */}
            <div className="form-group">
              <label className="form-label">Contact Preference</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="contactPreference"
                    value="message"
                    checked={formData.contactPreference === 'message'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-label">
                    💬 Message through platform (Recommended)
                  </span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="contactPreference"
                    value="both"
                    checked={formData.contactPreference === 'both'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-label">
                    📞 Message or phone call
                  </span>
                </label>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="safety-notice">
              <div className="notice-icon">🛡️</div>
              <div className="notice-content">
                <h4>Safety Reminder</h4>
                <ul>
                  <li>Never share personal information like exact address or phone number in your request</li>
                  <li>Use our messaging system for initial contact</li>
                  <li>Meet helpers in public places when possible</li>
                  <li>Trust your instincts - report any concerning behavior</li>
                </ul>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="submit-error">
                {errors.submit}
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/browse-requests')}
                className="btn btn-outline"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Request...' : 'Create Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;