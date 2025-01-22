import React, { useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";  // Import bcryptjs

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    institution: "",
    contact: "",
    password: "",
    confirmPassword: "",
    role: "teacher",  // Default role
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Apply background image to the entire page (body)
    document.body.style.backgroundImage = "url('/images/image3.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh"; // Ensure the image covers the full viewport height
    document.body.style.margin = "0"; // Remove any default margin
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Hash the password before sending
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    try {
      const response = await axios.post("http://localhost:5000/register", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        institution: formData.institution,
        contact: formData.contact,
        password: hashedPassword,
        role: formData.role,  // Use the selected role
      });

      alert(response.data.message);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        institution: "",
        contact: "",
        password: "",
        confirmPassword: "",
        role: "teacher",  // Reset role to default
      });

      /*if (response.data.success) {
        navigate("/teachers");
      } else {
        setErrorMessage(response.data.message);
      }*/
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error)
        setErrorMessage("An error occurred");

      }
    }
  };

  return (
    <div
      className="register-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        height: "100vh", // Ensure form container stretches to the full viewport
      }}
    >
      {/* Header Section with Logo and Title */}
      <header style={styles.header}>
        <img src="/images/logo.jpg" alt="BMI Tracker Logo" style={styles.logo} />
        <div style={styles.title}>BMI Tracker</div>
      </header>

      {/* Registration Form */}
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for form
          padding: "30px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <h1>Registration</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Role field with same design */}
          <div style={{ marginBottom: "10px" }}>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button type="submit">Register</button>
        </form>
        <div style={{ marginTop: "15px", color: "#000", fontSize: "14px" }}>
          <p>
            Back to Login  {"  "}
            <a
              href="/login"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
               Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center the logo and title horizontally
    marginBottom: "20px", // Space between header and form
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Register;
