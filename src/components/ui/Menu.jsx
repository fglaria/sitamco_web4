
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
  return (
    <nav className="navbar sticky-top navbar-light navbar-expand-md bg-light justify-content-between">
      <div className="container-fluid">
        <div className="navbar-header">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#header-menu" 
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <button onClick={() => navigateTo(isDashboard ? 'dashboard' : 'somos')} className="navbar-brand btn btn-link p-0">
            <img src="/src/assets/images/logos/sitamco_sm.png" alt="SITAMCO" width="150" height="40" />
          </button>
        </div>
        <div className="navbar-collapse collapse" id="header-menu">
          <ul className="nav navbar-nav ml-auto">
            {!isDashboard && (
              <>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'somos' ? 'active' : ''}`} 
                    onClick={() => navigateTo('somos')}
                  >
                    SOMOS
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'unete' ? 'active' : ''}`} 
                    onClick={() => navigateTo('unete')}
                  >
                    ÚNETE
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link ${currentPage === 'contacto' ? 'active' : ''}`} 
                    onClick={() => navigateTo('contacto')}
                  >
                    CONTACTO
                  </button>
                </li>
              </>
            )}
            {isDashboard && (
              <li className="nav-item">
                <span className="nav-link text-primary font-weight-bold">Mi SITAMCO</span>
              </li>
            )}
            <li className="nav-item">
              {isAuthenticated ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-secondary btn-sm ml-2 dropdown-toggle" 
                    type="button" 
                    id="userDropdown" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false"
                  >
                    Menu
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <button 
                      className="dropdown-item" 
                      onClick={() => navigateTo('somos')}
                    >
                      Home
                    </button>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={onShowLogin} className="btn btn-outline-primary btn-sm ml-2">
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Menu