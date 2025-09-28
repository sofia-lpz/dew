import { indexedSite } from "./interfaces";

export const siteCard = (site: indexedSite) => {
    // Format URL for display (remove protocol and trailing slash)
    const displayUrl = site.address
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '');

    return (
        <div className="search-result">
            <div className="result-url">
                <span className="url-breadcrumb">{displayUrl}</span>
            </div>
            <h3 className="result-title">
                <a href={site.address} target="_blank" rel="noopener noreferrer">
                    {site.title}
                </a>
            </h3>
            <p className="result-description">
                {site.description}
            </p>
        </div>
    );
};
