import { useState } from 'react'
import Menu from '../../ui/Menu'
import MisDatos from './MisDatos'
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
        return <MisDatos />
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
                className={`nav-link btn btn-link text-left ${selectedSection === 'documentos' ? 'active' : ''}`}
                onClick={() => setSelectedSection('documentos')}
              >
                Mis Documentos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'pagos' ? 'active' : ''}`}
                onClick={() => setSelectedSection('pagos')}
              >
                Mis Pagos
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'perfil' ? 'active' : ''}`}
                onClick={() => setSelectedSection('perfil')}
              >
                Mi Perfil
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