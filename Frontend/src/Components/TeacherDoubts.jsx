import React, { useEffect, useState } from "react";

const TeacherDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [replies, setReplies] = useState({}); // Store replies temporarily
  const teacherEmail = localStorage.getItem("userEmail"); // Get the teacher's email from localStorage

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doubts");
        const data = await response.json();

        if (response.ok) {
          // Filter doubts to show only those assigned to this teacher
          const filteredDoubts = data.filter(
            (doubt) => doubt.teacherEmail === teacherEmail
          );
          setDoubts(filteredDoubts);
        }
      } catch (error) {
        console.error("Error fetching doubts:", error);
      }
    };

    fetchDoubts();
  }, [teacherEmail]); // Fetch doubts when the teacher's email changes

  const handleReplyChange = (doubtId, reply) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [doubtId]: reply,
    }));
  };

  const handleReplySubmit = (doubtId, studentEmail) => {
    // Store the reply and student email in localStorage
    localStorage.setItem(`reply_${doubtId}`, replies[doubtId]);
    localStorage.setItem(`studentEmail_${doubtId}`, studentEmail);

    // Remove the replied doubt from the state so it disappears from the screen
    setDoubts((prevDoubts) => prevDoubts.filter((doubt) => doubt._id !== doubtId));

    // Optional: Clear the reply field after storing it
    setReplies((prevReplies) => {
      const newReplies = { ...prevReplies };
      delete newReplies[doubtId];
      return newReplies;
    });

    alert("Reply saved and doubt removed successfully!");
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <div style={styles.navbar}>
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/profile" style={styles.navLink}>Profile</a>
          <a href="/logout" style={styles.navLink}>Logout</a>
        </div>
      </div>

      <h2 style={styles.title}>Student Doubts</h2>

      {doubts.length === 0 ? (
        <p style={styles.noDoubts}>No doubts found</p>
      ) : (
        <ul style={styles.list}>
          {doubts.map((doubt) => (
            <li key={doubt._id} style={styles.doubtItem}>
              <strong>From:</strong> {doubt.studentEmail}
              <p style={styles.doubtText}>{doubt.doubt}</p>

              {/* Reply Button */}
              <button
                style={styles.replyButton}
                onClick={() => {
                  const currentReply = replies[doubt._id] || "";
                  if (!currentReply) {
                    setReplies((prevReplies) => ({
                      ...prevReplies,
                      [doubt._id]: "",
                    }));
                  }
                }}
              >
                Reply
              </button>

              {/* Reply Textarea and Submit Button */}
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
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(255,255,255,0.2)",
    textAlign: "center",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
    marginBottom: "30px",
  },
  logo: {
    height: "40px",
  },
  navLinks: {
    display: "flex",
  },
  navLink: {
    color: "white",
    marginLeft: "20px",
    textDecoration: "none",
    fontSize: "18px",
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
  replyButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "10px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    resize: "none",
    backgroundColor: "#444",
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "10px",
    borderRadius: "5px",
  },
};

export default TeacherDoubts;
