import { MotionConfig } from 'motion/react';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ChatLauncher } from '@/components/Chat/ChatLauncher';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { SearchDialog } from '@/components/SearchBar/SearchDialog';
import { ErrorBoundary, IntroLoader, PageSkeleton, Toaster } from '@/components/ui/Feedback';
import { useThemeSync } from '@/hooks/useTheme';
import Home from '@/pages/Home';

// Every route except the landing page is its own chunk.
const ExplorerPage = lazy(() => import('@/pages/Explorer'));
const MapPage = lazy(() => import('@/pages/Map'));
const ThemesPage = lazy(() => import('@/pages/Themes'));
const FavoritesPage = lazy(() => import('@/pages/Favorites'));
const PandalDetail = lazy(() => import('@/pages/PandalDetail'));
const StationDetail = lazy(() => import('@/pages/StationDetail'));
const About = lazy(() => import('@/pages/About'));
const FeedbackPage = lazy(() => import('@/pages/Feedback'));
const NotFound = lazy(() => import('@/pages/About').then((m) => ({ default: m.NotFound })));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function Shell() {
  useThemeSync();
  const { pathname } = useLocation();
  const fullBleed = pathname === '/map';

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<ExplorerPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/themes" element={<ThemesPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/pandal/:id" element={<PandalDetail />} />
              <Route path="/station/:id" element={<StationDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!fullBleed && <Footer />}
      <ChatLauncher />
      <SearchDialog />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <IntroLoader />
        <Shell />
      </BrowserRouter>
    </MotionConfig>
  );
}
