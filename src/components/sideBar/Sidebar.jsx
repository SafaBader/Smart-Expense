import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "../sideBar/Sidebar.css";
import logo from "../../assets/SE-logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="sidebar">
      <section className="sidebarBrand">
        <img src={logo} alt="SmartExpense" className="logo" />
        <span>Smart Expense</span>
      </section>


      <nav className="nav">
        <NavLink to="/home" end className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
          Home
        </NavLink>

        <NavLink to="/home/goal" className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
          Goal
        </NavLink>

        <NavLink to="/home/budgets" className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
          Budgets
        </NavLink>

        <NavLink to="/home/transactions" className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
          Transactions
        </NavLink>

        <NavLink to="/home/settings" className={({ isActive }) => (isActive ? "navItem active" : "navItem")}>
          Settings
        </NavLink>
      </nav>

      <button className="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}