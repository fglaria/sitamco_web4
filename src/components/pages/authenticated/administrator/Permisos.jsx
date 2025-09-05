/**
 * Permisos component for managing system permissions
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @returns {JSX.Element} Permisos JSX element
 */
function Permisos({ onLogout }) {
  return (
    <div className="dashboard-content">
      <h2>Gestión de Permisos</h2>
      <div className="welcome-content">
        <p>Administra los permisos y accesos del sistema.</p>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Permisos del Sistema</h5>
              </div>
              <div className="card-body">
                <p>Aquí se mostrarán los diferentes permisos disponibles en el sistema, con opciones para asignarlos a roles específicos y gestionar el control de acceso granular.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Permisos