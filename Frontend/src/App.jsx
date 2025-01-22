import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/Homepage";
import TeachersHomePage from "./Components/TeachersHomePage";
import BMICalculation from "./Components/BMICalculation";
import StudentDashboard from "./Components/StudentDashboard";
import StudentsHomePage from "./Components/studentsHomePage";
import DoubtForm from "./Components/DoubtForm";
import TeacherDoubts from "./Components/TeacherDoubts";
import StudentReplies from "./Components/StudentReplies";
import Final from "./Components/Final";
import BmiTable from "./Components/BmiTable";
import StudentBmiChart from "./Components/StudentBmiChart";

const App = () => {
  // Inline CSS for styling
  
  return (
    <Router>
      <div>
        {/* Navbar */}
       

        {/* Routes */}
        <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/teachers" element={<TeachersHomePage />} />
          <Route path="/bmicalculation" element={<BMICalculation />} />
          <Route path="/students" element={<StudentsHomePage />} />
          <Route path="/student-details" element={<StudentDashboard />} />
          <Route path="/doubtlist" element={<DoubtForm />} />
          <Route path="/trdoubtlist" element={<TeacherDoubts />} />
          <Route path="/replies" element={<StudentReplies />} />
          <Route path="/finalbmi" element={<Final />} />
          <Route path="/bmitable" element={<BmiTable />} />
          <Route path="/chart" element={<StudentBmiChart />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
