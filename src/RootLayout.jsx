import React from 'react';
import TopNav from './components/TopNav/TopNav';
import { Outlet } from 'react-router-dom';

const RootLayout = () => (
  <div>
    <TopNav />
    <main style={{ marginTop: 64 }}>
      <Outlet />
    </main>
  </div>
);

export default RootLayout; 