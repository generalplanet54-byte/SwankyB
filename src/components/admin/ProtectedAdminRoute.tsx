import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/me', { 
          credentials: 'include',
          headers: { 'Accept': 'application/json' }
        });
        if (!mounted) return;
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        console.warn('Admin authentication API not available in development mode:', err);
        setAuthenticated(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-8">Checking authentication...</div>;

  if (!authenticated) return <Navigate to="/admin" replace />;

  return children;
};

export default ProtectedAdminRoute;
