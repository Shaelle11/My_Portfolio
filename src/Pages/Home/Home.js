import React from "react";
import Nav from '../../Components/Nav';
import Hero from "../../Components/Hero";
import AboutSection from "../../Components/AboutSection";
import ProjectSection from "../../Components/ProjectsSection";
import "./home.css"
import Contact from "../../Components/ContactPage";
import Footer from "../../Components/Footer";
import Burger from "../../images/List.svg"
import BurgerClose from '../../images/X.svg';
import ContactPage from "../../Components/ContactPage";

function Home() {
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
