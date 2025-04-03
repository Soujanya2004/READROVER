import React, { useState } from 'react';
import './BookRentalHomePage.css';
import './BookListing.css';

// Icon Components (from previous implementation)
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

// Create Account Component
const CreateAccountModal = ({ onClose, onAccountCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onAccountCreate();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Book Listing Component
const BookListingForm = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    rentPrice: '',
    condition: 'good',
    rating: 0,
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBookData(prevState => ({
        ...prevState,
        photo: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Book Listing Submitted:', bookData);
    alert('Book Listed Successfully!');
  };

  return (
    <div className="book-listing-container">
      <h1>List Your Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="photo-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            id="book-photo"
            required
          />
          {bookData.photo && (
            <img 
              src={bookData.photo} 
              alt="Book Cover" 
              className="preview-image"
            />
          )}
          <label htmlFor="book-photo" className="upload-label">
            {bookData.photo ? 'Change Photo' : 'Upload Book Photo'}
          </label>
        </div>

        <div className="form-group">
          <label>Book Title</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Book Description</label>
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Book Condition</label>
          <select
            name="condition"
            value={bookData.condition}
            onChange={handleChange}
          >
            <option value="good">Good</option>
            <option value="very-good">Very Good</option>
            <option value="excellent">Excellent</option>
            <option value="fair">Fair</option>
          </select>
        </div>

        <div className="form-group">
          <label>Book Rating</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${bookData.rating >= star ? 'selected' : ''}`}
                onClick={() => setBookData(prev => ({...prev, rating: star}))}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Rent Price for 4 Days</label>
          <input
            type="number"
            name="rentPrice"
            value={bookData.rentPrice}
            onChange={handleChange}
            min="0"
            step="0.50"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          List Book
        </button>
      </form>
    </div>
  );
};

// Main Component
const BookRentalHomePage = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch(currentView) {
      case 'list-book':
        return (
          <div>
            <CreateAccountModal 
              onClose={() => setCurrentView('home')}
              onAccountCreate={() => setCurrentView('book-form')}
            />
          </div>
        );
      case 'book-form':
        return <BookListingForm />;
      default:
        return (
          <div className="book-rental-container">
            {/* Header */}
            <header className="header">
              <div className="logo">
                <BookIcon />
                <span className="logo-text">Campus Book Exchange</span>
              </div>
              <button className="cta-button">
                Create Account
              </button>
            </header>

            {/* Search Section */}
            <section className="search-section">
              <div className="search-wrapper">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search for books by title, author, or subject"
                />
              </div>
            </section>

            {/* Features Section */}
            <section className="features">
              <div 
                className="feature-card"
                onClick={() => setCurrentView('list-book')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <h2 className="feature-title">List Your Books</h2>
                <p className="feature-description">Post books you want to rent out to other students.</p>
              </div>

              <div className="feature-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                <h2 className="feature-title">Rent Books</h2>
                <p className="feature-description">Browse and rent books from fellow students easily.</p>
              </div>

              <div className="feature-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                <h2 className="feature-title">Connect & Chat</h2>
                <p className="feature-description">Communicate directly with book owners.</p>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {renderContent()}
    </div>
  );
};

export default BookRentalHomePage;