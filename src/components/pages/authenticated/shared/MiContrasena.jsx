import { useState } from 'react'
import { changePassword } from '../../../../services/authService.js'
import { authConfig } from '../../../../config.js'

/**
 * MiContrasena component for changing user password
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler for 401 errors
 * @returns {JSX.Element} MiContrasena JSX element
 */
function MiContrasena({ onLogout }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
    // Clear messages when user starts typing
    if (message) setMessage('')
    if (error) setError('')
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const token = localStorage.getItem(authConfig.tokenKey)
      if (!token) {
        setError('No se encontró token de autenticación')
        return
      }
      
      const result = await changePassword(token, passwordData.currentPassword, passwordData.newPassword)
      
      if (result.success) {
        setMessage(result.message || 'Contraseña cambiada exitosamente')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (err) {
      // Check for 401 error and redirect to public site
      if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
        onLogout()
        return
      }
      setError(err.message || 'Error al cambiar contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-content">
      <h2>Mi Contraseña</h2>
      <div className="welcome-content">
        <p>Actualiza tu contraseña de acceso al sistema.</p>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Nueva Contraseña</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="currentPassword">Contraseña Actual</label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      minLength="6"
                      required
                    />
                    <small className="form-text text-muted">
                      La contraseña debe tener al menos 6 caracteres
                    </small>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}
                  
                  {message && (
                    <div className="alert alert-success">
                      {message}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Cambiando...
                      </>
                    ) : (
                      'Cambiar Contraseña'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiContrasena