import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5001/api/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                setComments(data.comments || []);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5001/api/posts/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ author, text })
            });
            setAuthor('');
            setText('');
            // コメント一覧を再取得
            const res = await fetch(`http://localhost:5001/api/posts/${id}/comments`);
            const updatedComments = await res.json();
            setComments(updatedComments);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="about in-view" style={{ marginTop: '100px' }}>
            <div className="container">
                <Link to="/blog" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
                    ← Back to Blog
                </Link>
                {!post ? (
                    <div style={{ marginTop: '50px' }}>Loading...</div>
                ) : (
                    <>
                        <div className="section-header">
                            <span className="sub-title">{new Date(post.date).toLocaleDateString()}</span>
                            <h2>{post.title}</h2>
                        </div>
                        <div className="about-text" style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '5rem' }}>
                            {post.content}
                        </div>

                        <hr style={{ border: '0', borderTop: '1px solid var(--glass-border)', margin: '4rem 0' }} />

                        <div className="comments-section">
                            <h3>Comments ({comments.length})</h3>
                            <div style={{ margin: '2rem 0' }}>
                                {comments.map(comment => (
                                    <div key={comment.id} className="glass-card" style={{ padding: '2rem', textAlign: 'left', marginBottom: '1.5rem', borderRadius: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <strong style={{ color: 'var(--accent-primary)' }}>{comment.author}</strong>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(comment.date).toLocaleString()}</span>
                                        </div>
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="glass-card" style={{ padding: '3rem', borderRadius: '30px' }}>
                                <h4 style={{ marginBottom: '2rem' }}>Add a comment</h4>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        required
                                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '10px' }}
                                    />
                                    <textarea 
                                        placeholder="Your Comment" 
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        required
                                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '10px', minHeight: '150px' }}
                                    />
                                    <button type="submit" className="btn primary">Submit Comment</button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default BlogPost;
