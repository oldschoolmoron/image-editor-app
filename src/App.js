import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './Components/SearchPage';
import EditorPage from './Components/EditorPage';
import UploadPage from './Components/UploadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/edit" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
