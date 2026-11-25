import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import imageTiles from './imageTile';

function formatTitle(title) {
  return title.replace(/_/g, ' ');
}

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const searchOptions = useMemo(() => {
    const normalizedQuery = query.trim().replace(/_/g, ' ').toLowerCase();
    if (!normalizedQuery) return imageTiles;

    return imageTiles.filter((image) =>
      formatTitle(image.title).toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleSearch = (title) => {
    navigate('/file-viewer', { state: { query: title } });
  };

  return (
    <div className="page-content search-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>Find your next story.</h1>
          <p className="page-intro">
            Search the prasanga archive and open its text, story, or performance links.
          </p>
        </div>
        <Link className="back-link" to="/">Back to home</Link>
      </div>

      <label className="search-field">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <span className="visually-hidden">Search prasangas</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try a title, such as Abhimanyu or Draupadi"
        />
        {query && (
          <button className="clear-search" type="button" onClick={() => setQuery('')}>
            Clear
          </button>
        )}
      </label>

      <div className="results-heading">
        <h2>{query ? 'Search results' : 'All prasangas'}</h2>
        <span>{searchOptions.length} {searchOptions.length === 1 ? 'story' : 'stories'}</span>
      </div>

      {searchOptions.length > 0 ? (
        <div className="prasanga-grid">
          {searchOptions.map((image, index) => (
            <button
              className="prasanga-card"
              key={image.title}
              type="button"
              onClick={() => handleSearch(image.title)}
            >
              <span className="card-image-wrap">
                <img src={image.path} alt="" loading={index > 5 ? 'lazy' : 'eager'} />
                <span className="card-open" aria-hidden="true">&nearr;</span>
              </span>
              <span className="card-meta">PRASANGA <span> / </span> {String(index + 1).padStart(2, '0')}</span>
              <span className="card-title">{formatTitle(image.title)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-state-mark" aria-hidden="true">?</span>
          <h2>No prasangas found</h2>
          <p>Try a shorter search or check the spelling.</p>
          <button className="button button-secondary" type="button" onClick={() => setQuery('')}>
            Show all prasangas
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
