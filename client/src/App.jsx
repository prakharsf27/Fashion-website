import React from 'react';
import { TryOnProvider, useTryOn } from './context/TryOnContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import OutfitModal from './components/OutfitModal';

import HomePage from './pages/HomePage';
import OutfitsPage from './pages/OutfitsPage';
import OutfitDetailPage from './pages/OutfitDetailPage';
import TryOnPage from './pages/TryOnPage';
import ResultsPage from './pages/ResultsPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';

function MainAppContent() {
  const { activeView } = useTryOn();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomePage />;
      case 'outfits':
        return <OutfitsPage />;
      case 'detail':
        return <OutfitDetailPage />;
      case 'tryon':
        return <TryOnPage />;
      case 'result':
        return <ResultsPage />;
      case 'admin':
        return <AdminPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-atelier-50 text-editorial-charcoal font-sans selection:bg-atelier-300 selection:text-atelier-950">
      <Navbar />
      <main className="flex-grow">
        {renderView()}
      </main>
      <Footer />

      {/* Global Modals & Notifications */}
      <OutfitModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <TryOnProvider>
      <MainAppContent />
    </TryOnProvider>
  );
}
