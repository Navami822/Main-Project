import React, { useState } from "react";
import { Link } from "react-router-dom";

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
          <Link to="/students" style={styles.navLink}>Home</Link>
          <Link to="/student-details" style={styles.navLink}>Profile</Link>
          <Link to="/replies" style={styles.navLink}>Replies</Link>
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
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "120px auto 50px auto", // Added top margin to avoid overlap with the navbar
    padding: "20px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(255,255,255,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    minHeight: "100px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginBottom: "10px",
    color: "#0f0",
  },

  // Navbar Styles
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    width: "100%",
    backgroundColor: "#1a1a2e",
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
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
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  logoText: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
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
    backgroundColor: "#007bff",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default DoubtForm;
