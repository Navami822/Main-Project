import React, { useState, useEffect } from 'react';
import { FaHome, FaQuestionCircle, FaTable, FaCalculator,FaFileAlt  } from 'react-icons/fa';


// Function to calculate BMI
const calculateBMI = (height, weight) => {
  const bmi = weight / (height * height);
  return bmi.toFixed(2);
};
const BMICalculation = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    email: '',
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    role: 'student',
    userId: localStorage.getItem('userId') || '', // UserId from localStorage
  });
  const [formType, setFormType] = useState(null);
  const [formInput, setFormInput] = useState({ email: '', name: '', newHeight: '', newWeight: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setNewStudent((prev) => ({ ...prev, userId: localStorage.getItem('userId') || '' }));
  }, []);

  // Function to load students from localStorage
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students'));
    if (savedStudents) {
      setStudents(savedStudents);
    }
  }, []);

  // Function to filter students by userId
  const getFilteredStudents = () => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId) {
      return students.filter((student) => student.userId === loggedInUserId);
    }
    return students; // If no userId, return all students
  };

  // Function to add a student and store data in localStorage
  const addStudent = async () => {
    if (!newStudent.email || !newStudent.name) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/bmicalculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const updatedStudents = [...students, { ...newStudent, bmi: null }];
      setStudents(updatedStudents);

      // Save updated students data to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setNewStudent({ email: '', name: '', age: '', gender: '', height: '', weight: '', role: 'student', userId: localStorage.getItem('userId') || '' });

    } catch (error) {
      alert('Failed to add student. Please check the backend connection.');
    }
  };

  const calculateAllBMI = () => {
    const updatedStudents = students.map((student) => {
      if (student.height && student.weight) {
        const bmi = calculateBMI(student.height, student.weight);
        return { ...student, bmi };
      }
      return student;
    });

    setStudents(updatedStudents);

    // Store updated students array with BMI in localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Retrieve and print BMI from localStorage
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    storedStudents.forEach(student => {
      console.log(`Student: ${student.name}, BMI: ${student.bmi}`);
    });
  };

  const getRowColor = (bmi) => {
    if (!bmi) return 'transparent';
    if (bmi < 18.5) return 'yellow';
    if (bmi >= 18.5 && bmi <= 24.9) return 'green';
    return 'red';
  };

  const handleDelete = () => {
    const { email, name } = formInput;
    const studentIndex = students.findIndex(
      (student) => student.email === email && student.name === name
    );
    if (studentIndex !== -1) {
      const updatedStudents = students.filter((_, index) => index !== studentIndex);
      setStudents(updatedStudents);
      setMessage('Student successfully deleted.');
    } else {
      setMessage('Student not found.');
    }
    setFormInput({ email: '', name: '' });
};


const handleUpdate = () => {
  const { email, name, newHeight, newWeight } = formInput;
  const studentIndex = students.findIndex(
    (student) => student.email === email && student.name === name
  );
  if (studentIndex !== -1) {
    const updatedStudents = students.map((student, index) =>
      index === studentIndex
        ? { ...student, height: newHeight || student.height, weight: newWeight || student.weight }
        : student
    );
    setStudents(updatedStudents);
    setMessage('Student details successfully updated.');
  } else {
    setMessage('Student not found.');
  }
  setFormInput({ email: '', name: '', newHeight: '', newWeight: '' });
};


  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
  <img src="/images/logo.jpg" alt="Logo" className="logo" />
  <h1 className="nav-title">BMI Tracker</h1>
  <ul className="nav-links">
    <li>
      <a href="/teachers">
        <FaHome className="nav-icon" /> Home
      </a>
    </li>
    <li>
      <a href="/trdoubtlist">
        <FaQuestionCircle className="nav-icon" /> Doubts
      </a>
    </li>
    <li>
      <a href="/finalbmi">
        <FaCalculator className="nav-icon" /> Final BMI
      </a>
    </li>
    <li>
      <a href="/bmitable">
        <FaTable className="nav-icon" /> BMI Overview
      </a>
    </li>
    <li>
      <a href="/report">
        < FaFileAlt className="nav-icon" /> Report
      </a>
    </li>
  </ul>
