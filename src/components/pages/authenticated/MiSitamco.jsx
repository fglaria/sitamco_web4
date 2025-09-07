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
 * @param {string} props.selectedSubSection - Current selected subsection
 * @returns {JSX.Element} MiSitamco JSX element
 */
function MiSitamco({ onLogout, navigateTo, currentPage, isAuthenticated, selectedSubSection }) {

  const renderContent = () => {
    switch (selectedSubSection) {
      case 'mis-datos':
        return <MisDatos onLogout={onLogout} />
      case 'mi-contraseña':
        return <MiContrasena onLogout={onLogout} />
      default:
        return <MisDatos onLogout={onLogout} />
    }
  }

  return renderContent()
}

export default MiSitamco