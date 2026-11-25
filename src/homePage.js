import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import imageTiles from './imageTile';

const featuredPrasangas = imageTiles.slice(0, 3);

function formatTitle(title) {
  return title.replace(/_/g, ' ');
}

function getRecentlyViewedPrasanga() {
  const recentTitle = window.localStorage.getItem('yakshakosha.recent-prasanga');
  return imageTiles.find((image) => image.title === recentTitle) || null;
}

function HomePage() {
  const [recentlyViewed, setRecentlyViewed] = useState(getRecentlyViewedPrasanga);
  const heroImage = recentlyViewed || imageTiles[0];

  useEffect(() => {
    const refreshRecentlyViewed = () => setRecentlyViewed(getRecentlyViewedPrasanga());
    window.addEventListener('focus', refreshRecentlyViewed);
    window.addEventListener('storage', refreshRecentlyViewed);

    return () => {
      window.removeEventListener('focus', refreshRecentlyViewed);
      window.removeEventListener('storage', refreshRecentlyViewed);
    };
  }, []);

  return (
    <div className="page-content home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A living archive of Yakshagana</p>
          <h1>Stories that <em>take the stage.</em></h1>
          <p className="hero-description">
            Explore prasanga texts, stories, and performances from the rich
            tradition of Yakshagana - gathered in one place for artists,
            learners, and rasikas.
          </p>
          <Link className="button button-primary" to="/search">
            Explore the collection <span aria-hidden="true">&rarr;</span>
          </Link>
          <div className="archive-note">
            <span className="archive-note-mark" aria-hidden="true">Y</span>
            <span>Preserving stories. Inspiring the next performance.</span>
          </div>
        </div>
        <Link
          className="hero-art"
          to="/file-viewer"
          state={{ query: heroImage.title }}
          aria-label={`Open ${formatTitle(heroImage.title)} resources`}
        >
          <img src={heroImage.path} alt={`${formatTitle(heroImage.title)} Yakshagana artwork`} />
          <span className="hero-art-badge">
            <span className="badge-dot" aria-hidden="true" />
            {recentlyViewed ? 'Recently viewed' : 'Featured from the archive'}
          </span>
          <div className="hero-art-caption">
            <span className="caption-kicker">From the archive</span>
            <span>{formatTitle(heroImage.title)}</span>
            <span className="hero-art-action">Explore resources <span aria-hidden="true">&rarr;</span></span>
          </div>
          <span className="hero-art-seal" aria-hidden="true">YK</span>
        </Link>
        <span className="hero-ornament hero-ornament-top" aria-hidden="true" />
        <span className="hero-ornament hero-ornament-bottom" aria-hidden="true" />
      </section>

      <section className="collection-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Begin your journey</p>
            <h2>Explore the archive</h2>
          </div>
          <Link className="text-link" to="/search">
            View all prasangas <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="featured-grid">
          {featuredPrasangas.map((prasanga, index) => (
            <Link
              className="featured-card"
              key={prasanga.title}
              to="/file-viewer"
              state={{ query: prasanga.title }}
            >
              <span className="featured-number">0{index + 1}</span>
              <img src={prasanga.path} alt="" />
              <span className="featured-title">{formatTitle(prasanga.title)}</span>
              <span className="featured-arrow" aria-hidden="true">&#8599;</span>
            </Link>
          ))}
        </div>
        <div className="archive-stats" aria-label="Archive highlights">
          <div><strong>{imageTiles.length}</strong><span>Prasanga artworks</span></div>
          <span className="stats-divider" />
          <div><strong>PDFs</strong><span>Texts and scripts</span></div>
          <span className="stats-divider" />
          <div><strong>Video</strong><span>Performances to explore</span></div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;