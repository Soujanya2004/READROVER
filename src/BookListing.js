import React, { useState } from 'react';
import './BookListingStyles.css';

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
    // Here you would typically send account creation data to backend
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
    // Here you would typically send book listing data to backend
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

// Main App Component
const BookListingApp = () => {
  const [showAccountModal, setShowAccountModal] = useState(true);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const handleAccountCreate = () => {
    setShowAccountModal(false);
    setIsAccountCreated(true);
  };

  return (
    <div className="app-container">
      {showAccountModal && (
        <CreateAccountModal 
          onClose={() => setShowAccountModal(false)}
          onAccountCreate={handleAccountCreate}
        />
      )}
      {isAccountCreated && <BookListingForm />}
    </div>
  );
};

export default BookListingApp;