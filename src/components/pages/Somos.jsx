import Menu from '../ui/Menu'

/**
 * Somos component that displays SITAMCO's history, leadership, and organization
 * @param {Object} props - Component props  
 * @param {Function} props.onLogout - Callback function called when user logs out
 * @param {Function} props.navigateTo - Callback function for navigation
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Whether user is authenticated
 * @param {Function} props.onShowLogin - Callback function to show login modal
 * @returns {JSX.Element} SITAMCO Somos page JSX element
 */
function Somos({ onLogout, navigateTo, currentPage, isAuthenticated, onShowLogin }) {
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
                <h1 className="h2 font-weight-bold mb-2">
                  Sindicato de Trabajadores y Trabajadoras Independientes<br/> 
                  de las Artes Musicales de la Provincia de Concepción
                </h1>
                <p className="text-muted">Conoce nuestra historia, organización y documentos oficiales</p>
              </div>
            
              <div className="accordion" id="accordionExample">
              {/* Historia */}
              <div className="card">
                <div className="card-header text-center" id="headingOne">
                  <h2 className="mb-0">
                    <button 
                      className="btn btn-link" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target="#collapseOne" 
                      aria-expanded="true" 
                      aria-controls="collapseOne"
                    >
                      Historia
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>A finales del 2019 Chile vivió un estallido social que como país nos hizo reflexionar acerca del modelo socioeconómico imperante. Los ciudadanos sentimos la necesidad de manifestar nuestro descontento y también de agruparnos y generar instancias de conversación. En este contexto, diversos actores del área musical en Concepción se juntaron con el afán de dialogar sobre la situación nacional y el arte musical y del trabajador y trabajadora de la música en la zona.</p>
                    <p>Luego de distintos encuentros en modalidad de cabildos y asambleas de gran concurrencia, salieron a la luz diferentes carencias que aquejan el desarrollo del sector musical y la inquietud de discutirlas en pos de buscar una solución efectiva. La invisibilización del trabajador de las artes musicales en contraste a la importancia que estas tienen en la sociedad, la precariedad del trabajo que se manifiesta en la ausencia de un sistema de protección social, en la irregularidad del trato salarial y en las relaciones contractuales, y en definitiva, la poca valoración de la actividad, se configuraron como los principales problemas de los trabajadores de la industria musical. Así, surgió la idea de crear una organización que velara por sus derechos bajo la figura de un sindicato, considerando la naturaleza de las necesidades manifestadas.</p>
                    <p>De esta forma, durante el año 2020, SITAMCO se vinculó con distintas agrupaciones artísticas de la provincia de Concepción para beneficiar a los y las trabajadores y trabajadoras del sector, configurándose como un referente significativo ante las autoridades ministeriales y municipales. Así, canalizaron recursos alimenticios y participaron en la coordinación del plan de emergencia "Hasta encontrarnos", beneficios directos para los y las trabajadores y trabajadoras de las Artes Musicales en el contexto de emergencia sanitaria.</p>
                    <p>Constituidos legalmente el 30 de octubre de 2020 como Sindicato de Trabajadores y Trabajadoras Independientes de las Artes Musicales de la provincia de Concepción, se proyectan al futuro como una organización que busca mejorar las condiciones laborales de sus socios y socias, generar estrategias de protección social en pos de la mejora de la calidad de sus vidas, y participar en la elaboración de políticas públicas transversales y estables para la sostenibilidad del sector, abogando por una mayor inversión a nivel provincial y nacional.</p>
                  </div>
                </div>
              </div>

              {/* Directiva */}
              <div className="card">
                <div className="card-header text-center" id="headingTwo">
                  <h2 className="mb-0">
                    <button 
                      className="btn btn-link collapsed" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target="#collapseTwo" 
                      aria-expanded="false" 
                      aria-controls="collapseTwo"
                    >
                      Directiva
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body">
                    <p>La Directiva de SITAMCO dura dos años en ejercicio. La última elección se realizó el 21 de julio de 2025 y mantendrán sus cargos hasta el 2027.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">Presidente: Pascual Fariñez</li>
                      <li className="list-group-item">Tesorero: Edgar Navarrete</li>
                      <li className="list-group-item">Secretario: ---</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Comisiones */}
              <div className="card">
                <div className="card-header text-center" id="headingThree">
                  <h2 className="mb-0">
                    <button 
                      className="btn btn-link collapsed" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target="#collapseThree" 
                      aria-expanded="false" 
                      aria-controls="collapseThree"
                    >
                      Comisiones
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                    <h3>Comisión de Admisión</h3>
                    <p>La Comisión de Admisión la designa el Directorio con autonomía de la Asamblea, para asesorar la decisión respecto a la admisión de nuevos/as socios/as. Esta Comisión recibirá toda información asociada a cada postulación, sin importar su procedencia, y deberá generar los medios para su receptación.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">---</li>
                    </ul>

                    <h3 className="mt-3">Comisión de Bienestar Social</h3>
                    <p>La Comisión de Bienestar Social está destinada a implementar un sistema de beneficios para los socios/as del Sindicato, estableciendo para ello un mecanismo de financiamiento y un reglamento de beneficios que deberá ser aprobado por el Directorio y la Asamblea.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">---</li>
                    </ul>

                    <h3 className="mt-3">Comisión de Ética y Disciplina</h3>
                    <p>La Comisión de Ética y Disciplina está destinada a velar por preservar los valores propios de la actividad profesional, la probidad, transparencia y el buen trato entre los miembros del Sindicato.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">---</li>
                    </ul>

                    <h3 className="mt-3">Comisión de Género, Igualdad, Inclusión y Espacios Seguros</h3>
                    <p>La Comisión de Género, Igualdad, Inclusión y Espacios Seguros está destinada a proponer medidas relativas a avanzar en la eliminación de todas las formas de discriminación por razones de género, orientación sexual, nacionalidad u otras, en el accionar sindical o en el contexto de la actividad de representación de Artes Musicales.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">---</li>
                    </ul>

                    <h3 className="mt-3">Comisión de Comunicaciones</h3>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">Dillman Cifuentes</li>
                      <li className="list-group-item">---</li>
                    </ul>

                    <h3 className="mt-3">Comisión Revisora de Cuentas</h3>
                    <p>La Comisión Revisora de Cuentas será independiente del Directorio, durará dos años en su cargo y deberá rendir anualmente cuenta de su cometido ante la Asamblea. En el evento que parte o la totalidad de sus miembros deje el cargo antes del término de su período, la Asamblea podrá elegir, dependiendo de cual sea el caso, la totalidad o solo los integrantes faltantes, quienes integrarán la Comisión hasta completar el período para el cual fueron elegidos originalmente.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">---</li>
                    </ul>
                    
                    <h3 className="mt-3">Comisión Electoral</h3>
                    <p>La Comisión Revisora de Cuentas será independiente del Directorio, durará dos años en su cargo y deberá rendir anualmente cuenta de su cometido ante la Asamblea. En el evento que parte o la totalidad de sus miembros deje el cargo antes del término de su período, la Asamblea podrá elegir, dependiendo de cual sea el caso, la totalidad o solo los integrantes faltantes, quienes integrarán la Comisión hasta completar el período para el cual fueron elegidos originalmente.</p>
                    <p>Integrantes:</p>
                    <ul className="list-group">
                      <li className="list-group-item">Dillman Cifuentes</li>
                      <li className="list-group-item">Felipe Glaria</li>
                      <li className="list-group-item">Macarena Peña</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div className="card">
                <div className="card-header text-center" id="headingFour">
                  <h2 className="mb-0">
                    <button 
                      className="btn btn-link collapsed" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target="#collapseFour" 
                      aria-expanded="false" 
                      aria-controls="collapseFour"
                    >
                      Documentos
                    </button>
                  </h2>
                </div>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                  <div className="card-body">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <a href="https://drive.google.com/file/d/1G11mzSIiEKRsf7LwXxV47fe2QQfoqQ3O/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                          Estatuto SITAMCO
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a href="https://drive.google.com/file/d/1GYDy9Te_fatKAu268KS9LiEPZ4pyf0fp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                          Reglamento de Comisiones
                        </a>
                      </li>
                      <li className="list-group-item">
                        <a href="https://drive.google.com/file/d/1g7fEXU-cmmpfVctAXqTdNJfj1WRKgMoe/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                          Reglamento Beneficios
                        </a>
                      </li>
                    </ul>
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

export default Somos