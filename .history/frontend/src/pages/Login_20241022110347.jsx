import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CustomerInfo = () => {
  const location = useLocation(); // Lấy thông tin từ location
  const user = location.state; // Lấy user từ state
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/save`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: user.username, // Sử dụng username từ state
            name: customerInfo.name,
            address: customerInfo.address,
            phone: customerInfo.phone,
            email: customerInfo.email,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("User updated:", updatedUser);
        setSaved(true); // Đánh dấu là đã lưu thành công
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save user information");
      }
    } catch (error) {
      console.error("Error updating user information", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Customer Information</h2>
      <form onSubmit={handleSave} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={customerInfo.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
      {saved && (
        <p style={styles.successMessage}>Information saved successfully!</p>
      )}
      {error && <p style={styles.error}>{error}</p>}{" "}
      {/* Hiển thị thông báo lỗi */}
    </div>
  );
};

// Inline styles for the form (same as before)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  successMessage: {
    color: "green",
    marginTop: "15px",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
};

export default CustomerInfo;
