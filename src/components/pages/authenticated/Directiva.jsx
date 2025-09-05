import { useState } from 'react'
import Menu from '../../ui/Menu.jsx'
import MisDatos from './shared/MisDatos.jsx'
import MiContrasena from './shared/MiContrasena.jsx'
import './MiSitamco.css'

/**
 * Directiva component for director users
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @returns {JSX.Element} Directiva JSX element
 */
function Directiva({ onLogout, navigateTo, currentPage, isAuthenticated }) {
  const [selectedSection, setSelectedSection] = useState('mis-datos')

  const renderContent = () => {
    switch (selectedSection) {
      case 'mis-datos':
        return <MisDatos onLogout={onLogout} />
      case 'mi-contraseña':
        return <MiContrasena onLogout={onLogout} />
      case 'miembros':
        return (
          <div className="dashboard-content">
            <h2>Gestión de Miembros</h2>
            <div className="welcome-content">
              <p>Administra los miembros del sindicato.</p>
            </div>
          </div>
        )
      case 'reportes':
        return (
          <div className="dashboard-content">
            <h2>Reportes Directiva</h2>
            <div className="welcome-content">
              <p>Visualiza reportes y estadísticas de la directiva.</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="dashboard-content">
            <h2>Directiva</h2>
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
                className={`nav-link btn btn-link text-left ${selectedSection === 'miembros' ? 'active' : ''}`}
                onClick={() => setSelectedSection('miembros')}
              >
                Gestión de Miembros
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'reportes' ? 'active' : ''}`}
                onClick={() => setSelectedSection('reportes')}
              >
                Reportes Directiva
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

export default Directiva