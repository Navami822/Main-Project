import { useState } from "react";
import axios from "axios";
import { FaHome, FaUser, FaQuestionCircle, FaReply } from "react-icons/fa";

export default function DoubtForm() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    teacherEmail: "",
    doubt: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/doubts", formData);
      setMessage(response.data.message);
      setFormData({ studentEmail: "", teacherEmail: "", doubt: "" });
    } catch (error) {
      setMessage("Error submitting doubt");
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navigation Bar */}
      <header style={styles.navbar}>
      <img src="/images/logo.jpg" alt="Logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
        <div style={styles.title}>BMI Tracker</div>
        <div style={styles.buttonContainer}>
          <a href="/students" style={styles.navLink}><FaHome style={styles.icon} /> Home</a>
          <a href="/student-details" style={styles.navLink}><FaUser style={styles.icon} /> Profile</a>
          <a href="/chart" style={styles.navLink}><FaQuestionCircle style={styles.icon} /> BMI Chart</a>
          <a href="/replies" style={styles.navLink}><FaReply style={styles.icon} /> Replies</a>
        </div>
      </header>

      {/* Doubt Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Submit Your Doubt</h2>
        {message && <p style={{ color: "#16a34a", textAlign: "center" }}>{message}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleChange} placeholder="Student Email" style={styles.input} required />
          <input type="email" name="teacherEmail" value={formData.teacherEmail} onChange={handleChange} placeholder="Teacher Email" style={styles.input} required />
          <textarea name="doubt" value={formData.doubt} onChange={handleChange} placeholder="Enter your doubt" style={styles.textarea} required></textarea>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 Doubt Submission Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    background: "#f3f4f6",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "#333",
    color: "#fff",
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: "1000",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  navLink: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "5px",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "24rem",
    margin: "100px auto 30px",
  },
  header: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "16px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    height: "96px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    transition: "background-color 0.3s",
  },
  footer: {
    marginTop: "auto",
    padding: "10px 0",
    textAlign: "center",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "0.8rem",
  },
};
