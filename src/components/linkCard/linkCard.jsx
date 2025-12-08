import './linkCard.css'

function LinkCard({ logo, linkName, link }) {
    const isInternal = link.startsWith('/')

    const content = (
        <div className='link-card'>
            {logo && <img src={logo} alt={linkName}></img>}
            <div className='link-name'>{linkName}</div>
        </div>
    )

    if (isInternal) {
        return (
            <a href={link}>
                {content}
            </a>
        )
    }

    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    )
}

export default LinkCard
