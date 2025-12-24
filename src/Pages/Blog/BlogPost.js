import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BlogService from "../../services/BlogService";
import AnalyticsService from "../../services/AnalyticsService";
import "./blog.css";

export default function BlogPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);

    const loadBlogPost = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Load the specific post
            const postResult = BlogService.getPostById(id);
            if (!postResult.success) {
                setError(postResult.error || 'Post not found');
                return;
            }

            const currentPost = postResult.data;
            
            // Check if post is published
            if (!currentPost.published) {
                setError('This post is not available');
                return;
            }

            setPost(currentPost);

            // Track page view
            try {
                AnalyticsService.trackPageView('Blog Post', `/My_Portfolio/blog/${id}`);
            } catch (error) {
                console.warn('Analytics tracking failed:', error);
            }

            // Load related posts from the same category
            const relatedResult = BlogService.getPostsByCategory(currentPost.category);
            if (relatedResult.success) {
                const filtered = relatedResult.data
                    .filter(p => p.id !== currentPost.id)
                    .slice(0, 3);
                setRelatedPosts(filtered);
            }
        } catch (err) {
            setError('Failed to load blog post');
            console.error('Blog post loading error:', err);
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        if (id) {
            loadBlogPost();
        }
    }, [id, loadBlogPost]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatContent = (content) => {
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="post__paragraph">
                {paragraph}
            </p>
        ));
    };

    if (loading) {
        return (
            <div className="blog">
                <div className="blog__container">
                    <div className="post__loading">Loading post...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blog">
                <div className="blog__container">
                    <div className="post__error">
                        <h2>Post Not Found</h2>
                        <p>{error}</p>
                        <div className="error__actions">
                            <Link to="/My_Portfolio/blog" className="btn btn__primary">
                                ← Back to Blog
                            </Link>
                            <button onClick={() => navigate(-1)} className="btn btn__secondary">
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog">
                <div className="blog__container">
                    <div className="post__error">
                        <h2>Post Not Found</h2>
                        <p>The blog post you're looking for doesn't exist.</p>
                        <Link to="/My_Portfolio/blog" className="btn btn__primary">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="blog">
            <div className="blog__container">
                {/* Navigation */}
                <nav className="post__nav">
                    <Link to="/My_Portfolio/blog" className="back__link">
                        ← Back to Blog
                    </Link>
                </nav>

                {/* Post Header */}
                <header className="post__header">
                    {post.featured && (
                        <div className="featured__badge">Featured Post</div>
                    )}
                    
                    <div className="post__meta">
                        <span className="post__category">{post.category}</span>
                        <span className="post__date">{formatDate(post.createdAt)}</span>
                        <span className="post__read-time">{post.readTime}</span>
                    </div>
                    
                    <h1 className="post__title">{post.title}</h1>
                    <p className="post__summary">{post.summary}</p>
                    
                    <div className="post__author">
                        <span>By {post.author}</span>
                        {post.updatedAt !== post.createdAt && (
                            <span className="post__updated">
                                • Updated {formatDate(post.updatedAt)}
                            </span>
                        )}
                    </div>
                </header>

                {/* Post Image */}
                {post.image && (
                    <div className="post__hero-image">
                        <img src={post.image} alt={post.title} />
                    </div>
                )}

                {/* Post Content */}
                <article className="post__article">
                    <div className="post__content">
                        {formatContent(post.content)}
                    </div>
                </article>

                {/* Post Footer */}
                <footer className="post__footer">
                    <div className="post__tags">
                        <h4>Tags:</h4>
                        <div className="tags__list">
                            {post.tags.map(tag => (
                                <span key={tag} className="post__tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </footer>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="related__posts">
                        <h3>Related Posts</h3>
                        <div className="related__grid">
                            {relatedPosts.map(relatedPost => (
                                <article key={relatedPost.id} className="related__card">
                                    {relatedPost.image && (
                                        <div className="related__image">
                                            <img src={relatedPost.image} alt={relatedPost.title} />
                                        </div>
                                    )}
                                    <div className="related__content">
                                        <div className="related__meta">
                                            <span className="related__category">{relatedPost.category}</span>
                                            <span className="related__read-time">{relatedPost.readTime}</span>
                                        </div>
                                        <h4 className="related__title">
                                            <Link to={`/My_Portfolio/blog/${relatedPost.id}`}>
                                                {relatedPost.title}
                                            </Link>
                                        </h4>
                                        <p className="related__summary">
                                            {relatedPost.summary.substring(0, 100)}...
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Navigation to next/previous */}
                <nav className="post__pagination">
                    <Link to="/My_Portfolio/blog" className="btn btn__primary">
                        ← View All Posts
                    </Link>
                </nav>
            </div>
        </div>
    );
}