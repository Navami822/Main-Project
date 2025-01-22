import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaQuestionCircle, FaTable, FaCalculator } from 'react-icons/fa';

function Final() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [finalBmi, setFinalBmi] = useState('');
  const [error, setError] = useState('');

  // Calculate Final BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // converting height to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name || !email || !weight || !height) {
      setError('All fields are required!');
      return;
    }

    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
      setError('Please enter valid height and weight values.');
      return;
    }

    const calculatedBmi = calculateBMI(weight, height);
    setFinalBmi(calculatedBmi);

    const userId = localStorage.getItem('userId');

    // Validation: Ensure userId exists in localStorage
    if (!userId) {
      setError('User ID is missing!');
      return;
    }

    const data = {
      name,
      email,
      weight,
      height,
      finalBmi: calculatedBmi,  // Ensure this is defined
      userId,
    };

    try {
      await axios.post('http://localhost:5000/api/bmi', data);
      alert('BMI Data Saved Successfully!');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error saving BMI data!');
    }
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
          <a href="/teachers" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </a>
          <a href="//bmicalculation" style={styles.navLink}>
            <FaCalculator style={styles.icon} /> BMI Calculation
          </a>
          <a href="/trdoubtlist" style={styles.navLink}>
            <FaQuestionCircle style={styles.icon} /> Doubts
          </a>
          <a href="/bmitable" style={styles.navLink}>
            <FaTable style={styles.icon} /> BMI Table
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.container}>
        <h1 style={styles.header}>BMI Calculator</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}  // Remove spaces
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        {finalBmi && <p style={styles.result}>Your Final BMI: {finalBmi}</p>}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2025 BMI Health Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: '#f4f6f9',
    color: '#333',
    minHeight: '200vh',
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
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    width: '1000px',
    margin: '120px auto 30px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(45deg, #ff6ec7, #3e8e41)',
    position: 'relative',
    animation: 'glow 1.5s infinite alternate',
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: '12px',
    margin: '12px 0',
    borderRadius: '8px',
    border: '2px solid transparent',
    fontSize: '16px',
    transition: '0.3s ease-in-out',
    outline: 'none',
    backgroundColor: '#f4f4f4',
    color: '#333',
    boxShadow: '0 0 10px rgba(255, 0, 255, 0.3)',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    cursor: 'pointer',
    marginTop: '15px',
    borderRadius: '8px',
    fontSize: '16px',
    transition: '0.3s ease-in-out',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.6)',
  },
  error: {
    color: '#ff4d4d',
    fontSize: '18px',
    marginTop: '10px',
  },
  result: {
    marginTop: '20px',
    fontSize: '20px',
    color: '#4CAF50',
    fontWeight: 'bold',
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

// Add keyframes for glowing effect
const keyframes = `
  @keyframes glow {
    0% {
      box-shadow: 0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.2);
    }
    100% {
      box-shadow: 0 0 25px rgba(255, 0, 255, 0.6), 0 0 50px rgba(255, 0, 255, 0.4);
    }
  }
`;

// Add this keyframes in your HTML head or inject via JavaScript
document.head.insertAdjacentHTML('beforeend', `<style>${keyframes}</style>`);

export default Final;
