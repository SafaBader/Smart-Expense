import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./pages/layout/HomeLayout";
//import Goal from "./pages/Goal";
import HomeIndex from "./pages/HomeIndex";
import Budgets from "./pages/Budgets/Budgets";
// import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomeIndex /> },
       //{ path: "goal", element: <Goal /> },
      { path: "budgets", element: <Budgets /> },
      // { path: "transactions", element: <Transactions /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
