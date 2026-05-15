import { Link, Outlet } from "react-router-dom";

import { navSections } from "../mocks/homePageMock";

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-topbar__inner">
          <div className="brand-mark" aria-label="CAKF SHOP">
            <Link to="/" className="brand-mark__badge">CAKF SHOP</Link>
          </div>

          <nav className="app-nav" aria-label="Main navigation">
            {navSections.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <Link to="/login" className="account-link" aria-label="Перейти до входу">
            <svg viewBox="0 0 24 24" role="img">
              <path d="M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8Zm0 2c-3.87 0-7 2.24-7 5v1h14v-1c0-2.76-3.13-5-7-5Z" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
