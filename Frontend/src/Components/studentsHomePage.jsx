import React, { useEffect } from "react";
import { FaInfoCircle, FaUserAlt, FaRegComments, FaSignOutAlt } from 'react-icons/fa';

function StudentsHomePage() {
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      window.location.href = '/login';
    } else {
      window.history.replaceState(null, '', window.location.href);
    }
  }, []);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.currentPage}>Students Home</h2>
        <div style={styles.navContainer}>
          <a href="/student-details" style={{ ...styles.navLink, ...styles.navBox }}><FaUserAlt style={styles.icon}/> Profile</a>
          <a href="/doubtlist" style={{ ...styles.navLink, ...styles.navBox }}><FaRegComments style={styles.icon}/> All Doubts</a>
          <a href="/replies" style={{ ...styles.navLink, ...styles.navBox }}><FaRegComments style={styles.icon}/> Replies</a>
          <a href="/chart" style={{ ...styles.navLink, ...styles.navBox }}><FaRegComments style={styles.icon}/> Chart</a>
        </div>
        <button onClick={handleLogout} style={{ ...styles.logoutButton, ...styles.navBox }}><FaSignOutAlt style={styles.icon}/> Logout</button>
      </aside>

      <div style={styles.content}>
        <div style={styles.heroSection}>
          <h1 style={styles.mainTitle}>Your Health Journey Starts Here</h1>
          <p style={styles.subtitle}>Track your BMI and unlock personalized insights to improve your fitness.</p>
        </div>
        <hr style={styles.horizontalLine} />
        <div style={styles.mainContent}>
          <div style={styles.infoBoxesContainer}>
            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}><FaInfoCircle style={styles.icon}/> What is BMI?</h3>
              <p style={styles. infoBoxLeft}>BMI (Body Mass Index) helps estimate whether a person is underweight, normal weight, overweight, or obese.</p>
            </div>
            <div style={styles.infoBox}>
              <h3 style={styles.infoTitle}><FaInfoCircle style={styles.icon}/> Why is BMI Important?</h3>
              <p style={styles.infoBoxRight}>Maintaining a healthy BMI reduces the risk of serious health conditions such as heart disease and diabetes.</p>
            </div>
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
        <p>&copy; 2025 BMI Health Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    position: 'relative',
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'rgba(63, 99, 112, 0.9)',
    color: '#fff',
    padding: '20px',
    position: 'fixed',
    height: '100vh',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
  },
  currentPage: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    justifyContent: 'center',
    width: '100%',
    borderRadius: '8px',
    transition: 'background 0.3s, transform 0.2s',
  },
  navBox: {
    background: '#2c3e50',
    marginBottom: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: '1.4rem',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '15px',
    width: '100%',
    borderRadius: '8px',
  },
  content: {
    marginLeft: '270px',
    padding: '20px',
    flexGrow: 1,
  },
  mainTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f39c12',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#ecf0f1',
    textAlign: 'center',
  },
  infoBoxesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  infoBoxLeft: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#555',
    width: '60%',
    boxSizing: 'border-box',
  },
  infoBoxRight: {
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#555',
    width: '60%',
    boxSizing: 'border-box',
  },
  footer: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    fontSize: '0.9rem',
  },
};

export default StudentsHomePage;
