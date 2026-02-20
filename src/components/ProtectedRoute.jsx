import * as React from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase"; 

export default function ProtectedRoute({ children }) {
  const [user, setUser] = React.useState(undefined); 

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  
  if (user === undefined) return null; 

  if (!user) return <Navigate to="/" replace />;

  return children;
}
