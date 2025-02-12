import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaCalculator, FaQuestionCircle, FaTable,FaFileAlt } from 'react-icons/fa'; // Importing the icons

const BmiTable = () => {
  const [bmiData, setBmiData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing in localStorage');
      return;
    }

    axios.get(`http://localhost:5000/api/getStudentsData?userId=${userId}`)
      .then(response => {
        setBmiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const getChangeIndicator = (change) => {
    if (change > 0) {
      return { emoji: "⬆️", color: "#28a745" };  // Increase in BMI
    } else if (change < 0) {
      return { emoji: "⬇️", color: "#dc3545" };  // Decrease in BMI
    } else {
      return { emoji: "↔️", color: "#6c757d" };  // No change in BMI
    }
  };

  if (bmiData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <style>
        {`
          .page-container {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f9fcff;
            color: #333;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .navbar {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            background-color: #f0f8ff;
            color: #444;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            border-bottom: 2px solid #a8dadc;
          }

          .title-container {
            display: flex;
            align-items: center;
          }

          .logo {
            width: 100px;
            height: 60px;
            margin-right: 10px;
          }

          .title {
            font-size: 26px;
            font-weight: bold;
            background: linear-gradient(90deg, red, orange, yellow, green, violet);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .button-container {
            display: flex;
            align-items: center;
          }

          .nav-link {
            color: #005f73;
            margin-left: 20px;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
            display: flex;
            align-items: center;
          }

          .icon {
            margin-right: 8px;
            font-size: 1.4rem;
          }

          .table-container {
  padding: 0; /* Remove padding */
  width: 100%; /* Make the container full width */
  margin: 80px auto 20px; /* Adjusted margin for fixed navbar */
  background: linear-gradient(145deg, #f0f4f8, #e1e9f0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  position: relative;
}

.bmi-table {
  width: 100%; /* Make the table full width */
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  margin: 0; /* Remove margin */
}


          .table-header {
            text-align: center;
            font-size: 2rem;
            color: #333;
            margin-bottom: 20px;
          }

          

          .bmi-table th,
          .bmi-table td {
            padding: 15px;
            text-align: center;
            font-size: 16px;
          }

          .bmi-table th {
            background-color: #4CAF50;
            color: white;
            font-size: 18px;
            font-weight: 600;
          }

          .bmi-table tr:hover {
            background-color: #f1f1f1;
          }

          .change-indicator {
            background-color: #fff3cd;
            font-weight: bold;
          }

          .change-indicator:hover {
            cursor: pointer;
            background-color: #ffeeba;
          }

          .bmi-table td,
          .bmi-table th {
            border-bottom: 1px solid #ddd;
          }

          @media (max-width: 768px) {
            .table-container {
              padding: 15px;
            }

            .bmi-table th,
            .bmi-table td {
              font-size: 14px;
            }

            .table-header {
              font-size: 1.5rem;
            }
          }
             .footer {
            text-align: center;
            padding: 10px;
            background:rgb(12, 13, 14);
             border-top: 2px solid #ffffff;
            font-size: 14px;
            color: #ffffff;
            margin-top: auto;
          }
        `}
      </style>

      <div className="navbar">
        <div className="title-container">
          <img src="/images/logo.jpg" alt="Logo" className="logo" />
          <h1 className="title">BMI Tracker</h1>
        </div>
        <div className="button-container">
          <a href="/teachers" className="nav-link">
            <FaHome className="icon" /> Home
          </a>
          <a href="/bmicalculation" className="nav-link">
            <FaCalculator className="icon" /> BMI Calc
          </a>
          <a href="/finalbmi" className="nav-link">
            <FaTable className="icon" /> Final BMI
          </a>
          <a href="/trdoubtlist" className="nav-link">
            <FaQuestionCircle className="icon" /> Doubts
          </a>
          <a href="/report" className="nav-link">
            <FaFileAlt className="icon" /> Report
          </a>
        </div>
      </div>

      <div className="table-container">
        <h2 className="table-header">Student BMI Data</h2>
        <table className="bmi-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Initial BMI</th>
              <th>Final BMI</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {bmiData.map((student, index) => {
              const { name, email, initialBmi, finalBmi, change } = student;
              const { emoji, color } = getChangeIndicator(change);

              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{initialBmi.toFixed(2)}</td>
                  <td>{finalBmi}</td>
                  <td className="change-indicator" style={{ color }}>
                    {emoji} {change.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} BMI Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default BmiTable;
