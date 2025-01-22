import React, { useEffect } from "react";
import { FaInfoCircle, FaUserAlt, FaRegComments, FaSignOutAlt } from 'react-icons/fa';  // Importing icons from react-icons

function StudentsHomePage() {
  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('user');  // Remove session data
    window.location.href = '/login';    // Redirect to login page
  };

  // Prevent backward navigation after logout by manipulating the browser history
  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      window.location.href = '/login'; // Redirect to login if session doesn't exist
    } else {
      // Replace the current history state so the user cannot go back to the previous page
      window.history.replaceState(null, '', window.location.href);
    }
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.navbar}>
        <div style={styles.titleContainer}>
          <img src="/images/logo.jpg" alt="BMI Tracker Logo" style={styles.logo} />
          <div style={styles.title}>BMI Tracker</div>
        </div>
        <div style={styles.buttonContainer}>
          <a href="/student-details" style={styles.navLink}><FaUserAlt style={styles.icon}/>Profile</a>
          <a href="/doubtlist" style={styles.navLink}><FaRegComments style={styles.icon}/>All doubts</a>
          <a href="/replies" style={styles.navLink}><FaRegComments style={styles.icon}/>Replies</a>
          <a href="/chart" style={styles.navLink}><FaRegComments style={styles.icon}/>Chart</a>
          {/* Logout Button */}
          <button onClick={handleLogout} style={styles.logoutButton}><FaSignOutAlt style={styles.icon}/>Logout</button>
        </div>
      </header>

      <div style={styles.heroSection}>
        <h1 style={styles.mainTitle}>Your Health Journey Starts Here</h1>
        <p style={styles.subtitle}>Track your BMI and unlock personalized insights to improve your fitness.</p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.infoBoxesContainer}>
          <div style={styles.infoBoxLeft}>
            <h3 style={styles.infoTitle}><FaInfoCircle style={styles.icon}/> What is BMI?</h3>
            <p style={styles.infoText}>
              BMI (Body Mass Index) is a measure that uses a person's height and weight to estimate whether they are underweight, normal weight, overweight, or obese. 
              It helps identify whether your weight is in a healthy range for your height.
            </p>
          </div>

          <div style={styles.infoBoxRight}>
            <h3 style={styles.infoTitle}><FaInfoCircle style={styles.icon}/> Why is BMI Important?</h3>
            <p style={styles.infoText}>
              Maintaining a healthy BMI can reduce your risk of developing serious health conditions such as heart disease, high blood pressure, type 2 diabetes, and certain cancers. 
              By understanding your BMI, you can make informed decisions about your health and lifestyle.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p>&copy; 2025 BMI Health Tracker. All rights reserved.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", 
    padding: "20px",
    textAlign: "center",
    color: "#fff",
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    color: '#fff',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.4)",
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
    transition: 'color 0.3s ease',
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
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  heroSection: {
    marginTop: '100px',
    marginBottom: '50px',
  },
  mainTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f39c12',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#ecf0f1',
    marginTop: '10px',
    fontWeight: 'lighter',
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    marginTop: "40px",
  },
  infoBoxesContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "30px",
    width: "100%",
    maxWidth: "1200px",
    marginTop: "30px",
  },
  infoBoxLeft: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "48%",
  },
  infoBoxRight: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    width: "48%",
  },
  infoTitle: {
    fontSize: "1.7rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: "1.1rem",
    color: "#555",
    lineHeight: "1.7",
    fontWeight: 'lighter',
  },
  footer: {
    marginTop: '50px',
    fontSize: '0.8rem',
    color: '#aaa',
  },
};

export default StudentsHomePage;
