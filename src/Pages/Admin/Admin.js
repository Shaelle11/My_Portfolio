import React, { useState, useEffect } from 'react';
import './Admin.css';
import ContactService from '../../services/ContactService';
import ProjectService from '../../services/ProjectService';
import AnalyticsService from '../../services/AnalyticsService';
import BlogService from '../../services/BlogService';
import staticProjectData from '../../Components/Projectdata';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [projects, setProjects] = useState([]);
    const [realtimeStats, setRealtimeStats] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [newBlog, setNewBlog] = useState({
        title: '',
        summary: '',
        content: '',
        author: 'Nanji Lakan',
        category: 'Development',
        tags: '',
        image: '',
        published: false,
        featured: false
    });
    
    // Project form state
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        category: 'Full Stack',
        featured: false,
        status: 'planning',
        demoUrl: '',
        codeUrl: ''
    });

    const ADMIN_PASSWORD = 'admin123';

    useEffect(() => {
        if (isAuthenticated) {
            loadAllData();
        }
    }, [isAuthenticated]);

    const loadAllData = async () => {
        try {
            // Load messages (handle both Firebase async and localStorage sync)
            const messagesResult = await ContactService.getAllMessages();
            if (messagesResult && messagesResult.success) {
                setMessages(messagesResult.data);
            } else if (Array.isArray(messagesResult)) {
                // Handle localStorage version that returns array directly
                setMessages(messagesResult);
            } else {
                setMessages([]);
            }

            // Load blogs (handle both Firebase async and localStorage sync)
            const blogsResult = await BlogService.getAllPosts();
            if (blogsResult && blogsResult.success) {
                setBlogs(blogsResult.data);
            } else if (Array.isArray(blogsResult)) {
                // Handle localStorage version that returns array directly  
                setBlogs(blogsResult);
            } else {
                setBlogs([]);
            }

            // Load and combine projects
            const projectsResult = ProjectService.getAllProjects();
            let adminProjects = [];
            if (projectsResult.success) {
                adminProjects = projectsResult.data.map(project => ({
                ...project,
                isAdminProject: true,
                canEdit: true,
                canDelete: true
            }));
        }
        
        // Add static projects
        const staticProjects = staticProjectData.map(project => ({
            id: `static-${project.id}`,
            title: project.name,
            description: project.Description,
            category: 'Frontend', // Default category for static projects
            status: 'completed', // Static projects are typically completed
            technologies: project.technologies || [],
            image: project.img,
            demoUrl: project.Site,
            codeUrl: project.SourceCode,
            featured: project.featured || false,
            isStaticProject: true,
            staticId: project.id,
            canEdit: true,
            canDelete: false, // Don't allow deleting static projects
            createdAt: project.DateTime || new Date().toISOString()
        }));
        
        const allProjects = [...adminProjects, ...staticProjects]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setProjects(allProjects);

        // Load analytics
        const statsResult = AnalyticsService.getRealtimeStats();
        if (statsResult.success) {
            setRealtimeStats(statsResult.data);
        }
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to empty arrays if there's an error
            setMessages([]);
            setBlogs([]);
            setProjects([]);
            setRealtimeStats({
                totalVisitors: 0,
                uniqueVisitors: 0,
                pageViews: 0,
                sessionDuration: 0,
                bounceRate: 0,
                topPages: [],
                deviceTypes: {},
                referrerSources: {}
            });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const handleCreateProject = (e) => {
        e.preventDefault();
        
        if (editingProject) {
            // Update existing project
            if (editingProject.isStaticProject) {
                // For static projects, we can't modify the original file,
                // but we could store modifications in localStorage
                alert("Note: Changes to static projects are stored locally and won't affect the original project file.");
            } else {
                // Update admin project
                const updatedProject = {
                    ...editingProject,
                    title: newProject.title,
                    description: newProject.description,
                    category: newProject.category,
                    status: newProject.status,
                    technologies: newProject.technologies.split(',').map(tech => tech.trim()).filter(t => t),
                    image: newProject.image,
                    demo: newProject.demoUrl,
                    repository: newProject.codeUrl,
                    featured: newProject.featured,
                    updatedAt: new Date().toISOString()
                };
                
                const result = ProjectService.updateProject(editingProject.id, updatedProject);
                if (result.success) {
                    loadAllData();
                    alert('Project updated successfully!');
                } else {
                    alert('Failed to update project: ' + result.error);
                }
            }
            
            setEditingProject(null);
        } else {
            // Create new project
            const projectData = {
                ...newProject,
                technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t)
            };

            const result = ProjectService.createProject(projectData);
            if (result.success) {
                loadAllData();
                alert('Project created successfully!');
            } else {
                alert('Failed to create project: ' + result.error);
            }
        }
        
        // Reset form
        setShowProjectForm(false);
        setNewProject({
            title: '',
            description: '',
            image: '',
            technologies: '',
            category: 'Full Stack',
            featured: false,
            status: 'planning',
            demoUrl: '',
            codeUrl: ''
        });
    };

    const handleDeleteProject = (project) => {
        if (project.isStaticProject) {
            alert('Cannot delete static projects. These are part of your original portfolio.');
            return;
        }
        
        if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
            const result = ProjectService.deleteProject(project.id);
            if (result.success) {
                loadAllData();
                alert('Project deleted successfully!');
            } else {
                alert('Failed to delete project: ' + result.error);
            }
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setNewProject({
            title: project.title,
            description: project.description,
            category: project.category,
            status: project.status,
            technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies || '',
            image: project.image || '',
            demoUrl: project.demoUrl || project.demo || '',
            codeUrl: project.codeUrl || project.repository || '',
            featured: project.featured || false
        });
        setShowProjectForm(true);
    };
    
    const handleCancelEdit = () => {
        setEditingProject(null);
        setNewProject({
            title: '',
            description: '',
            image: '',
            technologies: '',
            category: 'Full Stack',
            featured: false,
            status: 'planning',
            demoUrl: '',
            codeUrl: ''
        });
        setShowProjectForm(false);
    };

    const handleMarkAsRead = async (messageId) => {
        try {
            const result = await ContactService.markAsRead(messageId);
            if (result && result.success) {
                await loadAllData();
                if (selectedMessage && selectedMessage.id === messageId) {
                    setSelectedMessage({
                        ...selectedMessage,
                        read: true,
                        readAt: new Date().toISOString()
                    });
                }
            }
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const result = await ContactService.deleteMessage(messageId);
                if (result && result.success) {
                    await loadAllData();
                    if (selectedMessage && selectedMessage.id === messageId) {
                        setSelectedMessage(null);
                    }
                    alert('Message deleted successfully!');
                }
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message. Please try again.');
            }
        }
    };

    // Blog management functions
    const handleCreateBlog = (e) => {
        e.preventDefault();
        
        const blogData = {
            ...newBlog,
            tags: newBlog.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        };

        let result;
        if (editingBlog) {
            result = BlogService.updatePost(editingBlog.id, blogData);
        } else {
            result = BlogService.createPost(blogData);
        }

        if (result.success) {
            alert(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
            handleCancelBlogEdit();
            loadAllData();
        } else {
            alert('Error: ' + result.error);
        }
    };

    const handleDeleteBlog = (blog) => {
        if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            const result = BlogService.deletePost(blog.id);
            if (result.success) {
                alert('Blog deleted successfully!');
                loadAllData();
            } else {
                alert('Error deleting blog: ' + result.error);
            }
        }
    };

    const handleEditBlog = (blog) => {
        setEditingBlog(blog);
        setNewBlog({
            title: blog.title,
            summary: blog.summary,
            content: blog.content,
            author: blog.author,
            category: blog.category,
            tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
            image: blog.image || '',
            published: blog.published,
            featured: blog.featured
        });
        setShowBlogForm(true);
    };

    const handleCancelBlogEdit = () => {
        setEditingBlog(null);
        setNewBlog({
            title: '',
            summary: '',
            content: '',
            author: 'Nanji Lakan',
            category: 'Development',
            tags: '',
            image: '',
            published: false,
            featured: false
        });
        setShowBlogForm(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';
        
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-container">
                    <h1>Admin Portal</h1>
                    <p>Enter password to access the admin dashboard</p>
                    <form onSubmit={handleLogin} className="login-form">
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p style={{marginTop: '20px', fontSize: '12px', color: '#888'}}>
                        Demo password: admin123
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Portfolio Admin Dashboard</h1>
                <div className="admin-actions">
                    <button onClick={() => setIsAuthenticated(false)} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="admin-navigation">
                <button 
                    className={activeTab === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Dashboard
                </button>
                <button 
                    className={activeTab === 'analytics' ? 'nav-btn active' : 'nav-btn'}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
                <button 
                    className={activeTab === 'projects' ? 'nav-btn active' : 'nav-btn'}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                </button>
                <button 
                    className={activeTab === 'blogs' ? 'nav-btn active' : 'nav-btn'}
                    onClick={() => setActiveTab('blogs')}
                >
                    Blog
                </button>
                <button 
                    className={activeTab === 'messages' ? 'nav-btn active' : 'nav-btn'}
                    onClick={() => setActiveTab('messages')}
                >
                    Messages
                </button>
            </div>

            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
                <div className="dashboard-content">
                    <div className="overview-stats">
                        <div className="stat-card">
                            <h3>{realtimeStats?.totalVisitors || 0}</h3>
                            <p>Total Visitors</p>
                        </div>
                        <div className="stat-card">
                            <h3>{realtimeStats?.todayVisitors || 0}</h3>
                            <p>Today's Visitors</p>
                        </div>
                        <div className="stat-card">
                            <h3>{projects.length}</h3>
                            <p>Total Projects</p>
                        </div>
                        <div className="stat-card unread">
                            <h3>{messages.filter(m => !m.read).length}</h3>
                            <p>Unread Messages</p>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="action-buttons">
                            <button 
                                onClick={() => {
                                    setActiveTab('projects');
                                    setShowProjectForm(true);
                                }}
                                className="action-btn primary"
                            >
                                Add New Project
                            </button>
                            <button 
                                onClick={() => setActiveTab('messages')}
                                className="action-btn secondary"
                            >
                                View Messages ({messages.filter(m => !m.read).length} unread)
                            </button>
                            <button 
                                onClick={() => setActiveTab('analytics')}
                                className="action-btn tertiary"
                            >
                                View Analytics
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Analytics Section */}
            {activeTab === 'analytics' && (
                <div className="analytics-content">
                    <h2>Visitor Analytics</h2>
                    
                    {realtimeStats ? (
                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <h3>Real-time Statistics</h3>
                                <div className="stats-list">
                                    <div className="stat-item">
                                        <span className="stat-number">{realtimeStats.activeVisitors}</span>
                                        <span className="stat-label">Active Visitors</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{realtimeStats.todayVisitors}</span>
                                        <span className="stat-label">Today's Visitors</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{realtimeStats.todayPageViews}</span>
                                        <span className="stat-label">Today's Page Views</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">{realtimeStats.totalVisitors}</span>
                                        <span className="stat-label">Total Visitors</span>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <h3>Top Pages</h3>
                                {realtimeStats.topPages && realtimeStats.topPages.length > 0 ? (
                                    realtimeStats.topPages.map((page, index) => (
                                        <div key={index} className="detail-item">
                                            <span>{page.page}</span>
                                            <span>{page.views} views</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No page data available</p>
                                )}
                            </div>

                            <div className="analytics-card">
                                <h3>Device Breakdown</h3>
                                {realtimeStats.deviceBreakdown && Object.keys(realtimeStats.deviceBreakdown).length > 0 ? (
                                    Object.entries(realtimeStats.deviceBreakdown).map(([device, count]) => (
                                        <div key={device} className="detail-item">
                                            <span>{device}</span>
                                            <span>{count} users</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No device data available</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="no-data">
                            <p>Loading analytics data...</p>
                        </div>
                    )}
                </div>
            )}

            {/* Projects Section */}
            {activeTab === 'projects' && (
                <div className="projects-content">
                    <div className="section-header">
                        <h2>Project Management</h2>
                        <button 
                            onClick={() => {
                                if (showProjectForm && editingProject) {
                                    handleCancelEdit();
                                } else {
                                    setShowProjectForm(!showProjectForm);
                                }
                            }}
                            className="add-btn"
                        >
                            {showProjectForm ? (editingProject ? 'Cancel Edit' : 'Cancel') : 'Add New Project'}
                        </button>
                    </div>

                    {showProjectForm && (
                        <div className="project-form">
                            <h3>{editingProject ? `Edit Project: ${editingProject.title}` : 'Create New Project'}</h3>
                            {editingProject && editingProject.isStaticProject && (
                                <div className="info-banner">
                                    <p><strong>Note:</strong> This is a static project from your original portfolio. Changes will be stored locally.</p>
                                </div>
                            )}
                            <form onSubmit={handleCreateProject}>
                                <div className="form-grid">
                                    <input
                                        type="text"
                                        placeholder="Project Title"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                        required
                                    />
                                    <select
                                        value={newProject.category}
                                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                                    >
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <select
                                        value={newProject.status}
                                        onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                                    >
                                        <option value="planning">Planning</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Technologies (comma separated)"
                                        value={newProject.technologies}
                                        onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Image URL"
                                        value={newProject.image}
                                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Demo URL"
                                        value={newProject.demoUrl}
                                        onChange={(e) => setNewProject({...newProject, demoUrl: e.target.value})}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Code URL"
                                        value={newProject.codeUrl}
                                        onChange={(e) => setNewProject({...newProject, codeUrl: e.target.value})}
                                    />
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={newProject.featured}
                                            onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                                        />
                                        Featured Project
                                    </label>
                                </div>
                                <textarea
                                    placeholder="Project Description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    required
                                />
                                <button type="submit">
                                    {editingProject ? 'Update Project' : 'Create Project'}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="projects-list">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <div key={project.id} className="project-item">
                                    <div className="project-info">
                                        <div className="project-header">
                                            <h4>{project.title}</h4>
                                            {project.isStaticProject && (
                                                <span className="project-type static">Static</span>
                                            )}
                                            {project.isAdminProject && (
                                                <span className="project-type admin">Admin</span>
                                            )}
                                        </div>
                                        <p>{project.description.substring(0, 100)}...</p>
                                        <div className="project-meta">
                                            <span className={`status ${project.status}`}>{project.status}</span>
                                            <span className="category">{project.category}</span>
                                            {project.featured && <span className="featured">Featured</span>}
                                        </div>
                                        <div className="project-technologies">
                                            {project.technologies && project.technologies.map((tech, index) => (
                                                <span key={index} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="project-actions">
                                        {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="demo-btn">
                                                Demo
                                            </a>
                                        )}
                                        {project.canEdit && (
                                            <button 
                                                onClick={() => handleEditProject(project)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {project.canDelete && (
                                            <button 
                                                onClick={() => handleDeleteProject(project)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">
                                <p>Loading projects...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Messages Section */}
            {activeTab === 'messages' && (
                <div className="messages-content">
                    <h2>Contact Messages</h2>

                    <div className="messages-layout">
                        <div className="messages-list">
                            <h3>Messages ({messages.length})</h3>
                            {messages.length > 0 ? (
                                messages.map(message => (
                                    <div 
                                        key={message.id}
                                        className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedMessage(message)}
                                    >
                                        <div className="message-header">
                                            <h4>{message.name}</h4>
                                            <span className="message-date">{formatDate(message.timestamp)}</span>
                                            {!message.read && <span className="unread-badge">New</span>}
                                        </div>
                                        <p className="message-email">{message.email}</p>
                                        <p className="message-preview">
                                            {message.message.length > 100 
                                                ? message.message.substring(0, 100) + '...'
                                                : message.message
                                            }
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="no-data">
                                    <p>No messages found.</p>
                                </div>
                            )}
                        </div>

                        <div className="message-detail">
                            {selectedMessage ? (
                                <div className="message-full">
                                    <div className="message-full-header">
                                        <div className="message-info">
                                            <h3>{selectedMessage.name}</h3>
                                            <p className="email">{selectedMessage.email}</p>
                                            <p className="date">Received: {formatDate(selectedMessage.timestamp)}</p>
                                            {selectedMessage.read && (
                                                <p className="read-date">Read: {formatDate(selectedMessage.readAt)}</p>
                                            )}
                                        </div>
                                        <div className="message-actions">
                                            {!selectedMessage.read && (
                                                <button 
                                                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                                                    className="mark-read-btn"
                                                >
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDeleteMessage(selectedMessage.id)}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="message-content">
                                        <h4>Message:</h4>
                                        <div className="message-text">
                                            {selectedMessage.message}
                                        </div>
                                    </div>

                                    <div className="reply-section">
                                        <a 
                                            href={`mailto:${selectedMessage.email}?subject=Re: Your message&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out!`}
                                            className="reply-btn"
                                        >
                                            Reply via Email
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="no-selection">
                                    <p>Select a message to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Management */}
            {activeTab === 'blogs' && (
                <div className="admin-section">
                    <div className="section-header">
                        <h2>Blog Management</h2>
                        <button 
                            className="primary-btn"
                            onClick={() => setShowBlogForm(true)}
                        >
                            Create New Post
                        </button>
                    </div>

                    {showBlogForm && (
                        <div className="modal-overlay">
                            <div className="modal-content blog-form">
                                <div className="modal-header">
                                    <h3>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h3>
                                    <button 
                                        className="close-btn"
                                        onClick={handleCancelBlogEdit}
                                    >
                                        ×
                                    </button>
                                </div>
                                
                                <form onSubmit={handleCreateBlog}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Title *</label>
                                            <input
                                                type="text"
                                                value={newBlog.title}
                                                onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                                                required
                                                placeholder="Enter blog title"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select
                                                value={newBlog.category}
                                                onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                                            >
                                                <option value="Development">Development</option>
                                                <option value="Design">Design</option>
                                                <option value="Tutorial">Tutorial</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Personal">Personal</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Summary *</label>
                                        <textarea
                                            value={newBlog.summary}
                                            onChange={(e) => setNewBlog({...newBlog, summary: e.target.value})}
                                            required
                                            placeholder="Brief summary of the blog post"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Content *</label>
                                        <textarea
                                            value={newBlog.content}
                                            onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                                            required
                                            placeholder="Write your blog content here..."
                                            rows="10"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Tags</label>
                                            <input
                                                type="text"
                                                value={newBlog.tags}
                                                onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                                                placeholder="React, JavaScript, Web Development (comma-separated)"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Image URL</label>
                                            <input
                                                type="url"
                                                value={newBlog.image}
                                                onChange={(e) => setNewBlog({...newBlog, image: e.target.value})}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Author</label>
                                            <input
                                                type="text"
                                                value={newBlog.author}
                                                onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                                                placeholder="Author name"
                                            />
                                        </div>
                                    </div>

                                    <div className="checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={newBlog.published}
                                                onChange={(e) => setNewBlog({...newBlog, published: e.target.checked})}
                                            />
                                            <span className="checkmark"></span>
                                            Publish immediately
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={newBlog.featured}
                                                onChange={(e) => setNewBlog({...newBlog, featured: e.target.checked})}
                                            />
                                            <span className="checkmark"></span>
                                            Feature this post
                                        </label>
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" onClick={handleCancelBlogEdit} className="secondary-btn">
                                            Cancel
                                        </button>
                                        <button type="submit" className="primary-btn">
                                            {editingBlog ? 'Update Post' : 'Create Post'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="blogs-grid">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="blog-card">
                                {blog.image && (
                                    <div className="blog-image">
                                        <img src={blog.image} alt={blog.title} />
                                    </div>
                                )}
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span className={`blog-status ${blog.published ? 'published' : 'draft'}`}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                        {blog.featured && (
                                            <span className="blog-featured">Featured</span>
                                        )}
                                        <span className="blog-category">{blog.category}</span>
                                    </div>
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <p className="blog-summary">{blog.summary}</p>
                                    <div className="blog-details">
                                        <span>By {blog.author}</span>
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        <span>{blog.readTime}</span>
                                    </div>
                                    {blog.tags && blog.tags.length > 0 && (
                                        <div className="blog-tags">
                                            {blog.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="blog-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="blog-actions">
                                        <button 
                                            onClick={() => handleEditBlog(blog)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteBlog(blog)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                        <a 
                                            href={`/My_Portfolio/blog/${blog.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-btn"
                                        >
                                            View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {blogs.length === 0 && (
                        <div className="empty-state">
                            <h3>No blog posts yet</h3>
                            <p>Create your first blog post to get started!</p>
                            <button 
                                className="primary-btn"
                                onClick={() => setShowBlogForm(true)}
                            >
                                Create First Post
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}