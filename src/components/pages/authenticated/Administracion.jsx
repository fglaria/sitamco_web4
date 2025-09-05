import { useState } from 'react'
import Menu from '../../ui/Menu.jsx'
import MisDatos from './shared/MisDatos.jsx'
import MiContrasena from './shared/MiContrasena.jsx'
import './MiSitamco.css'

/**
 * Administracion component for administrator users
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @returns {JSX.Element} Administracion JSX element
 */
function Administracion({ onLogout, navigateTo, currentPage, isAuthenticated }) {
  const [selectedSection, setSelectedSection] = useState('mis-datos')

  const renderContent = () => {
    switch (selectedSection) {
      case 'mis-datos':
        return <MisDatos onLogout={onLogout} />
      case 'mi-contraseña':
        return <MiContrasena onLogout={onLogout} />
      case 'usuarios':
        return (
          <div className="dashboard-content">
            <h2>Gestión de Usuarios</h2>
            <div className="welcome-content">
              <p>Administra todos los usuarios del sistema.</p>
            </div>
          </div>
        )
      case 'sistema':
        return (
          <div className="dashboard-content">
            <h2>Configuración del Sistema</h2>
            <div className="welcome-content">
              <p>Configura parámetros del sistema y administración.</p>
            </div>
          </div>
        )
      case 'auditoria':
        return (
          <div className="dashboard-content">
            <h2>Auditoría del Sistema</h2>
            <div className="welcome-content">
              <p>Revisa logs y actividad del sistema.</p>
            </div>
          </div>
        )
      case 'reportes':
        return (
          <div className="dashboard-content">
            <h2>Reportes Administrativos</h2>
            <div className="welcome-content">
              <p>Genera y visualiza reportes del sistema completo.</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="dashboard-content">
            <h2>Administración</h2>
            <p>Selecciona una opción del menú lateral.</p>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <Menu 
        onLogout={onLogout} 
        navigateTo={navigateTo} 
        currentPage={currentPage} 
        isAuthenticated={isAuthenticated}
        isDashboard={true}
      />
      
      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        {/* Left Sidebar */}
        <div className="dashboard-sidebar">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'mis-datos' ? 'active' : ''}`}
                onClick={() => setSelectedSection('mis-datos')}
              >
                Mis Datos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'mi-contraseña' ? 'active' : ''}`}
                onClick={() => setSelectedSection('mi-contraseña')}
              >
                Mi Contraseña
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'usuarios' ? 'active' : ''}`}
                onClick={() => setSelectedSection('usuarios')}
              >
                Gestión de Usuarios
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'sistema' ? 'active' : ''}`}
                onClick={() => setSelectedSection('sistema')}
              >
                Configuración Sistema
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'auditoria' ? 'active' : ''}`}
                onClick={() => setSelectedSection('auditoria')}
              >
                Auditoría
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'reportes' ? 'active' : ''}`}
                onClick={() => setSelectedSection('reportes')}
              >
                Reportes Administrativos
              </button>
            </li>
          </ul>
        </div>
        
        {/* Right Content Area */}
        <div className="dashboard-content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Administracion