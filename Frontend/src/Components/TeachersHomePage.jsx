import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWpforms, FaRegComments,FaTable, FaCalculator , FaSignOutAlt } from 'react-icons/fa';

const handleLogout = () => {
  sessionStorage.removeItem('user');  // Remove session data
  window.location.href = '/login';    // Redirect to login page
};

const TeachersHomePage = () => {
  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      window.location.href = '/login'; // Redirect to login if session doesn't exist
    } else {
      // Replace the current history state so the user cannot go back to the previous page
      window.history.replaceState(null, '', window.location.href);
    }
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.overlay}></div> {/* Overlay for better readability */}
      
      <div style={styles.navbar}>
        <img src="/images/logo.jpg" alt="Logo" style={styles.logo} /> {/* Logo */}
        <h1 style={styles.navbarHeading}>BMI Tracker</h1> {/* Heading in Navbar */}
        <div style={styles.navLinksContainer}>
          <Link to="/bmicalculation" style={styles.link}>< FaCalculator  style={styles.icon}/>BMI Calculator</Link>
          <Link to="/trdoubtlist" style={styles.link}><FaRegComments style={styles.icon}/>Suggestions</Link>
          <Link to="/finalbmi" style={styles.link}><FaWpforms style={styles.icon}/>Final bmi Calculation</Link>
          <Link to="/bmitable" style={styles.link}><FaTable style={styles.icon}/>BMI overview</Link>
          <button onClick={handleLogout} style={styles.logoutButton}><FaSignOutAlt style={styles.icon}/>Logout</button>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.box}>
          <h2 style={styles.heading}>🌟 Importance of BMI</h2>
          <p style={styles.text}>
            Tracking BMI helps in understanding students' health status. This website provides a simple
            interface to monitor and manage BMI data effectively.
          </p>
        </div>
        <div style={styles.box}>
          <h2 style={styles.heading}>📖 How to Use</h2>
          <p style={styles.text}>
            Enter the student's details in the BMI Calculator page, then click "Calculate." Use the options
            to delete or update the information as needed.
          </p>
        </div>
        <div style={styles.box}>
          <h2 style={styles.heading}>💡 Suggestions</h2>
          <p style={styles.text}>
            Navigate to the Suggestions page to provide tailored advice for students. Enter the details and
            message, then click the submit button.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: `url('/images/image4.png') no-repeat center center/cover`, // Background Image
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
    zIndex: 1,
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    width: "100%",
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
  },
  logo: {
    width: "7 0px",
    height: "70px",
    marginRight: "20px",
  },
  navbarHeading: {
    color: "white",
    fontSize: "1.8rem",
    fontWeight: "bold",
    textShadow: "0 0 10px rgba(0, 255, 255, 0.7)",
    flex: 1,  // This ensures it takes available space
    textAlign: "center", // Centers the heading in the navbar
  },
  navLinksContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem", // Reduced gap to make links smaller
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.1rem", // Smaller font size for links
    padding: "0.4rem 1rem", // Reduced padding for smaller links
    borderRadius: "10px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.6))",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 10px rgba(255, 255, 255, 0.1)",
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ecf0f1',
    marginLeft: '20px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
    padding: "3rem",
    zIndex: 2,
  },
  box: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    border: "2px solid rgba(0, 255, 255, 0.4)",
    borderRadius: "10px", // Square Shape
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)",
    padding: "2rem",
    width: "300px", // Fixed width for square shape
    height: "300px", // Fixed height for square shape
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    background: "linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 0, 0, 0.9))",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "bold",
    color: "#00ffff",
    textShadow: "0 0 10px rgba(0, 255, 255, 0.7)",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
};

export default TeachersHomePage;
