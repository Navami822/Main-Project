import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaQuestionCircle, FaReply } from 'react-icons/fa';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  // Styles
  const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      margin: 0,
      backgroundColor: '#121212',
      fontFamily: "'Roboto', sans-serif",
      color: '#fff',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      width: '100%',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#fff',
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      background: 'linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#007bff',
      borderRadius: '5px',
      textDecoration: 'none',
    },
    profileCard: {
      background: 'linear-gradient(135deg, #a18cd1, #fbc2eb, #f6d365, #ffb997)',
      borderRadius: '20px',
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.4)',
      width: '90%',
      maxWidth: '450px',
      padding: '25px',
      textAlign: 'center',
      color: '#333',
      marginTop: '100px',
    },
    profileImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      margin: '0 auto 15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      margin: '15px 0',
      color: '#222',
    },
    headline: {
      fontSize: '18px',
      color: '#444',
      marginBottom: '20px',
    },
    detailsSection: {
      textAlign: 'left',
      marginTop: '20px',
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.7)',
      padding: '10px 15px',
      borderRadius: '8px',
      marginBottom: '10px',
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.2)',
    },
    keyLabel: {
      fontWeight: 'bold',
      color: '#222',
    },
    value: {
      color: '#444',
    },
    error: {
      color: '#e63946',
      fontSize: '18px',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#ffe6e6',
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto',
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
    },
    loading: {
      fontSize: '20px',
      color: '#007bff',
      textAlign: 'center',
    },
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    if (email) {
      axios
        .get(`http://localhost:5000/student-details?email=${email}`)
        .then((response) => {
          setStudent(response.data.student);
        })
        .catch(() => {
          setError('Error fetching student data. Please try again later.');
        });
    } else {
      setError('No email found in localStorage. Please log in first.');
    }
  }, []);

  if (error) {
    return <div style={styles.body}><div style={styles.error}>{error}</div></div>;
  }

  if (!student) {
    return <div style={styles.body}><div style={styles.loading}>Loading...</div></div>;
  }

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img src="/images/logo.jpg" alt="Student Dashboard Logo" style={styles.logo} />
          <div style={styles.logoText}>BMI TRACKER</div>
        </div>
        <div style={styles.navLinks}>
          <Link to="/students" style={styles.navLink}><FaHome /> Home</Link>
          <Link to="/doubtlist" style={styles.navLink}><FaQuestionCircle /> Doubts</Link>
          <Link to="/replies" style={styles.navLink}><FaReply /> Replies</Link>
        </div>
      </header>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.profileImage}>
          {student.name.charAt(0)}
        </div>
        <h1 style={styles.name}>{student.name}</h1>
        <p style={styles.headline}>A dedicated student ready to excel!</p>
        <div style={styles.detailsSection}>
          <div style={styles.detailRow}>
            <span style={styles.keyLabel}>Age:</span>
            <span style={styles.value}>{student.age}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.keyLabel}>Gender:</span>
            <span style={styles.value}>{student.gender}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.keyLabel}>Height:</span>
            <span style={styles.value}>{student.height} cm</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.keyLabel}>Weight:</span>
            <span style={styles.value}>{student.weight} kg</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.keyLabel}>BMI:</span>
            <span style={styles.value}>{student.bmi}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
