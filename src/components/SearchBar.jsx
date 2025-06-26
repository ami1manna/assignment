import React from 'react';
import '../App.css';

const SearchBar = ({ value, onChange, onSearch, onReset, error }) => (
  <form className="search-bar" onSubmit={onSearch}>
    <input
      type="text"
      placeholder="Enter Employee ID (e.g., 1)"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <button type="submit">Search</button>
    <button type="button" onClick={onReset}>Reset</button>
    {error && <p className="error" style={{ marginLeft: 12 }}>{error}</p>}
  </form>
);

export default SearchBar; 