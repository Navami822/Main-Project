import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    weight: "",
    height: "",
    bmi: "",
  });

  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    if (weight && height) {
      return (weight / (height * height)).toFixed(2);
    }
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Automatically calculate BMI
    if (name === "weight" || name === "height") {
      updatedData.bmi = calculateBMI(updatedData.weight, updatedData.height);
    }

    setFormData(updatedData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post("http://localhost:5000/api/users", dataToSubmit);
      alert("Data stored successfully!");
      setFormData({ name: "", email: "", weight: "", height: "", bmi: "" });
    } catch (error) {
      console.error("Error storing data", error);
    }
  };

  return (
    <div className="form-container">
      <h2>BMI Form</h2>
      <form onSubmit={handleSubmit} className="bmi-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
        <br />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
          className="input-field"
        />
        <br />
        <input
          type="number"
          name="height"
          placeholder="Height (m)"
          value={formData.height}
          onChange={handleChange}
          required
          className="input-field"
        />
        <br />
        <input
          type="text"
          name="bmi"
          placeholder="BMI"
          value={formData.bmi}
          readOnly
          className="input-field"
        />
        <br />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <style>
        {`
          .form-container {
            background-color: #1e1e1e;
            color: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            margin: 50px auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          h2 {
            text-align: center;
            color: #f0f0f0;
          }

          .bmi-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .input-field {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #333;
            color: white;
            font-size: 16px;
          }

          .input-field::placeholder {
            color: #888;
          }

          .submit-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }

          .submit-btn:hover {
            background-color: #45a049;
          }

          .input-field:focus {
            outline: none;
            border: 2px solid #4CAF50;
          }
        `}
      </style>
    </div>
  );
};

export default Form;
