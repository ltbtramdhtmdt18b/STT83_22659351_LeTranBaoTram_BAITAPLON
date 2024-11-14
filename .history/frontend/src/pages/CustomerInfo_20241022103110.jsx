import React, { useState, useEffect } from "react";

const CustomerInfo = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Nếu không có user, điều hướng về trang login
  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    }
  }, []);

  const [customerInfo, setCustomerInfo] = useState({
    name: storedUser?.name || "",
    address: storedUser?.address || "",
    phone: storedUser?.phone || "",
    email: storedUser?.email || "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

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
        {/* Input fields */}
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

// Inline styles...
export default CustomerInfo;
