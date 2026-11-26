import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import videoLinks from './media.json';
import './App.css';

function FileViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query;
  const [activeResource, setActiveResource] = useState('pdf');
  const [pdfUrl, setPdfUrl] = useState('');
  const [story, setStory] = useState('');
  const [pdfStatus, setPdfStatus] = useState('loading');
  const [storyStatus, setStoryStatus] = useState('loading');

  useEffect(() => {
    if (!query) return undefined;

    window.localStorage.setItem('yakshakosha.recent-prasanga', query);
    const controller = new AbortController();
    const objectUrls = [];
    const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://yakshakosha-server-quqo.onrender.com';
    const params = new URLSearchParams({ query });

    async function loadPdf() {
      try {
        const response = await fetch(
          `${apiBaseUrl}/yakshagana/search/prasangaPrathi?${params}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('The prasanga PDF could not be found.');

        const objectUrl = URL.createObjectURL(await response.blob());
        objectUrls.push(objectUrl);
        setPdfUrl(objectUrl);
        setPdfStatus('ready');
      } catch {
        if (controller.signal.aborted) return;
        setPdfStatus('error');
      }
    }

    async function loadStory() {
      try {
        const response = await fetch(
          `${apiBaseUrl}/yakshagana/search/story?${params}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('The story text could not be found.');

        setStory(await response.text());
        setStoryStatus('ready');
      } catch {
        if (controller.signal.aborted) return;
        setStoryStatus('error');
      }
    }

    setPdfStatus('loading');
    setStoryStatus('loading');
    setPdfUrl('');
    setStory('');
    loadPdf();
    loadStory();

    return () => {
      controller.abort();
      objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
    };
  }, [query]);

  const videoLink = videoLinks.find(
    (link) => link.title.toLowerCase() === query?.toLowerCase()
  )?.link;

  if (!query) {
    return (
      <div className="page-content empty-state missing-query">
        <span className="empty-state-mark" aria-hidden="true">!</span>
        <h1>Choose a prasanga to explore</h1>
        <p>Open a story from the collection to view its resources.</p>
        <Link className="button button-primary" to="/search">Browse the collection</Link>
      </div>
    );
  }

  return (
    <div className="page-content resource-page">
      <Link className="back-link" to="/search">&larr; Back to the collection</Link>
      <div className="resource-heading">
        <p className="eyebrow">From the archive</p>
        <h1>{query.replace(/_/g, ' ')}</h1>
        <p>Prasanga resources, gathered for your next performance.</p>
      </div>

      <div className="resource-layout">
        <aside className="resource-sidebar">
          <p className="sidebar-label">Explore resources</p>
          <button
            className={`resource-tab ${activeResource === 'pdf' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setActiveResource('pdf')}
          >
            <span className="resource-tab-icon">01</span>
            <span><strong>Prasanga Prathi</strong><small>PDF document</small></span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <button
            className={`resource-tab ${activeResource === 'story' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setActiveResource('story')}
          >
            <span className="resource-tab-icon">02</span>
            <span><strong>Story &amp; Ranga nade</strong><small>Text resource</small></span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <button
            className={`resource-tab ${activeResource === 'video' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setActiveResource('video')}
          >
            <span className="resource-tab-icon">03</span>
            <span><strong>Watch a performance</strong><small>Video resource</small></span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <div className="sidebar-note">
            <span className="sidebar-note-mark" aria-hidden="true">Y</span>
            <p>Keep the tradition alive - learn, perform, and share.</p>
          </div>
        </aside>

        <section className="resource-panel" aria-live="polite">
          {activeResource === 'pdf' && (
            <>
              <div className="panel-heading">
                <div><p className="eyebrow">Document</p><h2>Prasanga Prathi</h2></div>
                {pdfUrl && <a className="text-link" href={pdfUrl} target="_blank" rel="noreferrer">Open in new tab &#8599;</a>}
              </div>
              {pdfStatus === 'loading' && <p className="resource-message">Loading the prasanga PDF...</p>}
              {pdfStatus === 'error' && <p className="resource-message resource-error">The PDF is unavailable. Please stay tuned while we update it soon.</p>}
              {pdfUrl && <iframe className="pdf-frame" title={`${query} prasanga PDF`} src={pdfUrl} />}
            </>
          )}
          {activeResource === 'story' && (
            <>
              <div className="panel-heading">
                <div><p className="eyebrow">Text resource</p><h2>Story &amp; Ranga nade</h2></div>
              </div>
              {storyStatus === 'loading' && <p className="resource-message">Loading the story...</p>}
              {storyStatus === 'error' && <p className="resource-message resource-error">The story text is unavailable currently. Please stay tuned until we update it soon.</p>}
              {storyStatus === 'ready' && <pre className="story-text">{story}</pre>}
            </>
          )}
          {activeResource === 'video' && (
            <>
              <div className="panel-heading">
                <div><p className="eyebrow">Performance</p><h2>Watch a performance</h2></div>
              </div>
              {videoLink ? (
                <div className="video-card">
                  <span className="play-mark" aria-hidden="true">&#9654;</span>
                  <h3>{query.replace(/_/g, ' ')}</h3>
                  <p>Open a performance video or playlist for this prasanga.</p>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => window.open(videoLink, '_blank', 'noopener,noreferrer')}
                  >
                    Watch on YouTube <span aria-hidden="true">&#8599;</span>
                  </button>
                </div>
              ) : (
                <p className="resource-message">No video is listed for this prasanga yet.</p>
              )}
            </>
          )}
        </section>
      </div>
      <button className="return-link" type="button" onClick={() => navigate('/search')}>
        Browse another prasanga
      </button>
    </div>
  );
}

export default FileViewer;
