import React, { useState } from "react";

const FinalBMIForm = () => {
  const [studentData, setStudentData] = useState({
    studentName: "",
    studentEmail: "",
    height: "",
    weight: "",
    bmi: null,
  });

  // Handle input change
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // Calculate BMI and submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert height to meters and calculate BMI
    const heightInMeters = studentData.height / 100;
    const bmiValue = (studentData.weight / (heightInMeters * heightInMeters)).toFixed(2);

    // Update state with BMI
    setStudentData({ ...studentData, bmi: bmiValue });

    // Prepare data to send
    const data = {
      studentName: studentData.studentName,
      studentEmail: studentData.studentEmail,
      height: studentData.height,
      weight: studentData.weight,
      bmi: bmiValue, // Sending calculated BMI
    };

    console.log("Sending Data:", data); // Debugging Line

    try {
      const response = await fetch("http://localhost:5000/api/final-bmi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Enter Final BMI Data</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={studentData.studentName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="studentEmail"
            placeholder="Student Email"
            value={studentData.studentEmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={studentData.height}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={studentData.weight}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Calculate BMI & Save
          </button>
          {studentData.bmi && (
            <p style={styles.result}>Calculated BMI: {studentData.bmi}</p>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Full viewport height for centering
    backgroundColor: "#f4f4f4", // Background color to contrast the form
  },
  formContainer: {
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(255,255,255,0.2)",
    width: "100%", // Ensures responsiveness
  },
  title: {
    marginBottom: "10px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
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
  result: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#4CAF50",
  },
};

export default FinalBMIForm;
