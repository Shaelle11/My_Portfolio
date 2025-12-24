import React, { useState, useEffect } from "react";
import "./Projects.css";
import Card from "../Components/Card";
import data from "../Components/Projectdata";
import AnalyticsService from '../services/AnalyticsService';
import ProjectService from '../services/ProjectService';

export default function Projects(){
    const [filter, setFilter] = useState('all');
    const [visibleProjects, setVisibleProjects] = useState(6);
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        // Track page visit
        try {
            AnalyticsService.trackPageView('Projects', '/My_Portfolio/projects');
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
        
        // Combine static projects with admin-created projects
        const adminProjectsResult = ProjectService.getAllProjects();
        const adminProjects = adminProjectsResult.success
            ? adminProjectsResult.data.map(project => ({
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
                isAdminProject: true,
                status: project.status,
                category: project.category
            }))
            : [];
        
        // Combine static and admin projects
        const combinedProjects = [...adminProjects, ...data];
        setAllProjects(combinedProjects);
    }, []);

    // Filter projects based on selected technology
    const filteredProjects = filter === 'all' 
        ? allProjects 
        : allProjects.filter(project => 
            filter === 'react' ? project.tag.react :
            filter === 'javascript' ? project.tag.javascript :
            filter === 'css' ? project.tag.css :
            filter === 'sass' ? project.tag.sass :
            false
        );

    const projectsToShow = filteredProjects.slice(0, visibleProjects);

    const loadMore = () => {
        setVisibleProjects(prev => prev + 6);
    };

    const handleFilter = (tech) => {
        setFilter(tech);
        setVisibleProjects(6);
    };

    return(
        <div className="projects__page">
            <div className="projects__hero">
                <div className="projects__hero-content">
                    <span className="projects__tag">Portfolio</span>
                    <h1>My Projects & Work</h1>
                    <p className="projects__intro">
                        Explore my collection of web development projects showcasing modern technologies, 
                        clean code practices, and innovative solutions to real-world problems.
                    </p>
                </div>
            </div>

            <div className="projects__content">
                <div className="projects__stats">
                    <div className="stat__item">
                        <h3>{data.length}</h3>
                        <p>Total Projects</p>
                    </div>
                    <div className="stat__item">
                        <h3>{data.filter(project => project.tag.react).length}</h3>
                        <p>React Projects</p>
                    </div>
                    <div className="stat__item">
                        <h3>{data.filter(project => project.featured).length}</h3>
                        <p>Featured</p>
                    </div>
                    <div className="stat__item">
                        <h3>2024</h3>
                        <p>Active Year</p>
                    </div>
                </div>

                <div className="projects__filters">
                    <h2>Filter by Technology</h2>
                    <div className="filter__buttons">
                        <button 
                            className={filter === 'all' ? 'active' : ''} 
                            onClick={() => handleFilter('all')}
                        >
                            All Projects
                        </button>
                        <button 
                            className={filter === 'react' ? 'active' : ''} 
                            onClick={() => handleFilter('react')}
                        >
                            React
                        </button>
                        <button 
                            className={filter === 'javascript' ? 'active' : ''} 
                            onClick={() => handleFilter('javascript')}
                        >
                            JavaScript
                        </button>
                        <button 
                            className={filter === 'sass' ? 'active' : ''} 
                            onClick={() => handleFilter('sass')}
                        >
                            SCSS/Sass
                        </button>
                        <button 
                            className={filter === 'css' ? 'active' : ''} 
                            onClick={() => handleFilter('css')}
                        >
                            CSS3
                        </button>
                    </div>
                </div>

                <div className="projects__grid">
                    {projectsToShow.map(project => (
                        <Card key={project.id} {...project} />
                    ))}
                </div>

                {visibleProjects < filteredProjects.length && (
                    <div className="load__more">
                        <button onClick={loadMore} className="load__more__btn">
                            Load More Projects
                        </button>
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="no__projects">
                        <h3>No projects found</h3>
                        <p>Try selecting a different filter to see more projects.</p>
                    </div>
                )}
            </div>
        </div>
    )
}