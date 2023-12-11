/*
import { Route, useLocation, Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, ...props }) => {
    const user = props.user;
  
    if (!user) {
      // Redirect to login page if there is no user
      return <Navigate to="/login" />;
    }
  
    return <Route {...props}>{children}</Route>;
  };
  
  export default ProtectedRoute;
  */
  
  import { useLocation, Navigate } from 'react-router-dom';

  const ProtectedRoute = ({ children }) => {
      const location = useLocation();
      const user = location.state?.user;
      console.log('User in ProtectedRoute:', user);
  
      if (!user) {
        console.log('Redirecting to login');
          // Redirect to login page if there is no user
          return <Navigate to="/login" />;
      }
  
      return children;
  };
  
  export default ProtectedRoute;
  
  