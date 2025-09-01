import Menu from '../../ui/Menu'

/**
 * Contacto component that displays SITAMCO contact information
 * @param {Object} props - Component props  
 * @param {Function} props.onLogout - Callback function called when user logs out
 * @param {Function} props.navigateTo - Callback function for navigation
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {Function} props.onShowLogin - Callback function to show login modal
 * @returns {JSX.Element} SITAMCO Contacto page JSX element
 */
function Contacto({ onLogout, navigateTo, currentPage, isAuthenticated, onShowLogin }) {

  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100">
      {/* Navigation */}
      <Menu onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={onShowLogin} />

      {/* Main Content */}
      <main role="main" className="flex-fill">
        <div className="container-fluid py-3">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10">
              <div className="text-center mb-3">
                <h1 className="h2 font-weight-bold mb-2">Contacto</h1>
                <p className="text-muted">¿Tienes dudas o consultas? Contáctanos a través de los siguientes medios</p>
              </div>
              
              <div className="row mb-3">
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">¿Consultas sobre admisión?</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:admision@sitamco.cl">admision@sitamco.cl</a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">Dudas generales</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:contacto@sitamco.cl">contacto@sitamco.cl</a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">Contactar directiva</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:directiva@sitamco.cl">directiva@sitamco.cl</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">Secretaría</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:secretaria@sitamco.cl">secretaria@sitamco.cl</a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">Tesorería</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:tesoreria@sitamco.cl">tesoreria@sitamco.cl</a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3">
                  <div className="card h-100 text-center">
                    <div className="card-header">Comisión de Bienestar Social</div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                      <a className="card-title mb-0" href="mailto:bienestar@sitamco.cl">bienestar@sitamco.cl</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer mt-auto py-3">
        <div>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.facebook.com/sitamco/" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/images/icons/512/facebook.png" alt="Facebook" height="25" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.instagram.com/sitamcocl" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/images/icons/512/instagram.png" alt="Instagram" height="25" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-0" href="https://www.twitter.com/sitamcocl" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/images/icons/512/twitter.png" alt="Twitter" height="25" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Contacto