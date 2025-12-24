/**
 * Blog Management Service
 * Handles CRUD operations for blog posts
 */

class BlogService {
    constructor() {
        this.STORAGE_KEY = 'portfolio-blog-posts';
        this.init();
    }

    /**
     * Initialize service and create sample data if needed
     */
    init() {
        try {
            const existingPosts = this.getAllPosts();
            if (!existingPosts.success || existingPosts.data.length === 0) {
                this.createSamplePosts();
            }
        } catch (error) {
            console.error('BlogService initialization failed:', error);
            this.createSamplePosts();
        }
    }

    /**
     * Create sample blog posts
     */
    createSamplePosts() {
        const samplePosts = [
            {
                id: Date.now(),
                title: "Getting Started with React Development",
                summary: "A comprehensive guide to building modern web applications with React, covering components, hooks, and best practices.",
                content: "React has revolutionized the way we build user interfaces...",
                author: "Nanji Lakan",
                category: "Development",
                tags: ["React", "JavaScript", "Web Development"],
                image: "/images/react-blog.jpg",
                published: true,
                featured: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                readTime: "5 min read"
            },
            {
                id: Date.now() + 1,
                title: "Modern CSS Techniques",
                summary: "Explore advanced CSS features like Grid, Flexbox, and custom properties to create stunning layouts.",
                content: "CSS has evolved tremendously over the years...",
                author: "Nanji Lakan",
                category: "Design",
                tags: ["CSS", "Frontend", "Design"],
                image: "/images/css-blog.jpg",
                published: true,
                featured: false,
                createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                updatedAt: new Date(Date.now() - 86400000).toISOString(),
                readTime: "7 min read"
            },
            {
                id: Date.now() + 2,
                title: "Building Responsive Web Applications",
                summary: "Learn how to create applications that work seamlessly across all devices and screen sizes.",
                content: "Responsive design is no longer optional in today's web...",
                author: "Nanji Lakan",
                category: "Development",
                tags: ["Responsive", "CSS", "Mobile"],
                image: "/images/responsive-blog.jpg",
                published: false,
                featured: false,
                createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                updatedAt: new Date(Date.now() - 172800000).toISOString(),
                readTime: "6 min read"
            }
        ];

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(samplePosts));
    }

    /**
     * Get all blog posts
     */
    getAllPosts() {
        try {
            const posts = localStorage.getItem(this.STORAGE_KEY);
            const data = posts ? JSON.parse(posts) : [];
            
            return {
                success: true,
                data: data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                count: data.length
            };
        } catch (error) {
            console.error('Error getting blog posts:', error);
            return {
                success: false,
                error: 'Failed to retrieve blog posts',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Get published blog posts only
     */
    getPublishedPosts() {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const publishedPosts = allPosts.data.filter(post => post.published);
            
            return {
                success: true,
                data: publishedPosts,
                count: publishedPosts.length
            };
        } catch (error) {
            console.error('Error getting published posts:', error);
            return {
                success: false,
                error: 'Failed to retrieve published posts',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Get featured blog posts
     */
    getFeaturedPosts() {
        try {
            const publishedPosts = this.getPublishedPosts();
            if (!publishedPosts.success) return publishedPosts;

            const featuredPosts = publishedPosts.data.filter(post => post.featured);
            
            return {
                success: true,
                data: featuredPosts,
                count: featuredPosts.length
            };
        } catch (error) {
            console.error('Error getting featured posts:', error);
            return {
                success: false,
                error: 'Failed to retrieve featured posts',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Get blog post by ID
     */
    getPostById(id) {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const post = allPosts.data.find(p => p.id.toString() === id.toString());
            
            if (!post) {
                return {
                    success: false,
                    error: 'Blog post not found'
                };
            }

            return {
                success: true,
                data: post
            };
        } catch (error) {
            console.error('Error getting blog post by ID:', error);
            return {
                success: false,
                error: 'Failed to retrieve blog post'
            };
        }
    }

    /**
     * Create new blog post
     */
    createPost(postData) {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const newPost = {
                id: Date.now(),
                title: postData.title || 'Untitled Post',
                summary: postData.summary || '',
                content: postData.content || '',
                author: postData.author || 'Nanji Lakan',
                category: postData.category || 'General',
                tags: Array.isArray(postData.tags) ? postData.tags : [],
                image: postData.image || '',
                published: postData.published || false,
                featured: postData.featured || false,
                readTime: postData.readTime || this.calculateReadTime(postData.content || ''),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const updatedPosts = [newPost, ...allPosts.data];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedPosts));

            return {
                success: true,
                data: newPost,
                message: 'Blog post created successfully'
            };
        } catch (error) {
            console.error('Error creating blog post:', error);
            return {
                success: false,
                error: 'Failed to create blog post'
            };
        }
    }

    /**
     * Update existing blog post
     */
    updatePost(id, updateData) {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const postIndex = allPosts.data.findIndex(p => p.id.toString() === id.toString());
            
            if (postIndex === -1) {
                return {
                    success: false,
                    error: 'Blog post not found'
                };
            }

            const existingPost = allPosts.data[postIndex];
            const updatedPost = {
                ...existingPost,
                ...updateData,
                id: existingPost.id, // Ensure ID doesn't change
                createdAt: existingPost.createdAt, // Preserve creation date
                updatedAt: new Date().toISOString(),
                readTime: updateData.content ? this.calculateReadTime(updateData.content) : existingPost.readTime
            };

            allPosts.data[postIndex] = updatedPost;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allPosts.data));

            return {
                success: true,
                data: updatedPost,
                message: 'Blog post updated successfully'
            };
        } catch (error) {
            console.error('Error updating blog post:', error);
            return {
                success: false,
                error: 'Failed to update blog post'
            };
        }
    }

    /**
     * Delete blog post
     */
    deletePost(id) {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const postIndex = allPosts.data.findIndex(p => p.id.toString() === id.toString());
            
            if (postIndex === -1) {
                return {
                    success: false,
                    error: 'Blog post not found'
                };
            }

            const deletedPost = allPosts.data[postIndex];
            allPosts.data.splice(postIndex, 1);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allPosts.data));

            return {
                success: true,
                data: deletedPost,
                message: 'Blog post deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting blog post:', error);
            return {
                success: false,
                error: 'Failed to delete blog post'
            };
        }
    }

    /**
     * Get posts by category
     */
    getPostsByCategory(category) {
        try {
            const publishedPosts = this.getPublishedPosts();
            if (!publishedPosts.success) return publishedPosts;

            const categoryPosts = publishedPosts.data.filter(
                post => post.category.toLowerCase() === category.toLowerCase()
            );
            
            return {
                success: true,
                data: categoryPosts,
                count: categoryPosts.length
            };
        } catch (error) {
            console.error('Error getting posts by category:', error);
            return {
                success: false,
                error: 'Failed to retrieve posts by category',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Search posts by title, summary, or content
     */
    searchPosts(query) {
        try {
            const publishedPosts = this.getPublishedPosts();
            if (!publishedPosts.success) return publishedPosts;

            const searchTerm = query.toLowerCase();
            const matchingPosts = publishedPosts.data.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.summary.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            
            return {
                success: true,
                data: matchingPosts,
                count: matchingPosts.length
            };
        } catch (error) {
            console.error('Error searching posts:', error);
            return {
                success: false,
                error: 'Failed to search posts',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Get all unique categories
     */
    getCategories() {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const categories = [...new Set(allPosts.data.map(post => post.category))];
            
            return {
                success: true,
                data: categories.sort(),
                count: categories.length
            };
        } catch (error) {
            console.error('Error getting categories:', error);
            return {
                success: false,
                error: 'Failed to retrieve categories',
                data: [],
                count: 0
            };
        }
    }

    /**
     * Calculate estimated read time based on content length
     */
    calculateReadTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        return `${readTime} min read`;
    }

    /**
     * Get blog analytics
     */
    getAnalytics() {
        try {
            const allPosts = this.getAllPosts();
            if (!allPosts.success) return allPosts;

            const analytics = {
                totalPosts: allPosts.data.length,
                publishedPosts: allPosts.data.filter(p => p.published).length,
                draftPosts: allPosts.data.filter(p => !p.published).length,
                featuredPosts: allPosts.data.filter(p => p.featured).length,
                categoriesCount: [...new Set(allPosts.data.map(p => p.category))].length,
                recentPosts: allPosts.data.slice(0, 5)
            };

            return {
                success: true,
                data: analytics
            };
        } catch (error) {
            console.error('Error getting blog analytics:', error);
            return {
                success: false,
                error: 'Failed to retrieve blog analytics'
            };
        }
    }
}

// Create singleton instance
const blogService = new BlogService();

export default blogService;