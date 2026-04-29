import React from 'react';
import Navbar from './Navbar';

function Layout({ children, darkMode, toggleDarkMode }) {
  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;