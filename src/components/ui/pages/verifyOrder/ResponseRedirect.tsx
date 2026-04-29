import { Navigate, useLocation } from "react-router-dom";

export default function ResponseRedirect() {
  const location = useLocation();

  return <Navigate to={`/order/verify${location.search || ""}`} replace />;
}
