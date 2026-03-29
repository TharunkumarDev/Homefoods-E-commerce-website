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
          background: 'var(--green-900)',
          color: 'var(--white)',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          borderRadius: '12px',
          border: '1px solid var(--lime-400)',
        },
      }}
    />
  </React.StrictMode>
)
