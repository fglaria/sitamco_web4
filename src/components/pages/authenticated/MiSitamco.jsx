import { useState } from 'react'
import MisDatos from './member/MisDatos.jsx'
import MiContrasena from './member/MiContrasena.jsx'
import './MiSitamco.css'

/**
 * MiSitamco component for authenticated users
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @returns {JSX.Element} MiSitamco JSX element
 */
function MiSitamco({ onLogout, navigateTo, currentPage, isAuthenticated }) {
  const [selectedSection, setSelectedSection] = useState('mis-datos')

  const renderContent = () => {
    switch (selectedSection) {
      case 'mis-datos':
        return <MisDatos onLogout={onLogout} />
      case 'mi-contraseña':
        return <MiContrasena onLogout={onLogout} />
      default:
        return (
          <div className="dashboard-content">
            <h2>Mi SITAMCO</h2>
            <p>Selecciona una opción del menú lateral.</p>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-layout">
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

export default MiSitamco