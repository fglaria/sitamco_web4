import Menu from '../../ui/Menu.jsx'
import { useTheme } from '../../../contexts/ThemeContext.jsx'

/**
 * Unete component that displays SITAMCO membership information and FAQ
 * @param {Object} props - Component props  
 * @param {Function} props.onLogout - Callback function called when user logs out
 * @param {Function} props.navigateTo - Callback function for navigation
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {Function} props.onShowLogin - Callback function to show login modal
 * @returns {JSX.Element} SITAMCO Unete page JSX element
 */
function Unete({ onLogout, navigateTo, currentPage, isAuthenticated, onShowLogin }) {
  const { theme } = useTheme()

  return (
    <div className="d-flex flex-column sticky-footer-wrapper min-vh-100 bg-body text-body">
      {/* Navigation */}
      <Menu onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={onShowLogin} />

      {/* Main Content */}
      <main className="flex-fill">
        <div className="container-fluid py-3">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-11 col-xl-10">
              <div className="text-center mb-3">
                <h1 className="h2 font-weight-bold mb-2">Únete a SITAMCO</h1>
                <p className="text-muted mb-3">Forma parte del sindicato que representa a los trabajadores de las artes musicales</p>
                <a className="btn btn-primary px-4 py-2" href="https://forms.gle/qjSNoRQrkNeTcknGA" role="button" target="_blank">
                  <strong>¡Quiero unirme a SITAMCO!</strong>
                </a>
              </div>

              <div className="text-center mb-3">
                <h2 className="h4 font-weight-bold">Preguntas frecuentes</h2>
                <p className="text-muted small">Resolvemos las dudas más comunes sobre el proceso de admisión</p>
              </div>
              
              <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      ¿Qué profesiones y/u oficios pueden ingresar?
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Podrán pertenecer a este Sindicato las personas trabajadoras que ejerzan la profesión u oficio de músico/a en forma independiente:</p>
                    <p>Instrumentistas y/o Intérpretes Vocales.</p>
                    <p>Autores/as, Compositores/as, Directores/as, Arreglistas.</p>
                    <p>Otros/as Trabajadores/as de las artes musicales.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      ¿Cuál es la jurisdicción de SITAMCO?
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Todas las comunas que conforman la provincia de Concepción.</p>
                    <p>Concepción, Coronel, Chiguayante, Florida, Hualpén, Hualqui, Lota, Penco, San Pedro de la Paz, Santa Juana, Talcahuano, Tomé.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingThree">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      ¿Qué información debo presentar?
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Debes presentar documentación que acredite tu calidad de trabajador/a de la música.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFour">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      ¿Qué debo saber?
                    </button>
                  </h2>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Se entiende que si presentas tu solicitud para ingresar a SITAMCO, leíste y aceptaste cumplir con lo estipulado en nuestro estatuto.</p>
                    <a href="https://drive.google.com/file/d/1G11mzSIiEKRsf7LwXxV47fe2QQfoqQ3O/view?usp=sharing" target="_blank" rel="noopener noreferrer">Leer estatuto SITAMCO</a>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingFive">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      Ya envié mi solicitud. ¿Ahora qué?
                    </button>
                  </h2>
                </div>
                <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Primero que todo, felicitaciones por tomar la iniciatia y querer ser parte de SITAMCO.</p>
                    <p>Tu solicitud será revisada en la próxima Asamblea ordinaria, y apenas tengamos el resultado nos comunicaremos contigo.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingSix">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                      Rechazaron mi solicitud. ¿Puedo volver a intentarlo?
                    </button>
                  </h2>
                </div>
                <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Si tu solicitud es rechazada, te daremos las razones en los próximos 5 días posteriores a esta decisión.</p>
                    <p>De todas formas, puedes volver a enviar tu postulación luego de subsanar las razones de tu rechazo.</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header" id="headingSeven">
                  <h2 className="mb-0">
                    <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                      Tengo más dudas. ¿A dónde puedo escribir?
                    </button>
                  </h2>
                </div>
                <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>Si tienes más consultas, no dudes en escribirnos a:</p>
                    <a href="mailto:admision@sitamco.cl">admision@sitamco.cl</a>
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
    </div>
  )
}

export default Unete