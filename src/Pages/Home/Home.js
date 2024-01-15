import React from "react";
import Nav from '../../Components/Nav';
import Hero from "../../Components/Hero";
import AboutSection from "../../Components/AboutSection";
import ProjectSection from "../../Components/ProjectsSection";
import "./home.css"
import Contact from "../../Components/Contact";
import Footer from "../../Components/Footer";
import Burger from "../../images/List.svg"
import BurgerClose from '../../images/X.svg';

function Home() {
    return (
      <div className="home">
        <Nav tabindex="0" aria-label="Navbar" aria-labelledby="home" aria-controls="nav"
        Burger = {Burger}
        BurgerClose = {BurgerClose} 
        />
    
        <Hero tabindex="1" aria-label="hero"/>
        <AboutSection tabindex="2" aria-label="About"/>
        <ProjectSection tabindex="3" />
        <Contact />
        <Footer/>
      </div>
    );
  }
  

export default Home;
