// ProjectService.js - Project management service
class ProjectService {
    constructor() {
        this.storageKey = 'portfolio_projects';
        this.init();
    }

    init() {
        // Initialize with existing project data if nothing in storage
        if (!localStorage.getItem(this.storageKey)) {
            // Import existing projects from Projectdata.js
            this.importExistingProjects();
        }
    }

    importExistingProjects() {
        // Default projects data - based on existing Projectdata.js structure
        const defaultProjects = [
            {
                id: '1',
                title: "E-commerce Platform",
                description: "A modern, responsive e-commerce platform built with React and Node.js. Features include user authentication, payment processing, inventory management, and real-time order tracking.",
                image: "/api/placeholder/600/400",
                technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
                category: "Full Stack",
                featured: true,
                status: "completed",
                demoUrl: "https://ecommerce-demo.example.com",
                codeUrl: "https://github.com/user/ecommerce-platform",
                createdAt: "2024-01-15T00:00:00Z",
                updatedAt: "2024-01-15T00:00:00Z"
            },
            {
                id: '2',
                title: "Weather Analytics Dashboard",
                description: "Interactive dashboard for weather data visualization with real-time updates, historical trends, and predictive analytics using machine learning.",
                image: "/api/placeholder/600/400",
                technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
                category: "Data Visualization",
                featured: true,
                status: "completed",
                demoUrl: "https://weather-dashboard.example.com",
                codeUrl: "https://github.com/user/weather-dashboard",
                createdAt: "2024-02-10T00:00:00Z",
                updatedAt: "2024-02-10T00:00:00Z"
            },
            {
                id: '3',
                title: "Task Management App",
                description: "Collaborative task management application with team workspaces, real-time updates, file sharing, and advanced project tracking capabilities.",
                image: "/api/placeholder/600/400",
                technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io", "Redis"],
                category: "Productivity",
                featured: false,
                status: "completed",
                demoUrl: "https://taskmanager.example.com",
                codeUrl: "https://github.com/user/task-manager",
                createdAt: "2024-03-05T00:00:00Z",
                updatedAt: "2024-03-05T00:00:00Z"
            }
        ];

        localStorage.setItem(this.storageKey, JSON.stringify(defaultProjects));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getAllProjects() {
        try {
            const projects = JSON.parse(localStorage.getItem(this.storageKey)) || [];
            return {
                success: true,
                data: projects,
                count: projects.length
            };
        } catch (error) {
            console.error('Error retrieving projects:', error);
            return {
                success: false,
                error: 'Failed to retrieve projects',
                data: []
            };
        }
    }

    getProjectById(projectId) {
        try {
            const projects = this.getAllProjects().data || [];
            const project = projects.find(p => p.id === projectId);
            
            if (project) {
                return {
                    success: true,
                    data: project
                };
            } else {
                return {
                    success: false,
                    error: 'Project not found'
                };
            }
        } catch (error) {
            console.error('Error retrieving project:', error);
            return {
                success: false,
                error: 'Failed to retrieve project'
            };
        }
    }

    createProject(projectData) {
        try {
            const projects = this.getAllProjects().data || [];
            
            const newProject = {
                id: this.generateId(),
                title: projectData.title || '',
                description: projectData.description || '',
                image: projectData.image || '/api/placeholder/600/400',
                technologies: projectData.technologies || [],
                category: projectData.category || 'Other',
                featured: projectData.featured || false,
                status: projectData.status || 'in-progress',
                demoUrl: projectData.demoUrl || '',
                codeUrl: projectData.codeUrl || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...projectData
            };

            projects.push(newProject);
            localStorage.setItem(this.storageKey, JSON.stringify(projects));
            
            return {
                success: true,
                data: newProject,
                message: 'Project created successfully'
            };
        } catch (error) {
            console.error('Error creating project:', error);
            return {
                success: false,
                error: 'Failed to create project',
                details: error.message
            };
        }
    }

    updateProject(projectId, updates) {
        try {
            const projects = this.getAllProjects().data || [];
            const projectIndex = projects.findIndex(p => p.id === projectId);
            
            if (projectIndex !== -1) {
                projects[projectIndex] = {
                    ...projects[projectIndex],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                
                localStorage.setItem(this.storageKey, JSON.stringify(projects));
                
                return {
                    success: true,
                    data: projects[projectIndex],
                    message: 'Project updated successfully'
                };
            } else {
                return {
                    success: false,
                    error: 'Project not found'
                };
            }
        } catch (error) {
            console.error('Error updating project:', error);
            return {
                success: false,
                error: 'Failed to update project'
            };
        }
    }

    deleteProject(projectId) {
        try {
            const projects = this.getAllProjects().data || [];
            const filteredProjects = projects.filter(p => p.id !== projectId);
            
            if (filteredProjects.length < projects.length) {
                localStorage.setItem(this.storageKey, JSON.stringify(filteredProjects));
                
                return {
                    success: true,
                    message: 'Project deleted successfully'
                };
            } else {
                return {
                    success: false,
                    error: 'Project not found'
                };
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            return {
                success: false,
                error: 'Failed to delete project'
            };
        }
    }

    getFeaturedProjects() {
        try {
            const projects = this.getAllProjects().data || [];
            const featuredProjects = projects.filter(p => p.featured);
            
            return {
                success: true,
                data: featuredProjects,
                count: featuredProjects.length
            };
        } catch (error) {
            console.error('Error retrieving featured projects:', error);
            return {
                success: false,
                error: 'Failed to retrieve featured projects',
                data: []
            };
        }
    }

    getProjectsByCategory(category) {
        try {
            const projects = this.getAllProjects().data || [];
            const filteredProjects = projects.filter(p => p.category === category);
            
            return {
                success: true,
                data: filteredProjects,
                count: filteredProjects.length
            };
        } catch (error) {
            console.error('Error retrieving projects by category:', error);
            return {
                success: false,
                error: 'Failed to retrieve projects by category',
                data: []
            };
        }
    }

    getProjectsByStatus(status) {
        try {
            const projects = this.getAllProjects().data || [];
            const filteredProjects = projects.filter(p => p.status === status);
            
            return {
                success: true,
                data: filteredProjects,
                count: filteredProjects.length
            };
        } catch (error) {
            console.error('Error retrieving projects by status:', error);
            return {
                success: false,
                error: 'Failed to retrieve projects by status',
                data: []
            };
        }
    }

    getLatestProjects(limit = 3) {
        try {
            const projects = this.getAllProjects().data || [];
            const sortedProjects = projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const latestProjects = sortedProjects.slice(0, limit);
            
            return {
                success: true,
                data: latestProjects,
                count: latestProjects.length
            };
        } catch (error) {
            console.error('Error retrieving latest projects:', error);
            return {
                success: false,
                error: 'Failed to retrieve latest projects',
                data: []
            };
        }
    }

    getProjectStats() {
        try {
            const projects = this.getAllProjects().data || [];
            
            const stats = {
                total: projects.length,
                featured: projects.filter(p => p.featured).length,
                completed: projects.filter(p => p.status === 'completed').length,
                inProgress: projects.filter(p => p.status === 'in-progress').length,
                planning: projects.filter(p => p.status === 'planning').length,
                categories: {},
                technologies: {}
            };

            // Count by category
            projects.forEach(project => {
                stats.categories[project.category] = (stats.categories[project.category] || 0) + 1;
            });

            // Count technologies
            projects.forEach(project => {
                if (project.technologies && Array.isArray(project.technologies)) {
                    project.technologies.forEach(tech => {
                        stats.technologies[tech] = (stats.technologies[tech] || 0) + 1;
                    });
                }
            });
            
            return {
                success: true,
                data: stats
            };
        } catch (error) {
            console.error('Error retrieving project stats:', error);
            return {
                success: false,
                error: 'Failed to retrieve project statistics'
            };
        }
    }

    searchProjects(searchTerm) {
        try {
            const projects = this.getAllProjects().data || [];
            const searchResults = projects.filter(project => 
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
                project.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            return {
                success: true,
                data: searchResults,
                count: searchResults.length
            };
        } catch (error) {
            console.error('Error searching projects:', error);
            return {
                success: false,
                error: 'Failed to search projects',
                data: []
            };
        }
    }

    exportProjects() {
        try {
            const projects = this.getAllProjects().data || [];
            const exportData = {
                exportDate: new Date().toISOString(),
                projectCount: projects.length,
                projects: projects
            };
            
            return {
                success: true,
                data: exportData,
                filename: `projects_${new Date().toISOString().split('T')[0]}.json`
            };
        } catch (error) {
            console.error('Error exporting projects:', error);
            return {
                success: false,
                error: 'Failed to export projects'
            };
        }
    }

    importProjects(projectData) {
        try {
            if (!Array.isArray(projectData)) {
                throw new Error('Project data must be an array');
            }

            const processedProjects = projectData.map(project => ({
                id: project.id || this.generateId(),
                title: project.title || 'Untitled Project',
                description: project.description || '',
                image: project.image || '/api/placeholder/600/400',
                technologies: project.technologies || [],
                category: project.category || 'Other',
                featured: project.featured || false,
                status: project.status || 'in-progress',
                demoUrl: project.demoUrl || '',
                codeUrl: project.codeUrl || '',
                createdAt: project.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }));

            localStorage.setItem(this.storageKey, JSON.stringify(processedProjects));
            
            return {
                success: true,
                data: processedProjects,
                message: `Successfully imported ${processedProjects.length} projects`
            };
        } catch (error) {
            console.error('Error importing projects:', error);
            return {
                success: false,
                error: 'Failed to import projects',
                details: error.message
            };
        }
    }

    // Method for React components to get projects in the expected format
    getProjectsForDisplay() {
        const result = this.getAllProjects();
        if (result.success) {
            // Convert to the format expected by existing components
            return result.data.map(project => ({
                ...project,
                // Ensure backward compatibility with existing component expectations
                img: project.image,
                tech: project.technologies,
                desc: project.description
            }));
        }
        return [];
    }
}

// Create a singleton instance
const projectService = new ProjectService();

export default projectService;