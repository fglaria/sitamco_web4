
import { useTheme } from '../../contexts/ThemeContext.jsx'
import './Menu.css'

/**
 * Menu component that displays the main navigation for SITAMCO
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Callback function called when user logs out
 * @param {Function} props.navigateTo - Callback function for navigation
 * @param {string} props.currentPage - Current active page for highlighting
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {Function} props.onShowLogin - Callback function to show login modal
 * @returns {JSX.Element} SITAMCO navigation menu JSX element
 */
function Menu({ onLogout, navigateTo, currentPage, isAuthenticated, onShowLogin, isDashboard = false }) {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav className="navbar navbar-expand-lg bg-body sticky-top modern-navbar">
      <div className="container-fluid px-4">
        {/* Logo */}
        <button 
          onClick={() => navigateTo(isDashboard ? 'dashboard' : 'somos')} 
          className="navbar-brand logo-btn"
        >
          <img 
            src={theme === 'dark' ? "/src/assets/images/logos/sitamco_sm_white.png" : "/src/assets/images/logos/sitamco_sm.png"} 
            alt="SITAMCO" 
            className="logo-img"
          />
        </button>

        {/* Mobile toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center">
            {!isDashboard && (
              <>
                <button 
                  className={`nav-link nav-btn ${currentPage === 'somos' ? 'active' : ''}`} 
                  onClick={() => navigateTo('somos')}
                >
                  Somos
                </button>
                <button 
                  className={`nav-link nav-btn ${currentPage === 'unete' ? 'active' : ''}`} 
                  onClick={() => navigateTo('unete')}
                >
                  Únete
                </button>
                <button 
                  className={`nav-link nav-btn ${currentPage === 'contacto' ? 'active' : ''}`} 
                  onClick={() => navigateTo('contacto')}
                >
                  Contacto
                </button>
              </>
            )}
            
            {isDashboard && (
              <span className="nav-link dashboard-title">Mi SITAMCO</span>
            )}

            {/* Theme toggle */}
            <button 
              onClick={toggleTheme}
              className="btn theme-btn ms-2"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Auth button */}
            {isAuthenticated ? (
              <div className="dropdown ms-2">
                <button 
                  className="btn user-menu-btn dropdown-toggle" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.1 14.6 8.5 14 8.5S13 8.1 13 7.5V6.5L9 7V9C9 10.1 9.9 11 11 11V22H13V16H15V22H17V11C18.1 11 19 10.1 19 9H21Z"/>
                  </svg>
                </button>
                <ul className="dropdown-menu dropdown-menu-end modern-dropdown" aria-labelledby="userDropdown">
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
            ) : (
              <button onClick={onShowLogin} className="btn login-btn ms-2">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu