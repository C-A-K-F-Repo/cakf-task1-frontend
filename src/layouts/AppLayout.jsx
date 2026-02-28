import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Overview" }
];

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Frontend Boilerplate</h1>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
