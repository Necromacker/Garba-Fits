import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/style-base.css';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/rent';
  
  // Initial activeTab determined by URL
  const [activeTab, setActiveTab] = useState(
    typeof window !== 'undefined' && window.location.pathname === '/rent' ? 'rent' : 'home'
  );
  const [requestedNav, setRequestedNav] = useState(null);

  const handleNavClick = (tab) => {
    if (location.pathname !== '/' && location.pathname !== '/rent') {
      navigate('/');
    }
    setRequestedNav({ tab, timestamp: Date.now() });
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} onNavClick={handleNavClick} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                activeTab={activeTab}
                onActiveTabChange={setActiveTab}
                requestedNav={requestedNav}
              />
            }
          />
          <Route
            path="/rent"
            element={
              <Home
                activeTab={activeTab}
                onActiveTabChange={setActiveTab}
                requestedNav={requestedNav}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <Home
                activeTab={activeTab}
                onActiveTabChange={setActiveTab}
                requestedNav={requestedNav}
              />
            }
          />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
