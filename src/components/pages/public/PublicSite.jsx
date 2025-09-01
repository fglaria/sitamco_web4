import Somos from './Somos'
import Contacto from './Contacto'
import Unete from './Unete'

/**
 * PublicSite component that handles routing for unauthenticated users
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @param {Function} props.navigateTo - Navigation handler
 * @param {string} props.currentPage - Current active page
 * @param {boolean} props.isAuthenticated - Authentication status
 * @param {Function} props.onShowLogin - Callback function to show login modal
 * @returns {JSX.Element} PublicSite JSX element
 */
function PublicSite({ onLogout, navigateTo, currentPage, isAuthenticated, onShowLogin }) {
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'contacto':
        return <Contacto onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={onShowLogin} />
      case 'unete':
        return <Unete onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={onShowLogin} />
      case 'somos':
      default:
        return <Somos onLogout={onLogout} navigateTo={navigateTo} currentPage={currentPage} isAuthenticated={isAuthenticated} onShowLogin={onShowLogin} />
    }
  }

  return renderCurrentPage()
}

export default PublicSite