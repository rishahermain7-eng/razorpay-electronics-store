import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="orders-page">

      <h1>My Orders</h1>

      {orders.map((order) => (

        <div className="order-card" key={order._id}>

          <div className="order-left">

            <h2>{order.productName || "Electronics Product"}</h2>

            <p>
              <strong>Order ID:</strong> {order.razorpayOrderId}
            </p>

            <p>
              <strong>Amount:</strong> Rs {order.amount}
            </p>

          </div>

          <div className="order-right">

            <span
              className={
                order.status === "paid"
                  ? "paid"
                  : "pending"
              }
            >
              {order.status.toUpperCase()}
            </span>

            <a
              href={`http://localhost:5000/api/invoice/${order._id}`}
              target="_blank"
              rel="noreferrer"
            >
              <button>Download Invoice</button>
            </a>

          </div>

        </div>

      ))}

    </div>
  );
}

export default Orders;