import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#2D1A00',
          color: '#FFF8F0',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
          borderRadius: '12px',
          border: '1px solid rgba(244,166,27,0.3)',
        },
      }}
    />
  </React.StrictMode>
)
