import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaPhoneAlt, FaHome, FaInfoCircle, FaConciergeBell, FaEnvelope, FaUser } from 'react-icons/fa';

import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f7f9fc;
    color: #333;
  }
`;

const Navbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #ffffff;
  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const NavbarLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const NavbarTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #1dd1a1, #54a0ff, #5f27cd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavbarLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }
`;
// Home Section Styles
const HomeSection = styled.section`
  
  padding: 10px 20px;
  text-align: center;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 0px; /* To compensate for the fixed navbar */
`;

const HomeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const HomeContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HomeTitle = styled.h1`
  font-size: 48px;
  margin: 0;
`;

const HomeSubtitle = styled.p`
  font-size: 24px;
  margin-top: 10px;
`;

// About Section Styles
const AboutSection = styled.section`
  padding: 80px 60px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 0px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const AboutCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const AboutCard = styled.div`
  background: #f4f4f4;
  color: #333;
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const AboutCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const AboutCardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const AboutCardDescription = styled.p`
  font-size: 16px;
  color: #555;
`;


const SectionTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
`;

const SectionDescription = styled.p`
  font-size: 18px;
  color: #555;
`;

// Services Section Styles
const ServicesSection = styled.section`
  background-color: #f9f9f9;
  padding: 80px 20px;
  text-align: center;
  border-radius: 10px;
  margin-top: 0px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const ServicesCards = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const ServiceCard = styled.div`
  background: #007bff;
  color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    background-color: #0056b3;
  }
`;

// Contact Section Styles
const ContactSection = styled.section`
  background-color: #ffffff;
  padding: 80px 20px;
  text-align: center;
  border-radius: 10px;
  margin-top: 0px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
`;

const ContactIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const ContactIcon = styled.a`
  font-size: 32px;
  color: inherit;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;


const ContactInfo = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
`;

// Footer Styles
const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  margin-top: 0px;
`;

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500); // Delay to trigger the animation
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <GlobalStyle />
            <div className="homepage">
                {/* Navbar */}
                <Navbar>
  <NavbarLogo>
    <Logo src="/images/logo.jpg" alt="BMI Tracker Logo" />
    <NavbarTitle>BMI Tracker</NavbarTitle>
  </NavbarLogo>
  <NavbarLinks>
    <NavLink href="#home">
      <span className="nav-item-text">Home</span>
      <FaHome className="nav-icon" />
    </NavLink>
    <NavLink href="#about">
      <span className="nav-item-text">About Us</span>
      <FaInfoCircle className="nav-icon" />
    </NavLink>
    <NavLink href="#services">
      <span className="nav-item-text">Services</span>
      <FaConciergeBell className="nav-icon" />
    </NavLink>
    <NavLink href="#contact">
      <span className="nav-item-text">Contact Us</span>
      <FaEnvelope className="nav-icon" />
    </NavLink>
    {/* Login Link */}
    <NavLink href="/login">
      <span className="nav-item-text">Login</span>
      <FaUser className="nav-icon" />
    </NavLink>
  </NavbarLinks>
</Navbar>

                {/* 1st Section: Background Image with Homepage Title */}
                <HomeSection id="home">
                    <HomeOverlay />
                    <HomeContent>
                        <HomeTitle>Welcome to BMI Tracker</HomeTitle>
                        <HomeSubtitle>Your journey to better health starts here!</HomeSubtitle>
                    </HomeContent>
                </HomeSection>

                {/* 2nd Section: About Us */}
                <AboutSection id="about">
  <SectionTitle>About Us</SectionTitle>
  <SectionDescription>We are dedicated to helping individuals monitor and maintain a healthy BMI for optimal athletic performance and overall well-being.</SectionDescription>
  <AboutCardsContainer>
    {/* First Image Card */}
    <AboutCard>
      <AboutCardImage src="/images/image5.png" alt="Athlete Monitoring BMI" />
      <AboutCardTitle>Track Your BMI</AboutCardTitle>
      <AboutCardDescription>Monitor your BMI for better health management and athletic performance.</AboutCardDescription>
    </AboutCard>
    <AboutCard>
      <AboutCardImage src="/images/image1.png" alt="Motivational Support" />
      <AboutCardTitle>Stay Motivated</AboutCardTitle>
      <AboutCardDescription>Get ongoing motivation and support to reach your health and fitness goals.</AboutCardDescription>
    </AboutCard>
    <AboutCard>
      <AboutCardImage src="/images/image4.png" alt="Nutrition Plans" />
      <AboutCardTitle>Nutrition Plans</AboutCardTitle>
      <AboutCardDescription>Receive customized nutrition plans based on your BMI and dietary preferences.</AboutCardDescription>
    </AboutCard>
    {/* Second Image Card */}
    <AboutCard>
      <AboutCardImage src="/images/image3.png" alt="Fitness Consultation" />
      <AboutCardTitle>Personalized Guidance</AboutCardTitle>
      <AboutCardDescription>Get expert fitness and diet advice tailored to your BMI and health goals.</AboutCardDescription>
    </AboutCard>
  </AboutCardsContainer>
</AboutSection>

                {/* 3rd Section: Services */}
                <ServicesSection id="services">
                    <SectionTitle>Our Services</SectionTitle>
                    <ServicesCards>
                        <ServiceCard>
                            <h3>Health Tracking</h3>
                            <p>Track your BMI, weight, and other important metrics to maintain a healthy lifestyle.</p>
                        </ServiceCard>
                        <ServiceCard>
                            <h3>Fitness Consultation</h3>
                            <p>Get personalized fitness advice and training plans tailored to your BMI and goals.</p>
                        </ServiceCard>
                        <ServiceCard>
                            <h3>Diet Plans</h3>
                            <p>Receive customized diet plans based on your BMI and dietary preferences for maximum results.</p>
                        </ServiceCard>
                    </ServicesCards>
                </ServicesSection>

                {/* 4th Section: Contact Us */}
<ContactSection id="contact">
    <SectionTitle>Contact Us</SectionTitle>
    <SectionDescription>
        Have questions? Reach out to us through the following platforms:
    </SectionDescription>

    <ContactIcons>
        {/* Instagram */}
        <ContactIcon href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#E4405F" }}>
            <FaInstagram />
        </ContactIcon>
        
        {/* Facebook */}
        <ContactIcon href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2" }}>
            <FaFacebook />
        </ContactIcon>
        
        {/* Email */}
        <ContactIcon href="mailto:contact@bmi-tracker.com" style={{ color: "#D44638" }}>
            <FaEnvelope />
        </ContactIcon>
        
        {/* Phone */}
        <ContactIcon href="tel:+1234567890" style={{ color: "#34A853" }}>
            <FaPhoneAlt />
        </ContactIcon>
    </ContactIcons>

    <ContactInfo>
        <p><FaEnvelope /> Email: <a href="mailto:contact@bmi-tracker.com">contact@bmi-tracker.com</a></p>
        <p><FaPhoneAlt /> Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
    </ContactInfo>
</ContactSection>


                {/* Footer */}
                <Footer>
                    <p>&copy; {new Date().getFullYear()} BMI Tracker. All Rights Reserved.</p>
                </Footer>
            </div>
        </>
    );
};

export default HomePage;