import "./ProductCard.css";
function ProductCard({ product, handlePayment, handlePaymentLink }) {
  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  const badge =
    product.rating >= 4.8
      ? "Best Seller"
      : product.discountPercentage >= 15
      ? "Hot Deal"
      : "Popular";

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />

        <span className="badge">{badge}</span>
      </div>

      <div className="product-content">
        <p className="brand">{product.brand || "Premium Brand"}</p>

        <h2>{product.title}</h2>

        <div className="rating">
          ⭐ {product.rating}

          <span>
            ({Math.floor(product.rating * 20)} Reviews)
          </span>
        </div>

        <div className="price-box">
          <span className="old-price">
            Rs {originalPrice}
          </span>

          <span className="price">
            Rs {product.price}
          </span>
        </div>

        <div className="discount">
          {product.discountPercentage.toFixed(0)}% OFF
        </div>

        <div className="stock">
          {product.stock > 10 ? (
            <span className="in-stock">
              ● In Stock
            </span>
          ) : (
            <span className="low-stock">
              Only {product.stock} Left
            </span>
          )}
        </div>

        <p className="description">
  {product.description.length > 120
    ? product.description.substring(0, 120) + "..."
    : product.description}
</p>

        <div className="button-group">

          <button
            className="buy-btn"
            onClick={() => handlePayment(product)}
          >
            Buy Now
          </button>

          <button
            className="link-btn"
            onClick={() => handlePaymentLink(product)}
          >
            Share Payment Link
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;