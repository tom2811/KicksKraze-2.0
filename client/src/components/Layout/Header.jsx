import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">KicksKraze</Link>
        <Link to="/store">Store</Link>
        {user ? (
          <>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;