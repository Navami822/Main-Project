import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalculator, FaRegComments, FaWpforms, FaTable, FaPrint, FaTrash } from "react-icons/fa";
import axios from "axios";

const BMIReport = () => {
  const [report, setReport] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bmi-report");
      setReport(response.data.data);
      analyzeData(response.data.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const analyzeData = (data) => {
    if (!data || data.length === 0) return;

    let sameBMI = 0, increasedBMI = 0, decreasedBMI = 0;
    let underweight = 0, normal = 0, overweight = 0, obese = 0;

    data.forEach((student) => {
      if (student.bmi.toFixed(2) === student.finalBmi.toFixed(2)) {
        sameBMI++;
      } else if (student.finalBmi > student.bmi) {
        increasedBMI++;
      } else {
        decreasedBMI++;
      }

      if (student.finalBmi < 18.5) {
        underweight++;
      } else if (student.finalBmi >= 18.5 && student.finalBmi <= 24.9) {
        normal++;
      } else if (student.finalBmi >= 25 && student.finalBmi <= 29.9) {
        overweight++;
      } else {
        obese++;
      }
    });

    setAnalysis({
      sameBMI: ((sameBMI / data.length) * 100).toFixed(2),
      increasedBMI: ((increasedBMI / data.length) * 100).toFixed(2),
      decreasedBMI: ((decreasedBMI / data.length) * 100).toFixed(2),
      underweight: ((underweight / data.length) * 100).toFixed(2),
      normal: ((normal / data.length) * 100).toFixed(2),
      overweight: ((overweight / data.length) * 100).toFixed(2),
      obese: ((obese / data.length) * 100).toFixed(2),
    });
  };

  const printReport = () => {
    window.print();
  };

  const deleteReport = async () => {
    try {
      await axios.delete("http://localhost:5000/delete-report");
      setReport([]);
      setAnalysis(null);
      alert("BMI report deleted successfully.");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", background: "#282c34", color: "white" }}>
        <h1>BMI Tracker</h1>
        <div>
          <Link to="/" style={{ color: "white", marginRight: "15px" }}><FaHome /> Home</Link>
          <Link to="/bmicalculation" style={{ color: "white", marginRight: "15px" }}><FaCalculator /> BMI Calculator</Link>
          <Link to="/trdoubtlist" style={{ color: "white", marginRight: "15px" }}><FaRegComments /> Suggestions</Link>
          <Link to="/finalbmi" style={{ color: "white", marginRight: "15px" }}><FaWpforms /> Final BMI</Link>
          <Link to="/bmitable" style={{ color: "white" }}><FaTable /> BMI Overview</Link>
        </div>
      </nav>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", width: "50%", textAlign: "center", color: "black" }}>
          <h2>BMI Report Analysis</h2>
          {analysis ? (
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
              <tbody>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Same BMI</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.sameBMI}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Increased BMI</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.increasedBMI}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Decreased BMI</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.decreasedBMI}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Underweight</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.underweight}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Normal</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.normal}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Overweight</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.overweight}%</td></tr>
                <tr><td style={{ padding: "10px", border: "1px solid black" }}>Obese</td><td style={{ padding: "10px", border: "1px solid black" }}>{analysis.obese}%</td></tr>
              </tbody>
            </table>
          ) : (
            <p>Loading analysis...</p>
          )}

          <button onClick={printReport} style={{ marginRight: "10px", padding: "10px", background: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
            <FaPrint /> Print Report
          </button>
          <button onClick={deleteReport} style={{ padding: "10px", background: "#d9534f", color: "white", border: "none", cursor: "pointer" }}>
            <FaTrash /> Delete Report
          </button>
        </div>
      </div>
    
    <footer style={{ textAlign: "center", padding: "10px", background: "#282c34", color: "white" }}>
    <p>&copy; 2025 BMI Tracker. All rights reserved.</p>
  </footer>
</>
  );
};

export default BMIReport;
