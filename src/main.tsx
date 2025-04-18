import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProjectsProvider } from './projects/ProjectsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
