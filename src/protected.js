// import React from "react";
// import { Navigate } from "react-router-dom";

// export const Protected = ({ element: Element }) => {
//   const token = localStorage.getItem('token'); // Use localStorage to get the token

//   if (!token) {
//     return <Navigate to="/login" />;
//   }
//   return <Element />;
// };
import React from "react";
import { Navigate } from "react-router-dom";

export const Protected = ({ element: Element }) => {
  const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('token='));

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};
