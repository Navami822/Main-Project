import React, { useState } from "react";
import axios from "axios";


const StudentSuggestion = ({ studentId, studentName }) => {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/suggestion", {
        studentId,
        studentName,
        question,
      });

      setMessage(response.data.message);
      setQuestion("");
    } catch (error) {
      setMessage("Error submitting suggestion");
    }
  };

  return (
    <div className="suggestion-container">
      <h2>Ask for a Suggestion or Doubt</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="suggestion-form">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentSuggestion;

// CSS Styling
const styles = `
.suggestion-container {
  background-image: url("/images/image3.png");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.suggestion-form {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  text-align: center;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  resize: none;
}

button {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #e68900;
}

.message {
  color: #f8e71c;
  font-weight: bold;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
