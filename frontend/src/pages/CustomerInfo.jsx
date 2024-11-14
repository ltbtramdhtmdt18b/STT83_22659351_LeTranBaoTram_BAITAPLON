import React, { useState } from "react";

const CustomerInfo = () => {
  // State to store customer information
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [saved, setSaved] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // Function to handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/save`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: user.username, // Thêm username để tìm user
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
      }
    } catch (error) {
      console.error("Error updating user information", error);
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
    </div>
  );
};

// Inline styles for the form
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
};

export default CustomerInfo;
