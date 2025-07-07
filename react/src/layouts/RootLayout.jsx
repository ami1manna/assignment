import React from 'react';
import TopNav from '../components/TopNav/TopNav';
import { Outlet } from 'react-router-dom';

const RootLayout = () => (
  <div className="app-container">
    <TopNav />
    <main>
      <Outlet />
    </main>
  </div>
);

export default RootLayout; 