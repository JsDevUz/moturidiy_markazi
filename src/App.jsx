import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AudioPlayerBar from './components/AudioPlayerBar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import Reader from './pages/Reader';
import Quiz from './pages/Quiz';
import Hikmatlar from './pages/Hikmatlar';
import About from './pages/About';
import Consult from './pages/Consult';
import { getBookById } from './data/db';

function MainApp() {
  const [activePage, setActivePage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeAudioBook, setActiveAudioBook] = useState(null);
  const [catalogFilters, setCatalogFilters] = useState({
    search: '',
    section: 'all',
    onlyAudio: false
  });

  // Saved books list in localStorage
  const [savedBookIds, setSavedBookIds] = useState(() => {
    try {
      const saved = localStorage.getItem('moturidiy_saved_books');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('moturidiy_saved_books', JSON.stringify(savedBookIds));
  }, [savedBookIds]);

  const toggleSaveBook = (bookId) => {
    setSavedBookIds((prev) => 
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const handleNavigate = (page, params = {}) => {
    if (params.search !== undefined || params.section !== undefined || params.onlyAudio !== undefined) {
      setCatalogFilters({
        search: params.search || '',
        section: params.section || 'all',
        onlyAudio: !!params.onlyAudio
      });
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadBook = (book) => {
    setSelectedBook(book);
    setActivePage('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleListenBook = (book) => {
    setActiveAudioBook(book);
  };

  const handleSelectSection = (sectionId) => {
    setCatalogFilters({ search: '', section: sectionId, onlyAudio: false });
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* If Reader is active, render full-screen clean e-reader mode without standard navbar/footer */}
      {activePage === 'reader' && selectedBook ? (
        <Reader
          book={selectedBook}
          onBack={() => setActivePage('detail')}
        />
      ) : (
        <>
          {/* Main Top Navigation */}
          <Navbar 
            activePage={activePage} 
            setActivePage={(p) => {
              if (p === 'audiobooks') {
                setCatalogFilters({ search: '', section: 'all', onlyAudio: true });
                setActivePage('catalog');
              } else if (p === 'sections') {
                setActivePage('home');
                setTimeout(() => {
                  window.scrollTo({ top: 900, behavior: 'smooth' });
                }, 100);
              } else {
                setActivePage(p);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />

          {/* Page Routing Views */}
          <main className="flex-1 pb-16">
            {activePage === 'home' && (
              <Home 
                onNavigate={handleNavigate}
                onSelectBook={handleSelectBook}
                onReadBook={handleReadBook}
                onListenBook={handleListenBook}
                onSelectSection={handleSelectSection}
                savedBookIds={savedBookIds}
                onToggleSaveBook={toggleSaveBook}
              />
            )}

            {activePage === 'catalog' && (
              <Catalog
                initialSearch={catalogFilters.search}
                initialSection={catalogFilters.section}
                onlyAudio={catalogFilters.onlyAudio}
                onSelectBook={handleSelectBook}
                onReadBook={handleReadBook}
                onListenBook={handleListenBook}
                savedBookIds={savedBookIds}
                onToggleSaveBook={toggleSaveBook}
              />
            )}

            {activePage === 'detail' && selectedBook && (
              <BookDetail
                book={selectedBook}
                onBack={() => setActivePage('catalog')}
                onRead={handleReadBook}
                onListen={handleListenBook}
                onSelectBook={handleSelectBook}
                isSaved={savedBookIds.includes(selectedBook.id)}
                onToggleSave={toggleSaveBook}
              />
            )}

            {activePage === 'quiz' && (
              <Quiz onNavigate={handleNavigate} />
            )}

            {activePage === 'hikmatlar' && (
              <Hikmatlar />
            )}

            {activePage === 'about' && (
              <About />
            )}

            {activePage === 'consult' && (
              <Consult />
            )}
          </main>

          {/* Global Sticky Audiobook Player */}
          {activeAudioBook && (
            <AudioPlayerBar 
              currentBook={activeAudioBook}
              onClose={() => setActiveAudioBook(null)}
              onOpenDetail={(b) => handleSelectBook(b)}
            />
          )}

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />
        </>
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </LanguageProvider>
  );
}
