import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogService from "../../services/BlogService";
import AnalyticsService from "../../services/AnalyticsService";
import "./blog.css";

export default function BlogList() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Track page visit
        try {
            AnalyticsService.trackPageView('Blog', '/My_Portfolio/blog');
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }

        // Load blog posts and categories
        loadBlogData();
    }, []);

    useEffect(() => {
        // Filter posts based on category and search query
        let filtered = posts;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        if (searchQuery) {
            const searchResult = BlogService.searchPosts(searchQuery);
            if (searchResult.success) {
                filtered = searchResult.data;
            }
        }

        setFilteredPosts(filtered);
    }, [posts, selectedCategory, searchQuery]);

    const loadBlogData = async () => {
        try {
            setLoading(true);
            
            // Load published posts
            const postsResult = BlogService.getPublishedPosts();
            if (postsResult.success) {
                setPosts(postsResult.data);
                setFilteredPosts(postsResult.data);
            } else {
                setError(postsResult.error);
            }

            // Load categories
            const categoriesResult = BlogService.getCategories();
            if (categoriesResult.success) {
                setCategories(['All', ...categoriesResult.data]);
            }
        } catch (err) {
            setError('Failed to load blog data');
            console.error('Blog loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchQuery(''); // Clear search when filtering by category
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setSelectedCategory('All'); // Reset category when searching
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="blog">
                <div className="blog__container">
                    <div className="blog__loading">Loading blog posts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blog">
                <div className="blog__container">
                    <div className="blog__error">
                        <h2>Oops! Something went wrong</h2>
                        <p>{error}</p>
                        <button onClick={loadBlogData} className="retry__btn">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="blog">
            <div className="blog__container">
                {/* Header Section */}
                <div className="blog__header">
                    <h1>Blog</h1>
                    <p>Thoughts, insights, and experiences from my development journey</p>
                </div>

                {/* Search and Filter Section */}
                <div className="blog__controls">
                    <div className="blog__search">
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search__input"
                        />
                    </div>
                    <div className="blog__filters">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`filter__btn ${selectedCategory === category ? 'active' : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts Section */}
                <div className="blog__posts">
                    {filteredPosts.length === 0 ? (
                        <div className="no__posts">
                            <h3>No posts found</h3>
                            <p>
                                {searchQuery 
                                    ? `No posts match "${searchQuery}". Try a different search term.`
                                    : selectedCategory !== 'All' 
                                        ? `No posts found in "${selectedCategory}" category.`
                                        : 'No blog posts available yet. Check back soon!'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="posts__grid">
                            {filteredPosts.map(post => (
                                <article key={post.id} className="post__card">
                                    {post.featured && (
                                        <div className="featured__badge">Featured</div>
                                    )}
                                    
                                    {post.image && (
                                        <div className="post__image">
                                            <img src={post.image} alt={post.title} />
                                        </div>
                                    )}
                                    
                                    <div className="post__content">
                                        <div className="post__meta">
                                            <span className="post__category">{post.category}</span>
                                            <span className="post__date">{formatDate(post.createdAt)}</span>
                                            <span className="post__read-time">{post.readTime}</span>
                                        </div>
                                        
                                        <h2 className="post__title">
                                            <Link to={`/My_Portfolio/blog/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h2>
                                        
                                        <p className="post__summary">{post.summary}</p>
                                        
                                        <div className="post__footer">
                                            <div className="post__tags">
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="post__tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            <Link 
                                                to={`/My_Portfolio/blog/${post.id}`} 
                                                className="read__more"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}