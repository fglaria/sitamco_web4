import { useState, useEffect } from 'react'
import { getUserData } from '../../../services/authService.js'
import { authConfig } from '../../../config.js'
import { useTheme } from '../../../contexts/ThemeContext.jsx'
import LoadingSpinner from '../../ui/LoadingSpinner.jsx'
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
  const [selectedSubSection, setSelectedSubSection] = useState('')
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

  // Get lateral menu items based on current section
  const getLateralMenuItems = () => {
    switch (currentSection) {
      case 'mi-sitamco':
        return [
          { id: 'mis-datos', label: 'Mis Datos', icon: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.1 14.6 8.5 14 8.5S13 8.1 13 7.5V6.5L9 7V9C9 10.1 9.9 11 11 11V22H13V16H15V22H17V11C18.1 11 19 10.1 19 9H21Z' },
          { id: 'mi-contraseña', label: 'Contraseña', icon: 'M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z' }
        ]
      case 'directiva':
        return [
          { id: 'miembros', label: 'Miembros', icon: 'M16,4C18.11,4 19.8,5.69 19.8,7.8C19.8,9.91 18.11,11.6 16,11.6C13.89,11.6 12.2,9.91 12.2,7.8C12.2,5.69 13.89,4 16,4M16,13.4C18.68,13.4 24,14.74 24,17.4V20H8V17.4C8,14.74 13.32,13.4 16,13.4M8.8,11.6C10.91,11.6 12.6,9.91 12.6,7.8C12.6,5.69 10.91,4 8.8,4C6.69,4 5,5.69 5,7.8C5,9.91 6.69,11.6 8.8,11.6M8.8,13.4C6.12,13.4 0.8,14.74 0.8,17.4V20H7.2V17.4C7.2,16.5 7.65,15.71 8.39,15.1C8.53,14.83 8.65,14.6 8.8,13.4Z' }
        ]
      case 'administracion':
        return [
          { id: 'roles', label: 'Roles', icon: 'M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z' },
          { id: 'permisos', label: 'Permisos', icon: 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.8 16,12.4 16,13V16C16,17.1 15.1,18 14,18H10C8.9,18 8,17.1 8,16V13C8,12.4 8.6,11.8 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z' }
        ]
      default:
        return []
    }
  }

  const renderTopMenu = () => {
    return (
      <nav className="private-header navbar navbar-expand-lg sticky-top">
        <div className="container-fluid px-4">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('somos')} 
            className="navbar-brand private-logo-btn"
          >
            <img 
              src={theme === 'dark' ? "/src/assets/images/logos/sitamco_sm_white.png" : "/src/assets/images/logos/sitamco_sm.png"} 
              alt="SITAMCO" 
              className="private-logo-img"
            />
          </button>

          {/* Mobile toggle */}
          <button 
            className="navbar-toggler border-0 d-lg-none" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#privateNavbar" 
            aria-controls="privateNavbar" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation tabs */}
          <div className="collapse navbar-collapse" id="privateNavbar">
            <div className="navbar-nav mx-auto d-flex flex-row gap-2">
              <button 
                className={`nav-btn ${currentSection === 'mi-sitamco' ? 'active' : ''}`}
                onClick={() => setCurrentSection('mi-sitamco')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z" />
                </svg>
                Mi Sitamco
              </button>
              
              {(userRole === 'director' || userRole === 'administrator') && (
                <button 
                  className={`nav-btn ${currentSection === 'directiva' ? 'active' : ''}`}
                  onClick={() => setCurrentSection('directiva')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                    <path d="M16,4C18.11,4 19.8,5.69 19.8,7.8C19.8,9.91 18.11,11.6 16,11.6C13.89,11.6 12.2,9.91 12.2,7.8C12.2,5.69 13.89,4 16,4M16,13.4C18.68,13.4 24,14.74 24,17.4V20H8V17.4C8,14.74 13.32,13.4 16,13.4M8.8,11.6C10.91,11.6 12.6,9.91 12.6,7.8C12.6,5.69 10.91,4 8.8,4C6.69,4 5,5.69 5,7.8C5,9.91 6.69,11.6 8.8,11.6M8.8,13.4C6.12,13.4 0.8,14.74 0.8,17.4V20H7.2V17.4C7.2,16.5 7.65,15.71 8.39,15.1C8.53,14.83 8.65,14.6 8.8,13.4Z" />
                  </svg>
                  Directiva
                </button>
              )}
              
              {userRole === 'administrator' && (
                <button 
                  className={`nav-btn ${currentSection === 'administracion' ? 'active' : ''}`}
                  onClick={() => setCurrentSection('administracion')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                  </svg>
                  Administración
                </button>
              )}
            </div>

            {/* Right side actions */}
            <div className="navbar-nav">
              {/* Theme toggle */}
              <button 
                onClick={toggleTheme}
                className="btn private-theme-btn me-2"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>

              {/* User menu */}
              <div className="dropdown">
                <button 
                  className="btn private-user-btn dropdown-toggle" 
                  type="button" 
                  id="privateUserDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.1 14.6 8.5 14 8.5S13 8.1 13 7.5V6.5L9 7V9C9 10.1 9.9 11 11 11V22H13V16H15V22H17V11C18.1 11 19 10.1 19 9H21Z"/>
                  </svg>
                </button>
                <ul className="dropdown-menu dropdown-menu-end private-dropdown" aria-labelledby="privateUserDropdown">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => navigateTo('somos')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                      </svg>
                      Home
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={onLogout}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                      </svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // Set default sub-section when section changes
  useEffect(() => {
    const menuItems = getLateralMenuItems()
    if (menuItems.length > 0) {
      setSelectedSubSection(menuItems[0].id)
    }
  }, [currentSection])

  const renderCurrentContent = () => {
    const commonProps = {
      onLogout,
      navigateTo,
      currentPage,
      isAuthenticated,
      selectedSubSection,
      setSelectedSubSection
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

  const renderLateralMenu = () => {
    const menuItems = getLateralMenuItems()
    
    if (menuItems.length === 0) return null

    return (
      <div className="private-lateral-menu">
        <ul className="nav flex-column">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <button 
                className={`nav-btn ${selectedSubSection === item.id ? 'active' : ''}`}
                onClick={() => setSelectedSubSection(item.id)}
                title={item.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={item.icon} />
                </svg>
                <span className="private-lateral-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (loading) {
    return (
      <LoadingSpinner 
        size="lg" 
        variant="primary" 
        text="Cargando dashboard..." 
        fullScreen={true}
      />
    )
  }

  const renderFooter = () => {
    return (
      <footer className="footer mt-auto py-3">
        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.facebook.com/sitamco/" target="_blank" rel="noopener noreferrer">
                <img 
                  src={theme === 'dark' ? "/src/assets/images/icons/512/facebook_white.png" : "/src/assets/images/icons/512/facebook.png"} 
                  alt="Facebook" 
                  height="25" 
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.instagram.com/sitamcocl" target="_blank" rel="noopener noreferrer">
                <img 
                  src={theme === 'dark' ? "/src/assets/images/icons/512/instagram_white.png" : "/src/assets/images/icons/512/instagram.png"} 
                  alt="Instagram" 
                  height="25" 
                />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.twitter.com/sitamcocl" target="_blank" rel="noopener noreferrer">
                <img 
                  src={theme === 'dark' ? "/src/assets/images/icons/512/twitter_white.png" : "/src/assets/images/icons/512/twitter.png"} 
                  alt="Twitter" 
                  height="25" 
                />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }

  return (
    <div className="private-site">
      {renderTopMenu()}
      <div className="private-site-content">
        <div className="private-main-layout">
          {renderLateralMenu()}
          <div className="private-content-area">
            {renderCurrentContent()}
          </div>
        </div>
      </div>
      {renderFooter()}
    </div>
  )
}

export default PrivateSite