import { useState, useEffect } from 'react'
import { getUserData } from '../../../services/authService.js'
import { authConfig } from '../../../config.js'
import { useTheme } from '../../providers/ThemeProvider.jsx'
import MiSitamco from './MiSitamco.jsx'
import Directiva from './Directiva.jsx'
import Administracion from './Administracion.jsx'
import './PrivateSite.css'

/**
 * PrivateSite component that manages role-based access to different authenticated sections
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @returns {JSX.Element} PrivateSite JSX element
 */
function PrivateSite({ onLogout, navigateTo, currentPage, isAuthenticated }) {
  const [currentSection, setCurrentSection] = useState('mi-sitamco')
  const [userRole, setUserRole] = useState('member') // member, director, administrator
  const [loading, setLoading] = useState(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem(authConfig.tokenKey)
        if (!token) {
          onLogout()
          return
        }

        const result = await getUserData(token)
        if (result.success && result.user) {
          // Determine user role based on user data
          // This logic should match your backend role system
          const role = determineUserRole(result.user)
          setUserRole(role)
          
          // Set default section based on role
          const defaultSection = getDefaultSectionForRole(role)
          setCurrentSection(defaultSection)
        } else {
          onLogout()
        }
      } catch (error) {
        if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
          onLogout()
          return
        }
        // For now, default to member if we can't determine role
        setUserRole('member')
        setCurrentSection('mi-sitamco')
      } finally {
        setLoading(false)
      }
    }

    fetchUserRole()
  }, [onLogout])

  // Determine user role based on user data
  const determineUserRole = (userData) => {
    // Check if roles is an array and contains the role names
    if (userData.roles && Array.isArray(userData.roles)) {
      if (userData.roles.includes('Administrator')) {
        return 'administrator'
      } else if (userData.roles.includes('Director')) {
        return 'director'
      } else if (userData.roles.includes('Member')) {
        return 'member'
      }
    }
    // Fallback to default member role
    return 'member'
  }

  // Get default section based on user role
  const getDefaultSectionForRole = (role) => {
    switch (role) {
      case 'administrator':
        return 'administracion'
      case 'director':
        return 'directiva'
      default:
        return 'mi-sitamco'
    }
  }

  const renderTopMenu = () => {
    return (
      <div className="private-site-header">
        <div className="header-left">
          <button 
            onClick={() => navigateTo('somos')} 
            className="logo-button"
          >
            <img 
              src={theme === 'dark' ? "/src/assets/images/logos/sitamco_sm_white.png" : "/src/assets/images/logos/sitamco_sm.png"} 
              alt="SITAMCO" 
              width="120" 
              height="32" 
            />
          </button>
        </div>

        <div className="header-center">
          <div className="nav-tabs-container">
            <button 
              className={`nav-tab ${currentSection === 'mi-sitamco' ? 'active' : ''}`}
              onClick={() => setCurrentSection('mi-sitamco')}
            >
              Mi Sitamco
            </button>
            {(userRole === 'director' || userRole === 'administrator') && (
              <button 
                className={`nav-tab ${currentSection === 'directiva' ? 'active' : ''}`}
                onClick={() => setCurrentSection('directiva')}
              >
                Directiva
              </button>
            )}
            {userRole === 'administrator' && (
              <button 
                className={`nav-tab ${currentSection === 'administracion' ? 'active' : ''}`}
                onClick={() => setCurrentSection('administracion')}
              >
                Administración
              </button>
            )}
          </div>
        </div>

        <div className="header-right">
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className="user-menu">
            <button 
              className="dropdown-btn" 
              type="button" 
              id="userDropdown" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
            >
              ▼
            </button>
            <div className="dropdown-menu" aria-labelledby="userDropdown">
              <button 
                className="dropdown-item" 
                onClick={() => navigateTo('somos')}
              >
                Home
              </button>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item logout-item" 
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentSection = () => {
    const commonProps = {
      onLogout,
      navigateTo,
      currentPage,
      isAuthenticated
    }

    switch (currentSection) {
      case 'mi-sitamco':
        return <MiSitamco {...commonProps} />
      case 'directiva':
        return userRole === 'director' || userRole === 'administrator' 
          ? <Directiva {...commonProps} />
          : <MiSitamco {...commonProps} />
      case 'administracion':
        return userRole === 'administrator' 
          ? <Administracion {...commonProps} />
          : <MiSitamco {...commonProps} />
      default:
        return <MiSitamco {...commonProps} />
    }
  }

  if (loading) {
    return (
      <div className="private-site-loading">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
          <p className="mt-2">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="private-site">
      {renderTopMenu()}
      <div className="private-site-content">
        {renderCurrentSection()}
      </div>
    </div>
  )
}

export default PrivateSite