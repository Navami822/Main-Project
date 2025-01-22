import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="table-container">
      <style>
        {`
          .table-container {
            padding: 30px;
            max-width: 90%;
            margin: 20px auto;
            background: linear-gradient(145deg, #f0f4f8, #e1e9f0);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            position: relative;
          }

          .table-header {
            text-align: center;
            font-size: 2rem;
            color: #333;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin-bottom: 20px;
          }

          .bmi-table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
          }

          .bmi-table th,
          .bmi-table td {
            padding: 15px;
            text-align: center;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .table-cell {
            background-color: #000;
            color: white;
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

          .bmi-table td:last-child {
            border-bottom: none;
          }

          /* Animation for cell hover effect */
          .bmi-table td:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease;
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
        `}
      </style>
      <h2 className="table-header">Student BMI Data</h2>
      <table className="bmi-table">
        <thead>
          <tr>
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Initial BMI</th>
            <th className="table-cell">Final BMI</th>
            <th className="table-cell">Change</th>
          </tr>
        </thead>
        <tbody>
          {bmiData.map((student, index) => {
            const { name, email, initialBmi, finalBmi, change } = student;
            const { emoji, color } = getChangeIndicator(change);

            return (
              <tr key={index}>
                <td className="table-cell">{name}</td>
                <td className="table-cell">{email}</td>
                <td className="table-cell">{initialBmi}</td>
                <td className="table-cell">{finalBmi}</td>
                <td className="change-indicator" style={{ color }}>
                  {emoji} {change.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BmiTable;
