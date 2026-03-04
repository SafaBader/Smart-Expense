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
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
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
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Home
        </NavLink>

        <NavLink
          to="/home/goal"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Goal
        </NavLink>

        <NavLink
          to="/home/budgets"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Budgets
        </NavLink>

        <NavLink
          to="/home/transactions"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Transactions
        </NavLink>

        <NavLink
          to="/home/settings"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "navItem active" : "navItem")}
        >
          Settings
        </NavLink>
      </nav>

      <button className="navItem logoutItem" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}