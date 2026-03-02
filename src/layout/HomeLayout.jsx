import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sideBar/Sidebar";
import AppHeader from "../components/appHeader/AppHeader";
import "../layout/HomeLayout.css";

const headerMap = [
  { match: /^\/home\/?$/, title: "Home", subtitle: "Your daily snapshot" },
  { match: /^\/home\/goal\/?$/, title: "Savings Goal", subtitle: "Track your progress" },
  { match: /^\/home\/budgets\/?$/, title: "Budgets", subtitle: "Plan and control spending" },
  { match: /^\/home\/transactions\/?$/, title: "Transactions", subtitle: "Review your history" },
];

function getHeader(pathname) {
  return headerMap.find((x) => x.match.test(pathname)) || {
    title: "Smart Expense",
    subtitle: "Stay on track",
  };
}

export default function HomeLayout() {
  const { pathname } = useLocation();
  const { title, subtitle } = getHeader(pathname);

  return (
    <section className="homelayout">
      <Sidebar />

      <section className="appMain">
        <AppHeader title={title} subtitle={subtitle} />

        <main className="content">
          <section className="contentInner">
            <Outlet />
          </section>
        </main>
      </section>
    </section>
  );
}