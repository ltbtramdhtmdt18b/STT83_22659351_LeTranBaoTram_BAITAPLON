import Navbar from "../components/Navbar";
import Store from "../pages/Store";
import About from "../pages/About";
import Login from "../pages/Login";
import CustomerInfo from "../pages/CustomerInfo";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/customer-info" element={<CustomerInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
