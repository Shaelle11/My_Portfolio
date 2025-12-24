// AnalyticsService.js - Visitor tracking and analytics
class AnalyticsService {
    constructor() {
        this.storageKey = 'portfolio_analytics';
        this.sessionKey = 'portfolio_session';
        this.init();
    }

    init() {
        // Initialize storage if it doesn't exist
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                totalVisitors: 0,
                dailyStats: {},
                pageViews: {},
                referrers: {},
                browsers: {},
                devices: {},
                countries: {},
                sessions: []
            }));
        }
        
        // Track current session
        this.trackSession();
    }

    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getCurrentSession() {
        const sessionId = sessionStorage.getItem(this.sessionKey);
        if (!sessionId) {
            const newSessionId = this.generateSessionId();
            sessionStorage.setItem(this.sessionKey, newSessionId);
            return newSessionId;
        }
        return sessionId;
    }

    trackSession() {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const sessionId = this.getCurrentSession();
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            
            // Check if this is a new session
            const existingSession = analytics.sessions.find(s => s.id === sessionId);
            
            if (!existingSession) {
                // New visitor
                analytics.totalVisitors += 1;
                
                // Daily stats
                if (!analytics.dailyStats[today]) {
                    analytics.dailyStats[today] = {
                        visitors: 0,
                        pageViews: 0,
                        bounceRate: 0,
                        avgSessionDuration: 0
                    };
                }
                analytics.dailyStats[today].visitors += 1;

                // Session info
                const sessionInfo = {
                    id: sessionId,
                    startTime: now.toISOString(),
                    endTime: null,
                    duration: 0,
                    pages: [],
                    referrer: document.referrer || 'Direct',
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    screenResolution: `${window.screen.width}x${window.screen.height}`,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    country: 'Unknown', // Would need GeoIP service
                    city: 'Unknown'
                };

                analytics.sessions.push(sessionInfo);

                // Update referrer stats
                const referrerDomain = this.extractDomain(document.referrer);
                if (!analytics.referrers[referrerDomain]) {
                    analytics.referrers[referrerDomain] = 0;
                }
                analytics.referrers[referrerDomain] += 1;

                // Update browser stats
                const browserInfo = this.getBrowserInfo();
                if (!analytics.browsers[browserInfo.name]) {
                    analytics.browsers[browserInfo.name] = 0;
                }
                analytics.browsers[browserInfo.name] += 1;

                // Update device stats
                const deviceType = this.getDeviceType();
                if (!analytics.devices[deviceType]) {
                    analytics.devices[deviceType] = 0;
                }
                analytics.devices[deviceType] += 1;
            }

            localStorage.setItem(this.storageKey, JSON.stringify(analytics));
        } catch (error) {
            console.error('Error tracking session:', error);
        }
    }

    trackPageView(pageName, path) {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const sessionId = this.getCurrentSession();
            const now = new Date();
            const today = now.toISOString().split('T')[0];

            // Update page views
            if (!analytics.pageViews[pageName]) {
                analytics.pageViews[pageName] = 0;
            }
            analytics.pageViews[pageName] += 1;

            // Update daily page views
            if (analytics.dailyStats[today]) {
                analytics.dailyStats[today].pageViews += 1;
            }

            // Add to session pages
            const session = analytics.sessions.find(s => s.id === sessionId);
            if (session) {
                session.pages.push({
                    name: pageName,
                    path: path,
                    timestamp: now.toISOString(),
                    timeSpent: 0
                });
            }

            localStorage.setItem(this.storageKey, JSON.stringify(analytics));
        } catch (error) {
            console.error('Error tracking page view:', error);
        }
    }

    trackEvent(eventName, eventData = {}) {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const sessionId = this.getCurrentSession();
            const now = new Date();

            const event = {
                id: this.generateSessionId(),
                sessionId: sessionId,
                name: eventName,
                data: eventData,
                timestamp: now.toISOString(),
                userAgent: navigator.userAgent,
                page: window.location.pathname
            };

            if (!analytics.events) {
                analytics.events = [];
            }
            analytics.events.push(event);

            // Keep only last 1000 events to prevent storage overflow
            if (analytics.events.length > 1000) {
                analytics.events = analytics.events.slice(-1000);
            }

            localStorage.setItem(this.storageKey, JSON.stringify(analytics));
        } catch (error) {
            console.error('Error tracking event:', error);
        }
    }

    extractDomain(url) {
        if (!url) return 'Direct';
        try {
            return new URL(url).hostname;
        } catch {
            return 'Unknown';
        }
    }

    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes('Chrome')) return { name: 'Chrome', version: this.extractVersion(userAgent, 'Chrome/') };
        if (userAgent.includes('Firefox')) return { name: 'Firefox', version: this.extractVersion(userAgent, 'Firefox/') };
        if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return { name: 'Safari', version: this.extractVersion(userAgent, 'Safari/') };
        if (userAgent.includes('Edge')) return { name: 'Edge', version: this.extractVersion(userAgent, 'Edge/') };
        if (userAgent.includes('Opera')) return { name: 'Opera', version: this.extractVersion(userAgent, 'Opera/') };
        
        return { name: 'Unknown', version: 'Unknown' };
    }

    extractVersion(userAgent, prefix) {
        const index = userAgent.indexOf(prefix);
        if (index === -1) return 'Unknown';
        const version = userAgent.substring(index + prefix.length);
        return version.split(' ')[0].split('.')[0];
    }

    getDeviceType() {
        const userAgent = navigator.userAgent;
        
        if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            if (/iPad/i.test(userAgent)) return 'Tablet';
            return 'Mobile';
        }
        return 'Desktop';
    }

    getAnalytics() {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            return {
                success: true,
                data: analytics
            };
        } catch (error) {
            console.error('Error getting analytics:', error);
            return {
                success: false,
                error: 'Failed to retrieve analytics data'
            };
        }
    }

    getRealtimeStats() {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const now = new Date();
            const today = now.toISOString().split('T')[0];
            
            // Active sessions (last 30 minutes)
            const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
            const activeSessions = analytics.sessions.filter(session => {
                const lastActivity = session.pages.length > 0 
                    ? new Date(session.pages[session.pages.length - 1].timestamp)
                    : new Date(session.startTime);
                return lastActivity >= thirtyMinutesAgo;
            });

            return {
                success: true,
                data: {
                    activeVisitors: activeSessions.length,
                    todayVisitors: analytics.dailyStats[today]?.visitors || 0,
                    todayPageViews: analytics.dailyStats[today]?.pageViews || 0,
                    totalVisitors: analytics.totalVisitors,
                    topPages: this.getTopPages(analytics.pageViews),
                    topReferrers: this.getTopReferrers(analytics.referrers),
                    browserBreakdown: analytics.browsers,
                    deviceBreakdown: analytics.devices
                }
            };
        } catch (error) {
            console.error('Error getting realtime stats:', error);
            return {
                success: false,
                error: 'Failed to retrieve realtime stats'
            };
        }
    }

    getTopPages(pageViews, limit = 5) {
        return Object.entries(pageViews)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([page, views]) => ({ page, views }));
    }

    getTopReferrers(referrers, limit = 5) {
        return Object.entries(referrers)
            .sort(([,a], [,b]) => b - a)
            .slice(0, limit)
            .map(([referrer, visits]) => ({ referrer, visits }));
    }

    getDailyStats(days = 30) {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const now = new Date();
            const stats = [];

            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                
                stats.push({
                    date: dateStr,
                    visitors: analytics.dailyStats[dateStr]?.visitors || 0,
                    pageViews: analytics.dailyStats[dateStr]?.pageViews || 0
                });
            }

            return {
                success: true,
                data: stats
            };
        } catch (error) {
            console.error('Error getting daily stats:', error);
            return {
                success: false,
                error: 'Failed to retrieve daily stats'
            };
        }
    }

    exportAnalytics() {
        try {
            const analytics = JSON.parse(localStorage.getItem(this.storageKey));
            const exportData = {
                exportDate: new Date().toISOString(),
                ...analytics
            };
            
            return {
                success: true,
                data: exportData,
                filename: `analytics_${new Date().toISOString().split('T')[0]}.json`
            };
        } catch (error) {
            console.error('Error exporting analytics:', error);
            return {
                success: false,
                error: 'Failed to export analytics'
            };
        }
    }

    clearAnalytics() {
        try {
            localStorage.removeItem(this.storageKey);
            this.init();
            return {
                success: true,
                message: 'Analytics data cleared successfully'
            };
        } catch (error) {
            console.error('Error clearing analytics:', error);
            return {
                success: false,
                error: 'Failed to clear analytics data'
            };
        }
    }

    // Utility method for React hooks
    usePageTracking(pageName, path) {
        this.trackPageView(pageName, path);
    }
}

// Create a singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService;