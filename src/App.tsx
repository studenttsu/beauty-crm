import React, { useEffect } from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import './App.css';

import { useAuth } from './contexts/AuthContext';

function App() {
  const { isLoggedIn, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Заявки</Link></li>
            <li><Link to="/employees">Сотрудники</Link></li>
          </ul>
        </nav>

        <button onClick={logout}>Logout</button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
