import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BrowseRequests from './pages/BrowseRequests';
import BrowseOffers from './pages/BrowseOffers';
import CreateRequest from './pages/CreateRequest';
import CreateOffer from './pages/CreateOffer';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Safety from './pages/Safety';
import RequestDetail from './pages/RequestDetail';
import OfferDetail from './pages/OfferDetail';
import Messages from './pages/Messages';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Header />
            <main style={{ minHeight: 'calc(100vh - 140px)' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/browse-requests" element={<BrowseRequests />} />
                <Route path="/browse-offers" element={<BrowseOffers />} />
                <Route path="/create-request" element={<CreateRequest />} />
                <Route path="/create-offer" element={<CreateOffer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/request/:id" element={<RequestDetail />} />
                <Route path="/offer/:id" element={<OfferDetail />} />
                <Route path="/messages" element={<Messages />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;