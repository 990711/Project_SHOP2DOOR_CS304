import { useNavigate, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from 'react';
import loginService from "../../Services/loginService";
import { ROLES } from './constants';

const RequireAuth = ({ allowedRole , children}) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user roles from the database or wherever you store them
    const fetchRole = async () => {
      try {
        const response = await loginService.getUserRole();
        const newRole = response?.data?.role || [];

        setAuth(prevAuth => ({ ...prevAuth, role: newRole }));
      } catch (error) {
        // Handle error (e.g., token expired, network error)
        console.error('Error fetching user roles:', error);
      } finally {
        setLoading(false);
      }
      };

    
        if (!auth || !auth.role) {
          fetchRole();
        } else {
          setLoading(false);
        }
      }, [auth, setAuth]);
    
      if (loading) {
        // Loading state while fetching user roles
        return <div>Loading...</div>;
      }
    
      // Check if the user is authenticated and has the required roles
      const isAuthorized = auth && auth.role.some(role => allowedRole.includes(role));
    
      if (!isAuthorized) {
        // Redirect to the login page if not authenticated or authorized
        return <Navigate to="/login" />;
      }
    
      return <>{children}</>;
    };
    
    export default RequireAuth;