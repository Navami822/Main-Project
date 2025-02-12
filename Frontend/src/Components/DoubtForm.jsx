import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaChartLine } from "react-icons/fa";  // Importing icons from react-icons

const DoubtForm = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [doubt, setDoubt] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doubtData = { studentEmail, teacherEmail, doubt };

    const response = await fetch("http://localhost:5000/api/doubts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doubtData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Doubt submitted successfully!");
      setStudentEmail("");
      setTeacherEmail("");
      setDoubt("");
    } else {
      setMessage("Error submitting doubt. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src="/images/logo.jpg" alt="Logo" style={styles.logo} />
          <div style={styles.logoText}>Student Dashboard</div>
        </div>
        <div style={styles.navLinks}>
          <Link to="/students" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </Link>
          <Link to="/student-details" style={styles.navLink}>
            <FaUser style={styles.icon} /> Profile
          </Link>
          <Link to="/replies" style={styles.navLink}>
            <FaEnvelope style={styles.icon} /> Replies
          </Link>
          <Link to="/chart" style={styles.navLink}>
            <FaChartLine style={styles.icon} /> Chart
          </Link>
        </div>
      </header>

      {/* Form Section */}
      <h2 style={styles.title}>Ask Your Doubt</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Teacher's Email"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Type your doubt here..."
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          required
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      <footer style={styles.footer}>
        © {new Date().getFullYear()} BMI Tracker | Stay Fit, Stay Healthy
      </footer>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "120px auto 50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    color: "#333",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  footer: {
    position: "fixed", // Keeps the footer at the bottom
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparent black background
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
  },

  
  title: {
    marginBottom: "20px",
    background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "18px",
    width: "100%",
  },
  textarea: {
    padding: "15px",
    minHeight: "120px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "18px",
    marginBottom: "15px",
    width: "100%",
  },
  button: {
    padding: "15px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
  },
  message: {
    marginBottom: "15px",
    color: "#28a745",
  },

  // Navbar Styles
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent black background
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  logo: {
    width: "80px",
    height: "60px",
    borderRadius: "0",
    backgroundColor: "#007BFF",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "8px", // Spacing between icon and text
  },
};

export default DoubtForm;
