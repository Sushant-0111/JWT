// import { useEffect } from "react";
// import { useAuth } from "../context/useAuth"
// import { useNavigate } from "react-router-dom";


// const PrivateRoute = ({children}) =>{
//         const nav = useNavigate();
//         const {isAuthenticated,loading} = useAuth();
//         useEffect(() => {
//             if (!isAuthenticated) {
//                 nav('/login'); // Redirects to login if not authenticated
//             }
//         }, [isAuthenticated, nav]); // Dependency array includes variables used in useEffect
    
//         if (!isAuthenticated) {
//             return null; // Optionally render nothing while navigating
//         }
    
//         return children;
//     };
    
//     export default PrivateRoute;



import React from 'react';
import { useAuth } from '../context/useAuth';

import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  
  if (loading) return <h1>Loading....</h1>;

  if (user) {
    return children
  }
  else {
    nav('/login')
  }

};

export default PrivateRoute;