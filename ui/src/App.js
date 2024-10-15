import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UploadPage from './components/UploadPage';
import HomePage from './components/HomePage';
import PDFChat from './components/PDFChat';
import PDFSummary from './components/PDFSummary';
import QuizPage from './components/QuizPage';


function App() {
  const [user, setUser] = useState(null); // Initial state for user

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUser} />} />
        <Route path="/upload" element={<UploadPage user={user} />} />
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/summary" element={<PDFSummary />} />
        <Route path="/chat" element={<PDFChat />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
