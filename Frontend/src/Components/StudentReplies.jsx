import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentReplies = () => {
  const [doubts, setDoubts] = useState([]);
  const studentEmail = localStorage.getItem("userEmail"); // Get the student email from localStorage

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doubts");
        const data = await response.json();

        if (response.ok) {
          // Filter doubts to show only those assigned to this student
          const filteredDoubts = data.filter(
            (doubt) => doubt.studentEmail === studentEmail
          );
          setDoubts(filteredDoubts);
        }
      } catch (error) {
        console.error("Error fetching doubts:", error);
      }
    };

    fetchDoubts();
  }, [studentEmail]); // Fetch doubts when the student email changes

  const getReply = (doubtId) => {
    // Get the reply from localStorage using the doubtId
    return localStorage.getItem(`reply_${doubtId}`);
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
          <Link to="/doubtlist" style={styles.navLink}>Doubts</Link>
        </div>
      </header>

      {/* Content Section */}
      <h2 style={styles.title}>Your Doubts and Replies</h2>
      {doubts.length === 0 ? (
        <p style={styles.noDoubts}>No doubts found</p>
      ) : (
        <ul style={styles.list}>
          {doubts.map((doubt) => (
            <li key={doubt._id} style={styles.doubtItem}>
              <strong>From:</strong> {doubt.studentEmail}
              <p style={styles.doubtText}>{doubt.doubt}</p>

              {/* Display the teacher's reply if it exists */}
              {getReply(doubt._id) ? (
                <div style={styles.replySection}>
                  <strong>Teacher's Reply:</strong>
                  <p style={styles.replyText}>{getReply(doubt._id)}</p>
                </div>
              ) : (
                <p style={styles.noReply}>No reply from the teacher yet.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
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
  noDoubts: {
    fontSize: "18px",
    color: "#aaa",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  doubtItem: {
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  doubtText: {
    marginTop: "5px",
    fontSize: "16px",
  },
  replySection: {
    marginTop: "10px",
    backgroundColor: "#444",
    padding: "10px",
    borderRadius: "5px",
  },
  replyText: {
    fontSize: "16px",
    color: "#a9dff0",
  },
  noReply: {
    fontSize: "16px",
    color: "#aaa",
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

export default StudentReplies;
