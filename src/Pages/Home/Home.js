import React, { useEffect } from "react";
import Hero from "../../Components/Hero";
import AboutSection from "../../Components/AboutSection";
import ProjectSection from "../../Components/ProjectsSection";
import "./home.css"
import ContactPage from "../../Components/ContactPage";
import AnalyticsService from '../../services/AnalyticsService';

function Home() {
    useEffect(() => {
        // Track page visit
        try {
            AnalyticsService.trackPageView('Home', '/My_Portfolio/');
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }, []);

    return (
      <div className="home">
    
        <Hero tabindex="1" aria-label="hero"/>
        <AboutSection tabindex="2" aria-label="About"/>
        <ProjectSection tabindex="3" />
        <ContactPage />
      </div>
    );
  }
  

export default Home;
