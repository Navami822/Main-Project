import React, { useEffect, useState } from "react";
import { FaHome, FaCalculator, FaChartLine, FaTable } from "react-icons/fa";

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: "10px",
    color: "#fff",
  },
  logo: {
    width: "50px",
    height: "50px",
  },
  navTitle: {
    fontSize: "24px",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
  icon: {
    marginRight: "5px",
  },
  container: {
    width: "900px", // Adjust as needed
    height: "600px", // Make it square
    margin: "50px auto", // Center it
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "rgba(235, 241, 241, 0.85)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center content vertically
  },

  title: {
    fontSize: "38px",
    marginBottom: "10px",
    textAlign: "center",
  },
  noDoubts: {
    color: "#777",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  doubtItem: {
    border: "1px solid #ddd",
    padding: "20px", // Increased padding
    marginBottom: "15px", // Increased space between items
    borderRadius: "8px", // Slightly rounded corners
    backgroundColor: "rgba(20, 17, 17, 0.85)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Slightly larger shadow
    fontSize: "18px", // Increased font size
  },
  doubtText: {
    fontSize: "16px",
  },
  replyButton: {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    height: "160px",
    marginTop: "10px",
    padding: "5px",
  },
  submitButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginTop: "5px",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
  },
};

const TeacherDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [replies, setReplies] = useState({});
  const teacherEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doubts");
        const data = await response.json();

        if (response.ok) {
          const filteredDoubts = data.filter(
            (doubt) =>
              doubt.teacherEmail === teacherEmail &&
              !JSON.parse(localStorage.getItem(`resolved_${doubt._id}`))
          );
          setDoubts(filteredDoubts);
        }
      } catch (error) {
        console.error("Error fetching doubts:", error);
      }
    };

    fetchDoubts();
  }, [teacherEmail]);

  const handleReplyChange = (doubtId, reply) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [doubtId]: reply,
    }));
  };

  const handleReplySubmit = (doubtId, studentEmail) => {
    localStorage.setItem(`reply_${doubtId}`, replies[doubtId]);
    localStorage.setItem(`studentEmail_${doubtId}`, studentEmail);
    localStorage.setItem(`resolved_${doubtId}`, true);

    setDoubts((prevDoubts) => prevDoubts.filter((doubt) => doubt._id !== doubtId));

    setReplies((prevReplies) => {
      const newReplies = { ...prevReplies };
      delete newReplies[doubtId];
      return newReplies;
    });

    alert("Reply saved and doubt marked as resolved!");
  };

  return (
    <div>
      <div style={styles.navbar}>
        <img src="/images/logo.jpg" alt="Logo" style={styles.logo} />
        <h1 style={styles.navTitle}>BMI Tracker</h1>
        <div style={styles.navLinks}>
          <a href="/teachers" style={styles.navLink}><FaHome style={styles.icon} /> Home</a>
          <a href="/bmicalculation" style={styles.navLink}><FaCalculator style={styles.icon} /> BMI Calculation</a>
          <a href="/finalbmi" style={styles.navLink}><FaChartLine style={styles.icon} /> Final BMI</a>
          <a href="/bmitable" style={styles.navLink}><FaTable style={styles.icon} /> BMI Table</a>
        </div>
      </div>
      <h2 style={styles.title}>Student Doubts</h2>
      <div style={styles.container}>
      

        {doubts.length === 0 ? (
          <p style={styles.noDoubts}>No doubts found</p>
        ) : (
          <ul style={styles.list}>
            {doubts.map((doubt) => (
              <li key={doubt._id} style={styles.doubtItem}>
                <strong>From:</strong> {doubt.studentEmail}
                <p style={styles.doubtText}>{doubt.doubt}</p>
                
                <button
                  style={styles.replyButton}
                  onClick={() => {
                    setReplies((prevReplies) => ({
                      ...prevReplies,
                      [doubt._id]: "",
                    }));
                  }}
                >
                  Reply
                </button>

                {replies[doubt._id] !== undefined && (
                  <div>
                    <textarea
                      style={styles.textarea}
                      value={replies[doubt._id]}
                      onChange={(e) => handleReplyChange(doubt._id, e.target.value)}
                      placeholder="Type your reply here..."
                    ></textarea>
                    <button
                      style={styles.submitButton}
                      onClick={() => handleReplySubmit(doubt._id, doubt.studentEmail)}
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} BMI Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeacherDoubts;
 