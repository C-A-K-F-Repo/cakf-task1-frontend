export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-card__body">
        <div className="product-card__copy">
          <h3>{product.name}</h3>
          <p className="product-card__description">{product.description}</p>
        </div>

        <div className="product-card__footer">
          <p className="product-card__price">
            {product.price} <span>{product.currency}</span>
          </p>

          <button type="button" className="product-card__button">
            Купити
          </button>
        </div>
      </div>
    </article>
  );
}
