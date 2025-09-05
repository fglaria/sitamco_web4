/**
 * Roles component for managing user roles
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @returns {JSX.Element} Roles JSX element
 */
function Roles({ onLogout }) {
  return (
    <div className="dashboard-content">
      <h2>Gestión de Roles</h2>
      <div className="welcome-content">
        <p>Administra los roles y privilegios del sistema.</p>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Roles del Sistema</h5>
              </div>
              <div className="card-body">
                <p>Aquí se mostrarán los diferentes roles disponibles en el sistema: Administrator, Director, y Member, con opciones para gestionar sus privilegios y asignaciones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roles