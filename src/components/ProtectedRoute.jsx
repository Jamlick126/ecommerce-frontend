import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // check if the token exists in localStorage
    const token = localStorage.getItem("token");

    // If no token, redirect to the account
    if (!token) {
        alert("Please login to access this page");
        return<Navigate to="/account" replace/>;
    }
    // If token exists, render the requested page
    return children;
};

export default ProtectedRoute;