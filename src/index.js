import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { FilesProvider } from './context/FilesProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FilesProvider>
        <App />
      </FilesProvider>
    </AuthProvider>
  </React.StrictMode>
);