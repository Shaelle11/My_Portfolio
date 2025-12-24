import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import data from "./Projectdata"
import "./ComponentStyles/ProjectSection.css"
import ArrowRight from "../images/ArrowRight.svg"
import ProjectService from "../services/ProjectService";

export default function ProjectSection(){
    const [allProjects, setAllProjects] = useState([]);
    
    useEffect(() => {
        // Combine static projects with admin-created projects
        const adminProjectsResult = ProjectService.getAllProjects();
        const adminProjects = adminProjectsResult.success 
            ? adminProjectsResult.data
                .filter(project => project.featured) // Only show featured admin projects
                .map(project => ({
                    id: `admin-${project.id}`,
                    title: project.title,
                    description: project.description,
                    img: project.image || '', // Use empty string if no image
                    tag: project.technologies.reduce((acc, tech) => {
                        acc[tech.toLowerCase()] = true;
                        return acc;
                    }, {}),
                    githublink: project.repository,
                    demolink: project.demo,
                    isAdminProject: true
                }))
            : [];
        
        // Combine static and admin projects, prioritizing featured admin projects
        const combinedProjects = [...adminProjects, ...data];
        setAllProjects(combinedProjects);
    }, []);
    
    // Get the latest 3 projects (mix of featured admin projects and static projects)
    const latestProjects = allProjects.slice(0, 3);
    
    const cards = latestProjects.map( card => {
        return(
            <Card
            key = {card.id}
            {...card} />
        )
    })
    
return(
    <section className="ProjectSection">
        <div className="Project">
        <div className="text">
            <p>Projects</p>
            <h1>Take a look at my latest Projects</h1>
            <p className="section__subtitle">Here are some of my recent work showcasing modern web development practices and innovative solutions.</p>
        </div>
        <svg className="top_star" xmlns="http://www.w3.org/2000/svg" width="63" height="64" viewBox="0 0 63 64" fill="none">
  <g clip-path="url(#clip0_512_1696)">
    <path d="M31.6812 1.15643C30.3133 4.66787 30.7697 7.9234 30.9023 11.6305C31.0746 16.4442 31.2209 21.2275 31.5705 26.0327" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M31.2878 34.6526C30.2862 39.4753 30.7367 44.1761 31.1538 49.0521C31.55 53.6827 32.1059 58.2959 32.6527 62.9104" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M0.864136 35.784C3.93677 34.4168 6.83342 34.3613 10.1404 34.1369C15.1437 33.7973 19.9638 33.151 24.8808 32.1934" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M36.0099 30.7792C44.5059 30.2352 52.8682 28.8246 61.2932 27.6558" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M37.5946 26.6305L40.3177 21.6902" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M25.1265 38.5921L21.8199 41.8597" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40.1036 37.3085L43.3909 39.5258" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M24.0373 23.7324C20.4755 22.6545 17.3061 21.0713 13.9229 19.5507" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_512_1696">
      <rect width="62.4762" height="64" fill="white"/>
    </clipPath>
  </defs>
</svg>
        <div className="Cards">
{cards}
        </div>
        <Link to={"/My_Portfolio/projects"}>
        <button className="see__all__btn">
            See All Projects
            <img src={ArrowRight} alt="Arrow right icon"/>
        </button>
        </Link>
        <svg className="bottom_star" xmlns="http://www.w3.org/2000/svg" width="69" height="104" viewBox="0 0 69 104" fill="none">
  <g clip-path="url(#clip0_512_1705)">
    <path d="M34.9022 1.26392C33.534 4.89806 33.7824 8.45306 33.8756 12.4627C34.0174 17.7086 34.1256 22.9246 34.4198 28.1623" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M34.5088 37.6628C33.5076 42.8868 33.9578 47.9844 34.3748 53.2791C34.7709 58.3463 35.3267 63.3957 35.8734 68.4467" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M3.86414 38.8984C6.93677 37.451 9.83342 37.3915 13.1404 37.1507C18.1437 36.7888 22.9638 36.1017 27.8808 35.0888" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M39.0099 33.4692C47.5059 32.8955 55.8682 31.4079 64.2932 30.1808" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M40.5946 29.0623L43.3177 23.8802" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M28.1265 41.4421L24.8199 44.8597" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M43.1036 40.0785L46.3909 42.3758" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M27.0373 26.2724C23.4755 25.1445 20.3061 23.4813 16.9229 21.8907" stroke="#7DFFAF" stroke-width="1.5" stroke-linecap="round"/>
  </g>
  <defs>
    <clipPath id="clip0_512_1705">
      <rect width="65.4762" height="70" fill="white"/>
    </clipPath>
  </defs>
</svg>
        </div>
    </section>
)
}