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
            type
