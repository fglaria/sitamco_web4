import { useState } from 'react'
import Miembros from './administrator/Miembros.jsx'
import './MiSitamco.css'

/**
 * Directiva component for director users
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {string} props.selectedSubSection - Current selected subsection
 * @returns {JSX.Element} Directiva JSX element
 */
function Directiva({ onLogout, navigateTo, currentPage, isAuthenticated, selectedSubSection }) {

  const renderContent = () => {
    switch (selectedSubSection) {
      case 'miembros':
        return <Miembros onLogout={onLogout} />
      default:
        return <Miembros onLogout={onLogout} />
    }
  }

  return renderContent()
}

export default Directiva