import { NavLink, Outlet } from "react-router-dom";
import "./HomeLayout.css";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function HomeLayout() {
    const navigate = useNavigate();

async function handleLogout() {
  try {
    await signOut(auth);
    navigate("/");
  } catch (err) {
    console.error("Logout error:", err);
  }
}
  return (
    <div className="home">
      <aside className="sidebar">
        <div className="sidebar__brand">Smart Expense</div>

        <nav className="sidebar__nav">
          <NavLink to="/home" end className={({ isActive }) => (isActive ? "link active" : "link")}>
            Home
          </NavLink>

          <NavLink to="budgets" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Budgets
          </NavLink>
          <NavLink to="settings" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Settings
          </NavLink> 

          
          { <NavLink to="transactions" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Transactions
          </NavLink> 
          
          /*<NavLink to="goal" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Savings Goal
          </NavLink>*/}
        </nav>

        <div className="sidebar__footer">
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
            </button>
        </div>
      </aside>

      <section className="content">
        <Outlet />
      </section>
    </div>
  );
}