</nav>

      <h1 className="title">BMI Calculation for Students</h1>

      {/* Legend for Colors */}
      <div className="legend">
        <span className="legend-item red">Overweight</span>
        <span className="legend-item green">Normal</span>
        <span className="legend-item yellow">Borderline</span>
      </div>
      

      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Height (m)</th>
            <th>Weight (kg)</th>
            <th>BMI</th>
          </tr>
        </thead>
        <tbody>
          {getFilteredStudents().map((student, index) => (
            <tr key={index} style={{ backgroundColor: getRowColor(student.bmi) }}>
              <td>{student.email}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.height}</td>
              <td>{student.weight}</td>
              <td>{student.bmi || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding students */}
      <div className="form-container">
        <input className="input-field" type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
        <input className="input-field" type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
        <input className="input-field" type="number" placeholder="Age" value={newStudent.age} onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })} />
        <select
  className="input-field"
  value={newStudent.gender}
  onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
>
  <option value="" disabled>
    Select Gender
  </option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

        <input className="input-field" type="number" placeholder="Height (m)" value={newStudent.height} onChange={(e) => setNewStudent({ ...newStudent, height: e.target.value })} />
        <input className="input-field" type="number" placeholder="Weight (kg)" value={newStudent.weight} onChange={(e) => setNewStudent({ ...newStudent, weight: e.target.value })} />

        <div className="button-container">
          <button className="button" onClick={addStudent}>Add Student</button>
          <button className="button" onClick={calculateAllBMI}>Calculate BMI</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-button" onClick={() => setFormType('delete')}>Delete</button>
        <button className="action-button" onClick={() => setFormType('update')}>Update</button>
      </div>

      {/* Delete Form Popup */}
      {formType === 'delete' && (
        <div className="form-action popup">
          <h2>Delete Student</h2>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={formInput.email}
            onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={formInput.name}
            onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
          <button className="button" onClick={handleDelete}>Delete</button>
          <button className="button cancel" onClick={() => setFormType(null)}>Cancel</button>
          <p>{message}</p>
        </div>
      )}

      {/* Update Form Popup */}
      {formType === 'update' && (
        <div className="form-action popup">
          <h2>Update Student</h2>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={formInput.email}
            onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={formInput.name}
            onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="New Height (m)"
            value={formInput.newHeight}
            onChange={(e) => setFormInput({ ...formInput, newHeight: e.target.value })}
          />
          <input
            className="input-field"
            type="text"
            placeholder="New Weight (kg)"
            value={formInput.newWeight}
            onChange={(e) => setFormInput({ ...formInput, newWeight: e.target.value })}
          />
          <button className="button" onClick={handleUpdate}>Update</button>
          <button className="button cancel" onClick={() => setFormType(null)}>Cancel</button>
          <p>{message}</p>
        </div>
      )}
       <footer className="footer">
        &copy; {new Date().getFullYear()} BMI Tracker. All rights reserved.
      </footer>
    </div>
    
  );
};

export default BMICalculation;

// CSS inside JSX (Advanced styling)
const styles = `
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-image: url('/images/image2.png');
  background-size: cover;
  background-position: center;
  color: white;
  font-family: 'Arial', sans-serif;
}

.container {
  margin: 5px;
  font-family: 'Arial', sans-serif;
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding: 0px;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0px;
  color: white;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  z-index: 10;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5);
}

.logo {
  width: 90px;
  height: 70px;
}

.nav-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.nav-title {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 18px;
}

.nav-links a:hover {
  color: #007bff;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #222;
  text-align: center;
  margin-bottom: 20px;
}

.legend {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.legend-item {
  padding: 5px 10px;
  margin-right: 15px;
  color: white;
  border-radius: 5px;
  font-size: 14px;
}

.red { background-color: #ff6347; }
.green { background-color: #28a745; }
.yellow { background-color: #ffd700; }

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-bottom: 20px;
}

.table th, .table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: rgb(11, 11, 11);
}

.input-field {
  padding: 10px;
  margin: 5px;
  width: calc(33% - 10px);
  border: 1px solid #ddd;
  border-radius: 5px;
}

.button-container {
  margin-top: 10px;
  text-align: center;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}

.action-button {
  background-color: #ff5722;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #e64a19;
}

.form-action {
  margin-top: 20px;
}

.cancel {
  background-color: #ccc;
}

.cancel:hover {
  background-color: #999;
}
  .footer {
            text-align: center;
            padding: 10px;
            background:rgb(12, 13, 14);
             border-top: 2px solidrgb(39, 38, 38);
            font-size: 14px;
            color: #ffffff;
            margin-top: auto;
            
          }
`;

export const style = document.createElement("style");
style.innerHTML = styles;
document.head.appendChild(style);
