import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { FaHome, FaUser, FaQuestionCircle, FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentBmiChart = () => {
  const [bmiData, setBmiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student BMI data
    const email = localStorage.getItem('userEmail'); // Fetch email from localStorage
    if (!email) {
      setError('Student email not found in localStorage.');
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/getStudentBmiData?email=${email}`)
      .then((response) => {
        setBmiData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch BMI data.');
        console.error(error);
        setLoading(false);
      });
  }, []);

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Chart data
  const chartData = {
    labels: ['Initial BMI', 'Final BMI'],
    datasets: [
      {
        label: 'BMI Values',
        data: [bmiData.initialBmi, bmiData.finalBmi],
        backgroundColor: ['#4CAF50', '#FF5722'],
        borderColor: ['#388E3C', '#E64A19'],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow resizing
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `BMI Visualization for ${bmiData.name}`,
      },
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navigation Bar */}
      <header style={styles.navbar}>
        <div style={styles.titleContainer}>
          <img src="/images/logo.jpg" alt="BMI Tracker Logo" style={styles.logo} />
          <div style={styles.title}>BMI Tracker</div>
        </div>
        <div style={styles.buttonContainer}>
          <a href="/students" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </a>
          <a href="/student-details" style={styles.navLink}>
            <FaUser style={styles.icon} /> Profile
          </a>
          <a href="/doubtlist" style={styles.navLink}>
            <FaQuestionCircle style={styles.icon} /> Doubts
          </a>
          <a href="/replies" style={styles.navLink}>
            <FaReply style={styles.icon} /> Replies
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <h2 style={styles.header}>BMI Chart</h2>
        <div style={{ height: '400px', width: '100%' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 BMI Health Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#f4f6f9',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '1000',
    borderBottom: '2px solid #f39c12',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)', // Rainbow gradient
    WebkitBackgroundClip: 'text', // Clip the background to the text
    WebkitTextFillColor: 'transparent', // Make the text color transparent to show gradient
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    marginLeft: '20px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '8px',
    fontSize: '1.4rem',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    marginLeft: '20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '1000px',
    margin: '120px auto 30px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  footer: {
    marginTop: 'auto',
    padding: '10px 0',
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '0.8rem',
  },
};

export default StudentBmiChart;
