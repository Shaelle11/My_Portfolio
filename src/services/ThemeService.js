/**
 * Theme Management Service
 * Handles light/dark mode switching and persistence
 */

class ThemeService {
    constructor() {
        this.THEME_KEY = 'portfolio-theme';
        this.THEMES = {
            DARK: 'dark',
            LIGHT: 'light'
        };
        
        this.init();
    }

    /**
     * Initialize theme from localStorage or set default
     */
    init() {
        const savedTheme = this.getCurrentTheme();
        this.applyTheme(savedTheme);
    }

    /**
     * Get current theme from localStorage or default to dark
     */
    getCurrentTheme() {
        return localStorage.getItem(this.THEME_KEY) || this.THEMES.DARK;
    }

    /**
     * Check if current theme is dark
     */
    isDarkMode() {
        return this.getCurrentTheme() === this.THEMES.DARK;
    }

    /**
     * Check if current theme is light
     */
    isLightMode() {
        return this.getCurrentTheme() === this.THEMES.LIGHT;
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        this.setTheme(newTheme);
        return newTheme;
    }

    /**
     * Set specific theme
     */
    setTheme(theme) {
        if (!Object.values(this.THEMES).includes(theme)) {
            console.warn(`Invalid theme: ${theme}. Using dark theme as fallback.`);
            theme = this.THEMES.DARK;
        }

        localStorage.setItem(this.THEME_KEY, theme);
        this.applyTheme(theme);
    }

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Also update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
    }

    /**
     * Update meta theme color for mobile browsers
     */
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        // Set theme color based on current theme
        const themeColor = theme === this.THEMES.LIGHT ? '#FFFFFF' : '#171023';
        metaThemeColor.content = themeColor;
    }

    /**
     * Get theme colors for current theme
     */
    getThemeColors() {
        const isDark = this.isDarkMode();
        
        return {
            primary: '#8A42DB',
            secondary: '#7DFFAF',
            background: isDark ? '#171023' : '#FFFFFF',
            surface: isDark ? '#2C243B' : '#F8F9FA',
            text: isDark ? '#F5F6F6' : '#212529',
            textSecondary: isDark ? '#CDD0D4' : '#495057'
        };
    }

    /**
     * Add theme change listener
     */
    onThemeChange(callback) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme');
                    callback(newTheme);
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return observer;
    }

    /**
     * Check if user prefers dark mode (system preference)
     */
    getUserPrefersDark() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    /**
     * Set theme based on system preference
     */
    useSystemPreference() {
        const prefersDark = this.getUserPrefersDark();
        const systemTheme = prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT;
        this.setTheme(systemTheme);
        return systemTheme;
    }
}

// Create singleton instance
const themeService = new ThemeService();

export default themeService;