import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/sideBar/Sidebar";
import AppHeader from "../components/appHeader/AppHeader";
import "../layout/HomeLayout.css";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const isMobile = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <section className="homelayout homelayout--drawer">
      {isMobile ? (
        <>
          <section className="mobileTop">
            <IconButton onClick={() => setOpen(true)} size="large" aria-label="Open menu">
              <MenuIcon />
            </IconButton>
          </section>

          <Drawer open={open} onClose={closeDrawer} anchor="left">
            <Box sx={{ width: 280 }}>
              <Sidebar onNavigate={closeDrawer} />
            </Box>
          </Drawer>
        </>
      ) : (
        <aside className="navArea">
          <Sidebar />
        </aside>
      )}

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