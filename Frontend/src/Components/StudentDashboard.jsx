import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaQuestionCircle, FaReply, FaChartBar } from 'react-icons/fa';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  // Styles for white background and transparent black navbar with enhanced profile box lighting effect
  const styles = {
    body: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      margin: 0,
      backgroundColor: '#fff',  // White background
      fontFamily: "'Roboto', sans-serif",
      color: '#333', // Dark text for readability
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Transparent black background for navbar
      color: '#fff', // White text in navbar
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow
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
      backgroundColor: '#007bff',  // Blue background for logo
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      background: 'linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)', // Gradient color for title
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
      color: '#fff',  // White color for links
      backgroundColor: '#007bff',  // Blue background for links
      borderRadius: '5px',
      textDecoration: 'none',
    },
    profileCard: {
      background: 'linear-gradient(145deg, #ffecd2, #fcb69f)', // Soft gradient background for profile card
      borderRadius: '20px',
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',  // Soft shadow for profile card
      width: '90%',
      maxWidth: '450px',
      padding: '25px',
      textAlign: 'center',
      color: '#333',  // Dark text in the card
      marginTop: '100px',
      position: 'relative', // Needed for glow effect
      overflow: 'hidden', // Ensures the glow doesn't overflow the border radius
    },
    profileImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#007bff',  // Blue background for profile image
      margin: '0 auto 15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',  // White text in profile image
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      margin: '15px 0',
      color: '#222',  // Dark color for name
    },
    headline: {
      fontSize: '18px',
      color: '#555',  // Lighter text color for headline
      marginBottom: '20px',
    },
    detailsSection: {
      textAlign: 'left',
      marginTop: '20px',
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
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      background: '#f1f1f1', // Light gray background for each detail row
      padding: '10px 15px',
      borderRadius: '8px',
      marginBottom: '10px',
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.05)', // Subtle shadow for each row
    },
    keyLabel: {
      fontWeight: 'bold',
      color: '#333', // Dark color for key labels
    },
    value: {
      color: '#555',  // Lighter color for value text
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
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    },
    loading: {
      fontSize: '20px',
      color: '#007bff', // Blue color for loading
      textAlign: 'center',
    },
    // Glowing effect for the profile card with stronger lighting
    glowEffect: {
      position: 'absolute',
      top: '5px',
      left: '5px',
      right: '5px',
      bottom: '5px',
      background: 'rgba(255, 255, 255, 0.2)',
      filter: 'blur(12px)', // Stronger blur for a more prominent glow
      borderRadius: '20px',
      boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.6)', // Stronger shadow for lighting
      animation: 'glow 1.5s infinite alternate',
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
          <Link to="/chart" style={styles.navLink}><FaChartBar /> Chart</Link>
        </div>
      </header>

      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.glowEffect}></div> {/* Glowing Effect */}
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
      <footer style={styles.footer}>
        © {new Date().getFullYear()} BMI Tracker | Stay Fit, Stay Healthy
      </footer>
    </div>
  );
};

export default StudentDashboard;
