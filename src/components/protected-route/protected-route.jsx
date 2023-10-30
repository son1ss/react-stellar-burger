import { Redirect, useLocation } from "react-router-dom";
import { protectedRoutePropType } from "../../utils/prop-types";
import { useGetUserQuery } from "../../services/api";
import { useEffect } from "react";

export default function ProtectedRoute({children}) {
  const { refetch, isFetching } = useGetUserQuery()

  useEffect(() => {
    refetch()
  }, [])

  
  const location = useLocation()
  if (isFetching) return 'Loading...'  
  if (!localStorage.getItem('refreshToken')) return (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  )
  return children
}

ProtectedRoute.propType = protectedRoutePropType