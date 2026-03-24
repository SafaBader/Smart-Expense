import * as React from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = React.useState(undefined);
  //you can write the use state without React

  //Using `undefined` as a third auth state (`loading`) is a valid pattern. That is a good idea.
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  if (user === undefined) return null;

  if (!user) return <Navigate to="/" replace />;
  //Eedirecting to `/` works, but from a UX perspective `/login` is usually the better target for protected routes. Sending the user to the landing page adds an unnecessary extra click.

  return children;
}
