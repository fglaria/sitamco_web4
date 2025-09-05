import { useState } from 'react'
import Miembros from './administrator/Miembros.jsx'
import Roles from './administrator/Roles.jsx'
import Permisos from './administrator/Permisos.jsx'
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
  const [selectedSection, setSelectedSection] = useState('miembros')

  const renderContent = () => {
    switch (selectedSection) {
      case 'miembros':
        return <Miembros onLogout={onLogout} />
      case 'roles':
        return <Roles onLogout={onLogout} />
      case 'permisos':
        return <Permisos onLogout={onLogout} />
      default:
        return <Miembros onLogout={onLogout} />
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
                className={`nav-link btn btn-link text-left ${selectedSection === 'miembros' ? 'active' : ''}`}
                onClick={() => setSelectedSection('miembros')}
              >
                Miembros
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'roles' ? 'active' : ''}`}
                onClick={() => setSelectedSection('roles')}
              >
                Roles
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-left ${selectedSection === 'permisos' ? 'active' : ''}`}
                onClick={() => setSelectedSection('permisos')}
              >
                Permisos
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