import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Để chuyển đổi giữa đăng nhập và đăng ký
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra đăng nhập đơn giản
    if (username === "admin" && password === "password") {
      const customerData = {
        username: "Admin User",
        address: "123 Main St, City, Country",
        phone: "123-456-7890",
        email: "admin@example.com",
      };

      // Chuyển hướng đến trang thông tin khách hàng và truyền dữ liệu
      navigate("/customer-info", { state: customerData });
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // Xử lý logic đăng ký tại đây, ví dụ: lưu thông tin người dùng vào database
      console.log("User signed up:", username);
      navigate("/customer-info");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Reset lỗi khi chuyển form
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignUp} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {!isLogin && (
          <div style={styles.inputGroup}>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
        )}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button onClick={toggleForm} style={styles.toggleButton}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

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
  toggleButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
