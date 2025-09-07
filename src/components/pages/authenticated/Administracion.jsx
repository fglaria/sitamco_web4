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
 * @param {string} props.selectedSubSection - Current selected subsection
 * @returns {JSX.Element} Administracion JSX element
 */
function Administracion({ onLogout, navigateTo, currentPage, isAuthenticated, selectedSubSection }) {

  const renderContent = () => {
    switch (selectedSubSection) {
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

  return renderContent()
}

export default Administracion