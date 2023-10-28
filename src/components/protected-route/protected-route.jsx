import { Redirect, useLocation } from "react-router-dom";
import { protectedRoutePropType } from "../../utils/prop-types";

export default function ProtectedRoute({children}) {
  const location = useLocation()
  if (!localStorage.getItem('refreshToken')) return (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  )
  return children
}

ProtectedRoute.propType = protectedRoutePropType