import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaCalculator, FaTable, FaQuestionCircle, FaFileAlt } from 'react-icons/fa';

const Final = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: '',
    height: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateFinalBmi = () => {
    const heightInMeters = formData.height / 100;
    return (formData.weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalBmi = calculateFinalBmi();
    const userId = localStorage.getItem('userId');

    try {
      const bmiResponse = await axios.get(`http://localhost:5000/api/bmi/get-bmi/${formData.email}`);
      const bmiValue = bmiResponse.data.bmi || "N/A";

      const storeResponse = await axios.post('http://localhost:5000/api/bmi/store-bmi', {
        ...formData,
        finalBmi,
        bmi: bmiValue,
        userId,
      });

      alert(storeResponse.data.message);
    } catch (error) {
      console.error(error);
      alert('Error storing BMI data');
    }
  };

  return (
    <>
      {/* Navbar (Outside the Container) */}
      <div style={styles.navbar}>
        <div style={styles.titleContainer}>
          <img src="/images/logo.jpg" alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>BMI Tracker</h1>
        </div>
        <div style={styles.buttonContainer}>
          <a href="/teachers" style={styles.navLink}>
            <FaHome style={styles.icon} /> Home
          </a>
          <a href="/bmicalculation" style={styles.navLink}>
            <FaCalculator style={styles.icon} /> BMI Calc
          </a>
          <a href="/bmitable" style={styles.navLink}>
            <FaTable style={styles.icon} />Overview
          </a>
          <a href="/trdoubtlist" style={styles.navLink}>
            <FaQuestionCircle style={styles.icon} /> Doubts
          </a>
          <a href="/report" style={styles.navLink}>
            <FaFileAlt style={styles.icon} /> Report
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div style={styles.bmiContainer}>
        <h2 style={styles.bmiTitle}>Calculate Your BMI</h2>
        <form style={styles.bmiForm} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
          <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required style={styles.input} />
          <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required style={styles.input} />
          <button type="submit" style={styles.bmiButton}>Submit</button>
        </form>
      </div>

      {/* Footer (Outside the Container) */}
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} BMI Tracker. All rights reserved.
      </footer>
    </>
  );
};

const styles = {
  /* Navbar Styles */
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '15px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  buttonContainer: {
    display: 'flex',
    gap: '15px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'white',
    fontSize: '16px',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
  },
  icon: {
    marginRight: '5px',
  },

  /* BMI Form Styles */
  bmiContainer: {
    maxWidth: '400px',
    margin: '100px auto 50px auto', // Adjusted margin to avoid overlapping with navbar
    padding: '20px',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  bmiTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  bmiForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: '0.3s',
    width: 'calc(100% - 20px)',
    margin: '0 auto',
  },
  bmiButton: {
    padding: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    background: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
    width: 'calc(100% - 20px)',
    margin: '0 auto',
  },

  /* Footer Styles */
  footer: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
  },
};

export default Final;
