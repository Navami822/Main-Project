import React, { useState } from 'react';
import { Link } from "react-router-dom";


const HomePage = () => {
    const bmiRanges = [
        { age: '5-10', bmi: '14-17' },
        { age: '11-15', bmi: '16-20' },
        { age: '16-18', bmi: '18-24' },
        { age: '19+', bmi: '19-25' },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const bmiFacts = [
        "BMI helps track body composition and fitness levels.",
        "Regular tracking ensures peak athletic performance.",
        "Being underweight or overweight affects stamina and injury risks."
    ];

    return (
        <div style={{ backgroundColor: '#121212', color: 'white', fontFamily: 'Arial, sans-serif' }}>
            {/* Navbar */}
            <header style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 30px",
                backgroundColor: "#1a1a2e", color: "#fff", boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img src="/images/logo.jpg" alt="BMI Tracker Logo" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
                    <div style={{ fontSize: "32px", fontWeight: "bold", background: "linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BMI Tracker</div>
                </div>
                <div style={{ display: "flex", gap: "15px" }}>
                    <Link to="/register" style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold", color: "#fff", backgroundColor: "#007bff", borderRadius: "5px", textDecoration: "none" }}>Sign In</Link>
                    <Link to="/login" style={{ padding: "10px 20px", fontSize: "16px", fontWeight: "bold", color: "#fff", backgroundColor: "#007bff", borderRadius: "5px", textDecoration: "none" }}>Login</Link>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '50px' }}>
                <h1>Welcome to BMI Tracker</h1>
                <p>Your journey to better health starts here!</p>
                <img src="/images/image2.png" alt="Athlete Fitness" style={{ width: '80%', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.3)' }} />
            </section>

            {/* BMI Facts with Hover Effects */}
            <section style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                {bmiFacts.map((fact, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.3)', width: '30%', textAlign: 'center',
                        transition: 'transform 0.3s ease', cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        {fact}
                    </div>
                ))}
            </section>

            {/* Step-by-Step Cards */}
            <section style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                {bmiRanges.map((range, index) => (
                    <div key={index} style={{
                        width: '25%', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', padding: '15px',
                        textAlign: 'center', cursor: 'pointer', transform: 'rotateY(0deg)', transition: 'transform 0.5s'
                    }}
                        onMouseEnter={(e) => e.target.style.transform = 'rotateY(180deg)'}
                        onMouseLeave={(e) => e.target.style.transform = 'rotateY(0deg)'}
                    >
                        <h3>Age: {range.age}</h3>
                        <p>BMI: {range.bmi}</p>
                    </div>
                ))}
            </section>

            {/* Interactive Sliders */}
            <section style={{ textAlign: 'center', margin: '40px' }}>
                <h2>Explore Features</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                    <button onClick={() => setActiveIndex((activeIndex - 1 + bmiFacts.length) % bmiFacts.length)} style={{ padding: '10px', background: '#007bff', borderRadius: '50%' }}>◀</button>
                    <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px', width: '40%', textAlign: 'center' }}>
                        {bmiFacts[activeIndex]}
                    </div>
                    <button onClick={() => setActiveIndex((activeIndex + 1) % bmiFacts.length)} style={{ padding: '10px', background: '#007bff', borderRadius: '50%' }}>▶</button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
