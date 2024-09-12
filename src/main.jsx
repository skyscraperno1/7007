import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './fonts.css'
import Cursor from './components/core/Cursor'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Cursor />
  </React.StrictMode>,
  // <>
  //   <App />
  //   <Cursor />
  // </>,
)
