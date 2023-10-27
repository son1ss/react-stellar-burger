import { Redirect } from "react-router-dom";
import { protectedRoutePropType } from "../../utils/prop-types";

export default function ProtectedRoute({children}) {
  if (!localStorage.getItem('refreshToken')) return <Redirect to="/react-stellar-burger/login" />
  return children
}

ProtectedRoute.propType = protectedRoutePropType