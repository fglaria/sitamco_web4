import { useState, useEffect } from 'react'
import Login from './components/ui/Login'
import PublicSite from './components/pages/public/PublicSite'
import MiSitamco from './components/pages/authenticated/MiSitamco'
import { logoutUser } from './services/authService.js'
import { authConfig } from './config.js'
import './App.css'

/**
 * Main App component that manages authentication state and routing
 * @returns {JSX.Element} App JSX element
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentPage, setCurrentPage] = useState('somos')
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    // Check if user is authenticated on component mount
    const authStatus = localStorage.getItem(authConfig.authKey)
    const isAuth = authStatus === 'true'
    setIsAuthenticated(isAuth)
    if (isAuth) {
      setCurrentPage('dashboard')
    }
  }, [])

  /**
   * Handles user logout by clearing authentication state and calling API
   */
  const handleLogout = async () => {
    const token = localStorage.getItem(authConfig.tokenKey)
    
    // Call logout API if token exists
    if (token) {
      try {
        await logoutUser(token)
      } catch (error) {
        console.error('Logout API call failed:', error)
      }
    }
    
    // Clear all authentication data
    localStorage.removeItem(authConfig.authKey)
    localStorage.removeItem(authConfig.tokenKey)
    localStorage.removeItem(authConfig.userKey)
    
    setIsAuthenticated(false)
    setCurrentPage('somos')
  }

  /**
   * Handles user login by setting authentication state
   */
  const handleLogin = () => {
    setIsAuthenticated(true)
    setShowLoginModal(false)
    setCurrentPage('dashboard')
  }

  /**
   * Handles page navigation
   */
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  /**
   * Shows the login modal
   */
  const showLogin = () => {
    setShowLoginModal(true)
  }

  /**
   * Hides the login modal
   */
  const hideLogin = () => {
    setShowLoginModal(false)
  }

  // Render the appropriate page based on authentication state
  const renderCurrentPage = () => {
    if (isAuthenticated && currentPage === 'dashboard') {
      return <MiSitamco onLogout={handleLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} />
    }
    
    return <PublicSite onLogout={handleLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={showLogin} />
  }

  // Always show main app content now
  return (
    <>
      {renderCurrentPage()}
      {showLoginModal && <Login onLogin={handleLogin} onClose={hideLogin} />}
    </>
  )
}

export default App
