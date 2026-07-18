import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Razorpay Store</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;