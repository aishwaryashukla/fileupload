import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
const THA_HOST=import.meta.env.VITE_THA_HOST;

const PrivateRoute = () => {
   const token =   "test"; //localStorage.getItem("token");
   const username = localStorage.getItem("userName");
   
   console.log("Token in PrivateRoute:", token);
   console.log("Username in PrivateRoute:", username);
  
    return token ? <Outlet /> : <Navigate to={`${THA_HOST}/login`} />;
}

export default PrivateRoute
