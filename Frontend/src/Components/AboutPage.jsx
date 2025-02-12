import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate(); // Using useNavigate for navigation

    return (
        <div style={styles.pageContainer}>
            {/* Navigation Bar */}
            <nav style={styles.navBar}>
                <div style={styles.logoContainer}>
                    <img src="images/logo.jpg" alt="Logo" style={styles.logo} /> {/* Replace with your logo URL */}
                    <span style={styles.logoText}>BMI Tracker</span>
                </div>
                <button style={styles.navButton} onClick={() => navigate("/")}>
                    Home
                </button>
            </nav>

            {/* Main Content */}
            <div style={styles.container}>
                {/* Key Features Section */}
                <h3 style={styles.subHeading}>Key Features:</h3>

                {/* Feature List Section */}
                <div style={styles.featuresList}>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>📊</div>
                        <div style={styles.featureText}>
                            <h4 style={styles.featureTitle}>Track BMI</h4>
                            <p style={styles.featureContent}>Track the BMI of athletic students easily.</p>
                        </div>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>📈</div>
                        <div style={styles.featureText}>
                            <h4 style={styles.featureTitle}>Monitor BMI Changes</h4>
                            <p style={styles.featureContent}>Teachers can monitor changes in students' BMI.</p>
                        </div>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>💪</div>
                        <div style={styles.featureText}>
                            <h4 style={styles.featureTitle}>Impact of Training</h4>
                            <p style={styles.featureContent}>See how practice and training affect BMI.</p>
                        </div>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>📅</div>
                        <div style={styles.featureText}>
                            <h4 style={styles.featureTitle}>Visualize Progress</h4>
                            <p style={styles.featureContent}>Track BMI progress over time with charts.</p>
                        </div>
                    </div>
                    <div style={styles.featureItem}>
                        <div style={styles.featureIcon}>🏋️‍♀️</div>
                        <div style={styles.featureText}>
                            <h4 style={styles.featureTitle}>Improve Health & Performance</h4>
                            <p style={styles.featureContent}>Use BMI data to enhance student health and performance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <footer style={styles.footer}>
                <p>© 2025 BMI Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundColor: '#ffffff', // White background
        height: '100vh', // Full viewport height
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column', // Center the content
        alignItems: 'center',
    },
    // Navigation Bar Styles
    navBar: {
        width: '100%',
        backgroundColor: '#333', // Dark background for navbar
        color: '#fff', // White text in navbar
        display: 'flex',
        justifyContent: 'center', // Center the contents of the navbar
        alignItems: 'center',
        padding: '15px 30px',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px', // Add some space between logo and button
    },
    logo: {
        width: '40px', // Adjust the size of the logo
        height: '40px',
        marginRight: '10px',
    },
    logoText: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
    },
    navButton: {
        backgroundColor: '#1dd1a1',
        color: '#fff',
        fontSize: '1.2rem',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    // Main Content Styles
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background for content container
        color: '#fff', // White text for contrast
        fontFamily: 'Arial, sans-serif',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '100px auto 0', // Add top margin to avoid overlap with navbar
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        textAlign: 'center', // Centered content
        paddingBottom: '50px', // Add padding to the bottom to ensure footer is visible
    },
    subHeading: {
        fontSize: '1.5rem',
        color: '#fff', // White text for subheadings
        fontWeight: '600',
        marginTop: '30px',
        marginBottom: '10px',
        letterSpacing: '0.5px',
    },
    // Feature List Section
    featuresList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '30px',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background for feature items
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '80%', // Take up 80% of the width for each feature
        maxWidth: '600px', // Max width to keep the items compact
        textAlign: 'left',
    },
    featureIcon: {
        fontSize: '2rem',
        marginRight: '15px',
    },
    featureText: {
        flex: 1, // Take up remaining space
    },
    featureTitle: {
        fontSize: '1.2rem',
        color: '#fff', // White text for titles
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    featureContent: {
        fontSize: '1rem',
        color: '#ddd', // Light gray text for content
        lineHeight: '1.5',
    },
    footer: {
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#bbb', // Light gray for footer text
        marginTop: 'auto', // Ensures footer stays at the bottom of the page
        paddingBottom: '20px', // Adds padding to the footer for better spacing
    },
};

export default AboutPage;
