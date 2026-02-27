import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./pages/layout/HomeLayout";
//import Goal from "./pages/Goal";
import HomeIndex from "./pages/HomeIndex";
import Budgets from "./pages/Budgets/Budgets";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings/Settings";

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
      { path: "transactions", element:<TransactionsPage/> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
