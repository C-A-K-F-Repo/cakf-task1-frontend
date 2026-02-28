import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="page-stub">
      <h2>Page Not Found</h2>
      <p>The requested route does not exist in this boilerplate.</p>
      <Link to="/">Go to home</Link>
    </section>
  );
}
