import React from 'react';

function SearchBar({ value, onChange, placeholder = 'Search...', onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="search-container w-full" style={{ maxWidth: 'none', margin: '0' }}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {onSearch && (
        <button type="submit" className="btn btn-primary btn-sm" style={{ marginLeft: 'var(--spacing-sm)' }}>
          Search
        </button>
      )}
    </form>
  );
}

export default SearchBar;
