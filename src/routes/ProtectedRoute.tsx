import useAuthStore from "@/store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  if (useAuthStore((state) => state.user).isLogged) {
    return <>{element}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
