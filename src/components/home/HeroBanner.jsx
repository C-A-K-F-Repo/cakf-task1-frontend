export function HeroBanner({ banner }) {
  return (
    <section className="hero-banner" id="about">
      <img src={banner.imageUrl} alt={banner.imageAlt} className="hero-banner__image" />
    </section>
  );
}
