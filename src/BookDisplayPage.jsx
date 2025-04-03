import React, { useState } from 'react';
import './BookDisplayPage.css';

// Book Card Component
const BookCard = ({ book }) => {
  const { title, author, description, rentPrice, condition, rating, photo } = book;
  
  // Function to render rating stars
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <div className="book-card">
      <div className="book-image">
        {photo ? (
          <img src={photo} alt={title} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <div className="book-details">
        <h2 className="book-title">{title}</h2>
        <p className="book-author">by {author}</p>
        <div className="book-rating">{renderStars(rating)}</div>
        <p className="book-condition">Condition: <span>{condition}</span></p>
        <p className="book-price">₹{rentPrice} / 4 days</p>
        <p className="book-description">{description}</p>
        <button className="rent-button">Rent Now</button>
      </div>
    </div>
  );
};

// Book Display Page Component
const BookDisplayPage = ({ books = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Filter and sort books
  const filteredBooks = books.filter(book => {
    // If no search term or filter, show all books
    if (!searchTerm && !filter) return true;
    
    // Filter by search term
    const matchesSearch = !searchTerm || 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by condition
    const matchesCondition = !filter || book.condition === filter;
    
    return matchesSearch && matchesCondition;
  }).sort((a, b) => {
    // Sort books based on selected sort option
    if (sortBy === 'price-low') {
      return parseFloat(a.rentPrice) - parseFloat(b.rentPrice);
    } else if (sortBy === 'price-high') {
      return parseFloat(b.rentPrice) - parseFloat(a.rentPrice);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // Default: no sorting
  });

  return (
    <div className="book-display-container">
      <header className="book-display-header">
        <h1>Available Books for Rent</h1>
        <div className="filter-section">
          <input 
            type="text" 
            placeholder="Search books..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="filter-dropdown"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Filter by Condition</option>
            <option value="excellent">Excellent</option>
            <option value="very-good">Very Good</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
          <select 
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>
      </header>
      
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <div className="no-books-message">
            <p>No books have been listed yet. Be the first to list a book!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDisplayPage;