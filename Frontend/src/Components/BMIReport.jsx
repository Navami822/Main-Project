import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalculator, FaSignOutAlt,FaRegComments,FaWpforms,FaTable } from "react-icons/fa";
import axios from "axios";

const BMIReport = () => {
  const [report, setReport] = useState([]);
  const [effectiveness, setEffectiveness] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bmi-report");
      setReport(response.data.data);
      setEffectiveness(response.data.effectiveness);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/delete-report");
      setReport([]);
      setEffectiveness("Report deleted successfully.");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <img src="/images/logo.jpg" alt="Logo" style={styles.logo} />
        <h1 style={styles.navbarTitle}>BMI Tracker</h1>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}><FaHome style={styles.icon}/> Home</Link>
          <Link to="/bmicalculation" style={styles.link}><FaCalculator style={styles.icon}/> BMI Calculator</Link>
           <Link to="/trdoubtlist" style={styles.link}><FaRegComments style={styles.icon}/>Suggestions</Link>
           <Link to="/finalbmi" style={styles.link}><FaWpforms style={styles.icon}/>Final bmi</Link>
          <Link to="/bmitable" style={styles.link}><FaTable style={styles.icon}/>BMI overview</Link>
         
        </div>
      </nav>
      
      {/* Report Section */}
      <div style={styles.reportContainer}>
        <div style={styles.reportCard}>
          <h2 style={styles.reportTitle}>BMI Report</h2>
          <p style={styles.effectivenessText}>{effectiveness}</p>

          {report.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Initial BMI</th>
                  <th style={styles.tableHeader}>Final BMI</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.map((student, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{student.name}</td>
                    <td style={styles.tableCell}>{student.bmi.toFixed(2)}</td>
                    <td style={styles.tableCell}>{student.finalBmi.toFixed(2)}</td>
                    <td style={{ ...styles.tableCell, color: student.finalBmi >= 18.5 && student.finalBmi <= 24.9 ? "green" : "red" }}>
                      {student.finalBmi >= 18.5 && student.finalBmi <= 24.9 ? "Normal" : "Needs Improvement"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}>No report available.</p>
          )}

          <div style={styles.buttonContainer}>
            <button onClick={handlePrint} style={styles.printButton}>Print Report</button>
            <button onClick={handleDelete} style={styles.deleteButton}>Delete Report</button>
          </div>
        </div>
        <footer style={styles.footer}>
        © {new Date().getFullYear()} BMI Tracker | All Rights Reserved
      </footer>
      </div>
    </>
  );
};

const styles = {
  navbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#282c34", color: "white",
  },
  logo: { width: "80px", height: "60px" },
  navbarTitle: {
  fontSize: "22px",
  fontWeight: "bold",
  background: "linear-gradient(to right, red, orange, yellow, green, violet)", // Rainbow gradient
  WebkitBackgroundClip: "text", // Clip the gradient to text
  WebkitTextFillColor: "transparent", // Make text transparent to show gradient
},

  navLinks: { display: "flex", gap: "15px" },
  link: { textDecoration: "none", color: "white", fontSize: "18px", padding: "8px 12px", borderRadius: "5px", background: "#4a90e2" },
  logoutButton: { background: "#e74c3c", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "18px" },
  icon: { marginRight: "5px" },
  footer: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    background: "#282c34",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "16px",
  },
  reportContainer: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f4f4" },
  reportCard: { background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "80%", maxWidth: "800px" },
  reportTitle: { fontSize: "26px", fontWeight: "bold", textAlign: "center" },
  effectivenessText: { fontSize: "18px", textAlign: "center", color: "#555" },
  
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
  tableHeader: { background: "#4a90e2", color: "white", padding: "10px", textAlign: "center", fontSize: "18px" },
  tableCell: { padding: "10px", border: "1px solid #ddd", textAlign: "center", fontSize: "16px" ,color: "black"},
  
  buttonContainer: { display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" },
  printButton: { background: "#2ecc71", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", fontSize: "16px", cursor: "pointer" },
  deleteButton: { background: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", fontSize: "16px", cursor: "pointer" },
};

export default BMIReport;
