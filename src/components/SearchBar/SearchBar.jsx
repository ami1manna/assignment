import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ value, onChange, onSearch, onReset, error }) => (
  <form className={styles.searchBar} onSubmit={onSearch}>
    <input
      type="text"
      placeholder="Enter Employee ID (e.g., 1)"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={styles.searchInput}
    />
    <button type="submit" className={styles.searchButton}>Search</button>
    <button type="button" className={`${styles.searchButton} ${styles.resetButton}`} onClick={onReset}>Reset</button>
    {error && <p className="error" style={{ marginLeft: 12 }}>{error}</p>}
  </form>
);

export default SearchBar; 