import Homepage from "./homePage";
import Search from "./page2";
import FileViewer from "./page3";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/"></Link>
          <Link to="/search"></Link>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/file-viewer" element={<FileViewer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
