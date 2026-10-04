import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import Reader from './pages/Reader';
import Quiz from './pages/Quiz';
import Hikmatlar from './pages/Hikmatlar';
import About from './pages/About';
import Consult from './pages/Consult';

function MainApp() {
  const [activePage, setActivePage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [catalogFilters, setCatalogFilters] = useState({
    search: '',
    section: '',
    access: ''
  });
  const [navClosed, setNavClosed] = useState(false);

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
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
    const toastEl = document.getElementById('toast');
    if (toastEl) {
      toastEl.textContent = savedBookIds.includes(bookId) ? 'O‘chirildi' : 'Saqlandi';
      toastEl.classList.add('is-on');
      setTimeout(() => toastEl.classList.remove('is-on'), 2000);
    }
  };

  const toggleNav = () => {
    setNavClosed((prev) => !prev);
    document.body.classList.toggle('nav-closed');
  };

  const handleNavigate = (page, params = {}) => {
    if (params.search !== undefined || params.section !== undefined || params.access !== undefined) {
      setCatalogFilters({
        search: params.search || '',
        section: params.section || '',
        access: params.access || ''
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
    setSelectedBook(book);
    setActivePage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (sectionId) => {
    setCatalogFilters({ search: '', section: sectionId, access: '' });
    setActivePage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If in Reader view, render standalone e-reader without standard topbar/sidebar
  if (activePage === 'reader' && selectedBook) {
    return (
      <Reader
        book={selectedBook}
        onBack={() => setActivePage('detail')}
      />
    );
  }

  return (
    <>
      {/* 1:1 Original Topbar */}
      <Topbar
        onToggleNav={toggleNav}
        onNavigate={handleNavigate}
        onSearch={(q) => handleNavigate('catalog', { search: q })}
        activePage={activePage}
      />

      <div
        className="nav-scrim"
        id="navScrim"
        hidden={!navClosed}
        onClick={toggleNav}
      />

      {/* 1:1 Shell Layout */}
      <div className="shell">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          onSelectSection={handleSelectSection}
          savedCount={savedBookIds.length}
        />

        <main className="main">
          {activePage === 'home' && (
            <Home
              onNavigate={handleNavigate}
              onSelectBook={handleSelectBook}
              onSelectSection={handleSelectSection}
            />
          )}

          {activePage === 'catalog' && (
            <Catalog
              initialSearch={catalogFilters.search}
              initialSection={catalogFilters.section}
              initialAccess={catalogFilters.access}
              onSelectBook={handleSelectBook}
            />
          )}

          {activePage === 'saved' && (
            <Catalog
              initialSearch=""
              initialSection=""
              initialAccess=""
              onSelectBook={handleSelectBook}
            />
          )}

          {activePage === 'detail' && selectedBook && (
            <BookDetail
              book={selectedBook}
              onBack={() => setActivePage('catalog')}
              onRead={handleReadBook}
              onListen={handleListenBook}
              onQuiz={() => setActivePage('quiz')}
              onSelectBook={handleSelectBook}
              onSelectSection={handleSelectSection}
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
            <About
              onNavigate={handleNavigate}
              onSelectSection={handleSelectSection}
            />
          )}

          {activePage === 'consult' && (
            <Consult />
          )}

          {/* 1:1 Original Footer */}
          <Footer onNavigate={handleNavigate} />
        </main>
      </div>
    </>
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
