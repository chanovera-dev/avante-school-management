import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';

// Detección de navegador Chromium para squircle y corner-shape
const ua = navigator.userAgent.toLowerCase();
const isChromium =
  (Boolean((window as any).chrome) || /crios/i.test(ua)) &&
  /chrome|crios|crmo|edg|brave|opera|opr|vivaldi/i.test(ua);

if (isChromium && typeof document !== 'undefined') {
  document.documentElement.classList.add('is-chromium');
  document.body.classList.add('is-chromium');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
