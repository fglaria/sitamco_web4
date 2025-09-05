import { useState, useEffect } from 'react'
import { getUserData } from '../../../services/authService.js'
import { authConfig } from '../../../config.js'
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
    // This is placeholder logic - adjust based on your actual role system
    if (userData.role === 'administrator' || userData.is_admin) {
      return 'administrator'
    } else if (userData.role === 'director' || userData.is_director) {
      return 'director'
    }
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
      <div className="private-site-top-menu">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button 
              className={`nav-link ${currentSection === 'mi-sitamco' ? 'active' : ''}`}
              onClick={() => setCurrentSection('mi-sitamco')}
            >
              Mi Sitamco
            </button>
          </li>
          {(userRole === 'director' || userRole === 'administrator') && (
            <li className="nav-item">
              <button 
                className={`nav-link ${currentSection === 'directiva' ? 'active' : ''}`}
                onClick={() => setCurrentSection('directiva')}
              >
                Directiva
              </button>
            </li>
          )}
          {userRole === 'administrator' && (
            <li className="nav-item">
              <button 
                className={`nav-link ${currentSection === 'administracion' ? 'active' : ''}`}
                onClick={() => setCurrentSection('administracion')}
              >
                Administración
              </button>
            </li>
          )}
        </ul>
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