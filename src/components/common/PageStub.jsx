export function PageStub({ title, description, children }) {
  return (
    <section className="page-stub">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}
