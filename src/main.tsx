import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Fonts are served from this site (bundled, cached, no request to Google), and each file loads
// only when a page uses characters from it.
import '@fontsource-variable/figtree/wght.css';
import '@fontsource/fragment-mono/latin-400.css';
import '@fontsource/merriweather/latin-400.css';
import '@fontsource/merriweather/latin-400-italic.css';
import '@fontsource/merriweather/latin-700.css';
import '@fontsource/merriweather/latin-700-italic.css';
import '@fontsource/merriweather/latin-900.css';
import '@fontsource/merriweather/latin-ext-400.css';
import '@fontsource/merriweather/latin-ext-700.css';
import '@fontsource/noto-serif-bengali/bengali-500.css';
import '@fontsource/noto-serif-bengali/bengali-600.css';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
