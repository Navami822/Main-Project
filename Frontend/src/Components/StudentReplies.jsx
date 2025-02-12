import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaQuestionCircle, FaChartBar, FaTrash } from "react-icons/fa";

const StudentReplies = () => {
  const [doubts, setDoubts] = useState([]);
  const [selectedDoubts, setSelectedDoubts] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const studentEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchDoubts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doubts", { signal });
        const data = await response.json();

        if (response.ok) {
          const filteredDoubts = data.filter((doubt) => doubt.studentEmail === studentEmail);
          setDoubts(filteredDoubts);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching doubts:", error);
        }
      }
    };

    fetchDoubts();

    return () => controller.abort();
  }, [studentEmail]);

  const getReply = (doubtId) => {
    return localStorage.getItem(`reply_${doubtId}`);
  };

  const toggleSelectDoubt = (doubtId) => {
    setSelectedDoubts((prevSelected) =>
      prevSelected.includes(doubtId) ? prevSelected.filter((id) => id !== doubtId) : [...prevSelected, doubtId]
    );
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedDoubts.map(async (doubtId) => {
          await fetch(`http://localhost:5000/api/doubts/${doubtId}`, { method: "DELETE" });
        })
      );

      setDoubts((prevDoubts) => prevDoubts.filter((doubt) => !selectedDoubts.includes(doubt._id)));
      setSelectedDoubts([]);
    } catch (error) {
      console.error("Error deleting doubts:", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src="/images/logo.jpg" alt="Logo" style={styles.logo} />
          <div style={styles.logoText}>BMI Tracker</div>
        </div>
        <div style={styles.navLinks}>
          <Link to="/students" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </Link>
          <Link to="/student-details" style={styles.navLink}>
            <FaUser style={styles.icon} /> Profile
          </Link>
          <Link to="/doubtlist" style={styles.navLink}>
            <FaQuestionCircle style={styles.icon} /> Doubts
          </Link>
          <Link to="/chart" style={styles.navLink}>
            <FaChartBar style={styles.icon} /> Chart
          </Link>
        </div>
      </header>

      {/* Chat Section */}
      <h2 style={styles.title}>Your Doubts and Replies</h2>
      <div style={styles.chatContainer}>
        {doubts.length === 0 ? (
          <p style={styles.noDoubts}>No doubts found</p>
        ) : (
          <ul style={styles.list}>
            {doubts.map((doubt) => (
              <li
                key={doubt._id}
                style={{
                  ...styles.doubtItem,
                  ...(selectedDoubts.includes(doubt._id) ? styles.selectedDoubt : {}),
                }}
                onClick={() => toggleSelectDoubt(doubt._id)}
              >
                {/* Student's Doubt */}
                <div style={{ ...styles.messageBubble, ...styles.studentBubble }}>
                  <p style={styles.doubtText}>{doubt.doubt}</p>
                </div>

                {/* Teacher's Reply */}
                {getReply(doubt._id) ? (
                  <div style={{ ...styles.messageBubble, ...styles.teacherBubble }}>
                    <p style={styles.replyText}>{getReply(doubt._id)}</p>
                  </div>
                ) : (
                  <div style={{ ...styles.messageBubble, ...styles.noReplyBubble }}>
                    <p style={styles.noReply}>No reply from the teacher yet.</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Button - Always Visible */}
      <div style={styles.deleteButtonContainer}>
        <button
          style={styles.deleteButton}
          onClick={handleDelete}
          onMouseEnter={() => !selectedDoubts.length && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          disabled={selectedDoubts.length === 0}
        >
          <FaTrash style={styles.trashIcon} /> Delete Selected
        </button>

        {/* Tooltip Message */}
        {showTooltip && <div style={styles.tooltip}>Please select the content to delete</div>}
      </div>
      
      <footer style={styles.footer}>
        © {new Date().getFullYear()} BMI Tracker | Stay Fit, Stay Healthy
      </footer>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "linear-gradient(135deg, #f9f9ff, #dfe9f3)",
    paddingTop: "80px",
    color: "#333",
  },
  footer: {
    marginTop: '50px',
    padding: '15px',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  logoText: {
  
    fontSize: "22px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  
  chatContainer: {
    width: "70%",
    maxHeight: "58vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#0077ff",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  doubtItem: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
  },
  selectedDoubt: {
    background: "rgba(0, 119, 255, 0.1)",
    borderRadius: "8px",
  },
  messageBubble: {
    padding: "12px",
    borderRadius: "15px",
    maxWidth: "80%",
    fontSize: "15px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  studentBubble: {
    alignSelf: "flex-end",
    background: "#b3e5fc",
    color: "#007acc",
  },
  teacherBubble: {
    alignSelf: "flex-start",
    background: "#ffccbc",
    color: "#e64a19",
  },
  deleteButton: {
    marginTop: "15px",
    padding: "8px 15px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    background: "#ff5252",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0px 4px 6px rgba(255, 82, 82, 0.3)",
  },
  trashIcon: {
    fontSize: "16px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 20px",
    width: "100%",
    background: "#ffffff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
  logo: {
    width: "70px",
    height: "50px",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    fontSize: "16px",
    color: "#333",
  },
  icon: {
    fontSize: "18px",
  },
};

export default StudentReplies;