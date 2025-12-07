import { Link } from 'react-router-dom'
import PostCard from '../components/post/PostCard'
import posts from '../data/posts'
import './Posts.css'

function Posts() {
    return (
        <div className="posts-container">
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ← Voltar
                </Link>
            </div>

            <div className="posts-list">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        subtitle={post.subtitle}
                        text={post.text}
                        image={post.image}
                        link={post.link}
                    />
                ))}
            </div>
        </div>
    )
}

export default Posts
