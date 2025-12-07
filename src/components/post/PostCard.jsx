import './postCard.css'

function PostCard({ title, subtitle, text, image, link }) {
    return (
        <div className="post-card">
            {image && <img src={image} alt={title} className="post-image" />}
            <div className="post-content">
                <h2 className="post-title">{title}</h2>
                {subtitle && <h3 className="post-subtitle">{subtitle}</h3>}
                <p className="post-text">{text}</p>
                {link && (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="post-link"
                    >
                        Read more / Watch
                    </a>
                )}
            </div>
        </div>
    )
}

export default PostCard
