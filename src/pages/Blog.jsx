import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="blog" className="projects in-view" style={{ marginTop: '100px' }}>
            <div className="container">
                <div className="section-header">
                    <span className="sub-title">Thoughts & Updates</span>
                    <h2>Blog</h2>
                </div>
                <div className="project-grid">
                    {posts.map(post => (
                        <div key={post.id} className="project-card">
                            <div className="project-info">
                                <span className="sub-title" style={{ fontSize: '0.7rem' }}>
                                    {new Date(post.date).toLocaleDateString()}
                                </span>
                                <h3 style={{ marginTop: '0.5rem' }}>{post.title}</h3>
                                <p>{post.content.substring(0, 100)}...</p>
                                <Link to={`/blog/${post.id}`} className="btn secondary" style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
