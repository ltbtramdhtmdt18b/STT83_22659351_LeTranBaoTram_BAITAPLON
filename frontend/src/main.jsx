import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./assets/styles/index.css";
import CartState from "./Context/Cart/CartState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartState>
      <App />
    </CartState>
  </React.StrictMode>
);
