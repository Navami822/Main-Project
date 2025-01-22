// Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    role: 'Teacher',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registration', formData);
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoSection}>
        <img src="images/logo.jpg" alt="Company Logo" style={styles.logo} />
      </div>
      <div style={styles.formSection}>
        <h2 style={styles.title}>REGISTER</h2>
        <p style={styles.subtitle}>IT'S COMPLETELY FREE</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="Number"
            name="contact"
            placeholder="Contact"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
          <button type="submit" style={styles.button}>CREATE ACCOUNT</button>
        </form>
        <div style={styles.backToLogin}>
          <button onClick={() => navigate('/login')} style={styles.linkButton}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  logoSection: {
    flex: 1,
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '250px',
  },
  formSection: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '14px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '10px',
    backgroundColor: '#00c6ff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  backToLogin: {
    marginTop: '15px',
  },
  linkButton: {
    backgroundColor: 'transparent',
    color: '#00c6ff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Registration;
