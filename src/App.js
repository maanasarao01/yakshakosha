import { BrowserRouter as Router, Link, NavLink, Route, Routes } from 'react-router-dom';
import Homepage from './homePage';
import Search from './page2';
import FileViewer from './page3';

function App() {
  return (
    <Router>
      <div className="site-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="YakshaKosha home">
            <span className="brand-mark" aria-hidden="true">Y</span>
            <span className="brand-name">YakshaKosha</span>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/search">Explore</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/file-viewer" element={<FileViewer />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>YakshaKosha</span>
          <span>A living archive of Yakshagana stories and resources</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
