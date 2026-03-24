import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../sideBar/Sidebar.css";
import logo from "../../assets/logo.png";

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate?.();
      navigate("/"); //After logout you navigate to `/`. Functional, but `/login` would make the next step more obvious for the user.
    } catch (error) {
      console.error("Logout error:", error);
      // Errors are only logged to the console. In a real app, logout failure should also surface a user-facing message.
    }
  };

  const handleNavClick = () => {
    onNavigate?.();
  };

  return (
    <aside className="sidebar">
      <section className="sidebarBrand">
        <img src={logo} alt="SmartExpense" className="logo" />
        <span>Smart Expense</span>
      </section>
      <nav className="nav">
        <NavLink
          to="/home"
          end
          onClick={handleNavClick}
          //  Repeated `className={({ isActive }) => ...}` logic is a bit duplicated. Consider extracting a helper to reduce repetition and make future nav changes easier.
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/home/goal"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          Goal
        </NavLink>

        <NavLink
          to="/home/budgets"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          Budgets
        </NavLink>

        <NavLink
          to="/home/transactions"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          Transactions
        </NavLink>

        <NavLink
          to="/home/settings"
          onClick={handleNavClick}
          className={({ isActive }) =>
            isActive ? "navItem active" : "navItem"
          }
        >
          Settings
        </NavLink>
      </nav>
      {/* Add `type="button"` to the logout button. It is not inside a form now, but
      explicit button types prevent accidental submit behavior when components
      get reused. */}
      <button className="navItem logoutItem" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
