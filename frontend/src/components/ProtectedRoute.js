import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({children, requiredRole}) => {
    const { userRole } = useAuth()
    if(userRole !== requiredRole && userRole !== 'admin')
        return <Navigate to='/forbidden'></Navigate>

    return children
}

export default ProtectedRoute;
