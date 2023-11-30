import { Redirect, useLocation } from 'react-router-dom';
import { useGetUserQuery } from '../../services/api';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { refetch, isFetching } = useGetUserQuery();

  useEffect(() => {
    refetch();
  }, []);

  const location = useLocation();
  if (isFetching) return <p>Loading...</p>;
  if (!localStorage.getItem('refreshToken')) return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  return <>{children}</>;
}
