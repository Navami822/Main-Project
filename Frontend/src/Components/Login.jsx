import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";  // Importing the Home icon from react-icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
  
      if (response.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(formData)); 
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.id);
        console.log(localStorage.getItem('userId')); 
        localStorage.setItem("userEmail", response.data.email); 

        if (response.data.role === "teacher") {
          navigate("/teachers");
        } else if (response.data.role === "student") {
          navigate("/students");
        }
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
        setErrorMessage("An error occurred");
      }
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/images/image4.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      {/* Header Section with Logo, Title, and Home Link */}
      <header style={styles.header}>
        <img src="/images/logo.jpg" alt="BMI Tracker Logo" style={styles.logo} />
        <div style={{ fontSize: "32px", fontWeight: "bold", background: "linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BMI Tracker</div>
        <Link to="/" style={styles.homeLink}>
          <FaHome style={styles.homeIcon} /> {/* Home icon added here */}
          Home
        </Link>
      </header>

      {/* Login Form */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          marginTop: "120px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1 style={{ color: "#333" }}>Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div style={{ marginTop: "15px", color: "#000", fontSize: "14px" }}>
          <p>
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Space out logo, title, and home link
    marginBottom: "20px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  logo: {
    width: "80px",
    height: "60px",
    marginRight: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },
  homeLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
  },
  homeIcon: {
    marginRight: "8px", // Space between icon and text
  },
};

export default Login;
