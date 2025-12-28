import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const CreateOffer = () => {
  const { user } = useAuth();
  const { addOffer } = useData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skills: [],
    availability: '',
    location: '',
    radius: '5 miles',
    newSkill: ''
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

  const availabilityOptions = [
    'Weekday mornings',
    'Weekday afternoons', 
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings',
    'Flexible'
  ];

  const radiusOptions = [
    '1 mile',
    '3 miles',
    '5 miles',
    '10 miles',
    '15 miles'
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

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
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

    if (formData.skills.length === 0) {
      newErrors.skills = 'Add at least one skill or service';
    }

    if (!formData.availability) {
      newErrors.availability = 'Availability is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
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
      
      const newOffer = addOffer(formData);
      
      // Success - redirect to the new offer
      navigate(`/offer/${newOffer.id}`);
    } catch (error) {
      console.error('Error creating offer:', error);
      setErrors({ submit: 'Failed to create offer. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-request"> {/* Reusing styles from CreateRequest */}
      <div className="container">
        <div className="page-header">
          <h1>Create Help Offer</h1>
          <p>Share your skills and help your neighbors</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="request-form">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Offer Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Handyman Services, Pet Sitting, Tutoring"
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
                placeholder="Describe your services, experience, and what kind of help you can provide..."
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                rows={5}
                maxLength={500}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
              <span className="char-count">{formData.description.length}/500</span>
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Primary Category *
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

            {/* Skills */}
            <div className="form-group">
              <label className="form-label">
                Skills & Services *
              </label>
              <div className="skills-input">
                <div className="skill-input-row">
                  <input
                    type="text"
                    value={formData.newSkill}
                    onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill or service"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="btn btn-outline"
                    disabled={!formData.newSkill.trim()}
                  >
                    Add
                  </button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="skills-list">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="skill-remove"
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {errors.skills && <span className="error-message">{errors.skills}</span>}
              <span className="help-text">
                Add specific skills like "Plumbing", "Dog Walking", "Math Tutoring", etc.
              </span>
            </div>

            {/* Availability and Location */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="availability" className="form-label">
                  Availability *
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className={`form-select ${errors.availability ? 'error' : ''}`}
                >
                  <option value="">Select availability</option>
                  {availabilityOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.availability && <span className="error-message">{errors.availability}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="radius" className="form-label">
                  Service Radius
                </label>
                <select
                  id="radius"
                  name="radius"
                  value={formData.radius}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {radiusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
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

            {/* Helper Guidelines */}
            <div className="safety-notice">
              <div className="notice-icon">💡</div>
              <div className="notice-content">
                <h4>Helper Guidelines</h4>
                <ul>
                  <li>Be honest about your skills and experience level</li>
                  <li>Set realistic expectations for what you can help with</li>
                  <li>Always communicate through our platform initially</li>
                  <li>Meet in public places for first-time interactions</li>
                  <li>Be reliable and respectful of people's time</li>
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
                onClick={() => navigate('/browse-offers')}
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
                {isSubmitting ? 'Creating Offer...' : 'Create Offer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;