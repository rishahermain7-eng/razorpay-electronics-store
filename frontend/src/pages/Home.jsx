import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {

    const urls = [
      "https://dummyjson.com/products/category/laptops",
      "https://dummyjson.com/products/category/tablets",
      "https://dummyjson.com/products/category/mobile-accessories",
      "https://dummyjson.com/products/category/smartphones"
    ];

    const responses = await Promise.all(
      urls.map(url => fetch(url))
    );

    const results = await Promise.all(
      responses.map(r => r.json())
    );

    const allProducts = results.flatMap(item => item.products);

    setProducts(allProducts);

  } catch (error) {

    console.error(error);

  }
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
  category === "All" ||
  product.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handlePayment = async (product) => {
    try {
      const { data } = await API.post("/orders", {
        productId: product.id,
        amount: product.price,
        productName: product.title,
      });

  

      const options = {
        key: data.key,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "Razorpay Store",
        description: product.title,
        image: product.thumbnail,
        order_id: data.razorpayOrder.id,

        prefill: {
          name: "Risha",
          email: "risha@example.com",
          contact: "9876543210",
        },

        notes: {
          productId: product.id,
        },

        theme: {
          color: "#3395ff",
        },

        handler: async function (response) {
          try {
            const verify = await API.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verify.data.success) {
              alert("Payment Verified Successfully!");
            }
          } catch (error) {
            console.error(error);
            alert("Payment Verification Failed");
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentLink = async (product) => {
  try {
    const { data } = await API.post("/payment-link", {
      amount: product.price,
      productName: product.title,
    });

    if (data.success) {
      window.open(data.paymentLink, "_blank");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to generate payment link");
  }
};

  return (
    <>
      <section className="hero">
        <h1>Premium Electronics Store</h1>

        <p>Secure online shopping powered by Razorpay.</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="categories">
          {[
            "All",
            "laptops",
            "mobile-accessories",
            "tablets",
            "smartphones",
          ].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="products">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        handlePayment={handlePayment}
        handlePaymentLink={handlePaymentLink}
      />
    ))
  ) : (
    <h2
      style={{
        textAlign: "center",
        gridColumn: "1 / -1",
        color: "#555",
      }}
    >
      No products found.
    </h2>
  )}
</section>

  <section className="features">

  <div className="feature-card">
    <div className="feature-icon">🚚</div>
    <h3>Free Delivery</h3>
    <p>Fast & reliable delivery on selected products.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">🔒</div>
    <h3>Secure Payments</h3>
    <p>100% secure payments powered by Razorpay.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">📄</div>
    <h3>Instant Invoice</h3>
    <p>Download your invoice immediately after purchase.</p>
  </div>

  <div className="feature-card">
    <div className="feature-icon">💬</div>
    <h3>24/7 Support</h3>
    <p>We're always here to help whenever you need us.</p>
  </div>

</section>

  <section className="stats">

  <div className="stat-card">
    <h2>500+</h2>
    <p>Products</p>
  </div>

  <div className="stat-card">
    <h2>1000+</h2>
    <p>Happy Customers</p>
  </div>

  <div className="stat-card">
    <h2>100%</h2>
    <p>Secure Payments</p>
  </div>

  <div className="stat-card">
    <h2>24/7</h2>
    <p>Customer Support</p>
  </div>

</section>

    </>
  );
}

export default Home;