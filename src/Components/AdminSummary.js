import React, { useState, useEffect } from 'react';
import AnalyticsService from '../services/AnalyticsService';
import ProjectService from '../services/ProjectService';
import ContactService from '../services/ContactService';

export default function AdminSummary() {
    const [stats, setStats] = useState({
        totalVisitors: 0,
        totalProjects: 0,
        totalMessages: 0,
        recentActivity: []
    });

    useEffect(() => {
        const loadStats = () => {
            const visitors = AnalyticsService.getTotalVisitors();
            const projects = ProjectService.getAllProjects();
            const messages = ContactService.getAllMessages();
            
            // Get recent activity (last 5 items)
            const recentActivity = [
                ...messages.slice(-3).map(msg => ({
                    type: 'message',
                    content: `New message from ${msg.name}`,
                    time: new Date(msg.timestamp).toLocaleDateString()
                })),
                ...projects.slice(-2).map(project => ({
                    type: 'project',
                    content: `Added project: ${project.title}`,
                    time: new Date(project.createdAt).toLocaleDateString()
                }))
            ].sort((a, b) => new Date(b.time) - new Date(a.time));

            setStats({
                totalVisitors: visitors,
                totalProjects: projects.length,
                totalMessages: messages.length,
                recentActivity: recentActivity.slice(0, 5)
            });
        };

        loadStats();
        // Refresh stats every 30 seconds
        const interval = setInterval(loadStats, 30000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="admin-summary">
            <h2>Portfolio Dashboard</h2>
            
            <div className="overview-stats">
                <div className="stat-card">
                    <span className="stat-number">{stats.totalVisitors}</span>
                    <span className="stat-label">Total Visitors</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{stats.totalProjects}</span>
                    <span className="stat-label">Projects</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{stats.totalMessages}</span>
                    <span className="stat-label">Messages</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">
                        {AnalyticsService.getSessionCount()}
                    </span>
                    <span className="stat-label">Sessions Today</span>
                </div>
            </div>

            <div className="recent-activity">
                <h3>Recent Activity</h3>
                {stats.recentActivity.length > 0 ? (
                    <div className="activity-list">
                        {stats.recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <span className={`activity-icon ${activity.type}`}>
                                    {activity.type === 'message' ? '💬' : '🚀'}
                                </span>
                                <div className="activity-content">
                                    <p>{activity.content}</p>
                                    <small>{activity.time}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No recent activity</p>
                )}
            </div>
        </div>
    );
}