import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { IssuesProvider } from './contexts/IssuesContext.jsx'
import Navbar from './components/Menu.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
        <IssuesProvider>
            {/* <Navbar /> */}
            <App />
        </IssuesProvider>
    </AuthProvider>

)
