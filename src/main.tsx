import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'

<<<<<<< HEAD
=======

>>>>>>> tejas
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
<<<<<<< HEAD
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
=======
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
>>>>>>> tejas
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
