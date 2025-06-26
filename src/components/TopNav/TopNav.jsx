import React from 'react';
import styles from './TopNav.module.css';

const TopNav = () => (
  <nav className={styles.topnav}>
    <div className={styles.navLogo}>Employee Dashboard</div>
    <div className={styles.navLinks}>
      {/* Add navigation links here if needed */}
    </div>
  </nav>
);

export default TopNav; 