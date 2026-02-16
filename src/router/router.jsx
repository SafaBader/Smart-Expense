import { createBrowserRouter } from "react-router-dom";
import Budgets from "../pages/Budgets/Budgets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "/budgets",
    element: <Budgets />,
  },
]);

export default router;
