import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './asserts/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
