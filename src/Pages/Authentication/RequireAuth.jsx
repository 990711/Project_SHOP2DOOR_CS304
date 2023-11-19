import { useNavigate, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from 'react';
import loginService from "../../services/loginService";

import { ROLES } from './constants';

const RequireAuth = ({ allowedRoles , children}) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user roles from the database or wherever you store them
        const fetchRoles = async () => {
          try {
            const response = await loginService.getUserRoles(); // Adjust this function based on your authentication service
            const roles = response?.data?.roles || [];
            setAuth({ ...auth, roles });
          } catch (error) {
            // Handle error (e.g., token expired, network error)
            console.error('Error fetching user roles:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (!auth || !auth.roles) {
          fetchRoles();
        } else {
          setLoading(false);
        }
      }, [auth, setAuth]);
    
      if (loading) {
        // Loading state while fetching user roles
        return <div>Loading...</div>;
      }
    
      // Check if the user is authenticated and has the required roles
      const isAuthorized = auth && auth.roles.some(role => allowedRoles.includes(role));
    
      if (!isAuthorized) {
        // Redirect to the login page if not authenticated or authorized
        return <Navigate to="/login" />;
      }
    
      return <>{children}</>;
    };
    
    export default RequireAuth;