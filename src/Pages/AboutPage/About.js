import React, { useEffect } from "react";
import './About.css'
import techgirl from "../../images/techgirl.svg"
import CVlogo from "../../images/ReadCvLogo.svg"
import { Link } from "react-router-dom";
import AnalyticsService from '../../services/AnalyticsService';

export default function About(){
    useEffect(() => {
        // Track page visit
        try {
            AnalyticsService.trackPageView('About', '/My_Portfolio/about');
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }, []);

    return(
        <div className="about">
            <div className="about__hero">
                <div className="about__hero-content">
                    <span className="about__tag">About me</span>
                    <h1>I'm Nanji Lakan "The Shaelle" - A passionate Computer Science student and Frontend Engineer</h1>
                    <p className="about__intro">
                        Welcome to my digital space! I'm a Computer Science undergraduate with a deep passion for creating 
                        innovative web applications and solving complex problems through code.
                    </p>
                </div>
                <div className="about__hero-image">
                    <img className="about__profile-img" src={techgirl} alt="The Shaelle - Frontend Developer"/>
                </div>
            </div>

            <div className="about__content">
                <div className="about__section">
                    <div className="about__card">
                        <h2>My Journey</h2>
                        <p>
                            My journey into tech began with curiosity and has evolved into a genuine passion for creating 
                            meaningful digital experiences. I specialize in building innovative web applications using 
                            modern technologies like HTML, CSS, JavaScript, React, Vue.js, and Node.js.
                        </p>
                        <p>
                            As a certified green digital skills developer, I'm committed to promoting sustainable web 
                            practices in design, development, and digital marketing. I believe technology should not 
                            only solve problems but also contribute to a better, more sustainable future.
                        </p>
                    </div>

                    <div className="about__card">
                        <h2>Beyond Coding</h2>
                        <p>
                            When I'm not coding, you'll find me immersed in anime, exploring African fantasy novels, 
                            or writing about lifestyle topics that spark my interest. I'm a storyteller at heart, 
                            and this passion for narrative influences how I approach user experience in my development work.
                        </p>
                        <p>
                            I believe that the best applications tell compelling stories and create emotional connections 
                            with their users.
                        </p>
                    </div>
                </div>

                <div className="about__section">
                    <div className="about__card skills__card">
                        <h2>Technical Skills</h2>
                        <div className="skills__grid">
                            <div className="skill__category">
                                <h3>Frontend</h3>
                                <ul>
                                    <li>HTML5 & CSS3</li>
                                    <li>JavaScript (ES6+)</li>
                                    <li>React.js</li>
                                    <li>Vue.js</li>
                                    <li>Responsive Design</li>
                                </ul>
                            </div>
                            <div className="skill__category">
                                <h3>Backend & Tools</h3>
                                <ul>
                                    <li>Node.js</li>
                                    <li>Git & GitHub</li>
                                    <li>Sustainable Web Practices</li>
                                    <li>Green Digital Skills</li>
                                    <li>Problem Solving</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about__cta">
                    <h2>Ready to collaborate?</h2>
                    <p>
                        I'm currently seeking opportunities to bring my skills and enthusiasm to a tech company. 
                        Let's create something amazing together!
                    </p>
                    <div className="about__buttons">
                        <Link to="/pdfview" className="btn primary">
                            <img src={CVlogo} alt="resume icon"/>
                            View My Resume
                        </Link>
                        <Link to={"/My_Portfolio/contact"} className="btn secondary">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}