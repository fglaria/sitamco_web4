import { useState, useEffect } from 'react'
import { getUserData } from '../../../../services/authService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'

/**
 * MisDatos component that displays user personal information and membership status
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler for 401 errors
 * @returns {JSX.Element} MisDatos JSX element
 */
function MisDatos({ onLogout }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem(authConfig.tokenKey)
        
        if (!token) {
          setError('No authentication token found')
          return
        }

        // First get basic user info from auth/me to get user ID
        const basicResult = await getUserData(token)
        if (basicResult.success && basicResult.user) {
          // Then get detailed user profile from user endpoint
          setUserData(basicResult.user)
        } else {
          setError('Unable to get user information')
        }
      } catch (err) {
        // Check for 401 error and redirect to public site
        if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          onLogout()
          return
        }
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [onLogout])

  return (
    <div className="dashboard-content">
      <h2>Mis Datos</h2>
      <div className="welcome-content">
        <p>Información personal y estado de membresía.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3 bg-sitamco-surface border-sitamco-medium elevation-2">
              <div className="card-header bg-sitamco-secondary border-sitamco-light">
                <h5 className="text-sitamco-primary">Información Personal</h5>
              </div>
              <div className="card-body text-sitamco-primary">
                {loading ? (
                  <LoadingSpinner 
                    size="md" 
                    variant="primary" 
                    text="Cargando datos del usuario..." 
                  />
                ) : error ? (
                  <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                  </div>
                ) : userData ? (
                  <div>
                    <p><strong>ID:</strong> {userData.id}</p>
                    <p><strong>Nombre completo:</strong> {userData.first_name} {userData.middle_name} {userData.last_name1} {userData.last_name2}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>RUN:</strong> {userData.run}</p>
                    <p><strong>Teléfono:</strong> {userData.phone}</p>
                    <p><strong>Dirección:</strong> {userData.address}</p>
                    <p><strong>Comuna:</strong> {userData.commune}</p>
                    <p><strong>Fecha de ingreso:</strong> {new Date(userData.signed_at).toLocaleDateString()}</p>
                    <p><strong>Fecha de nacimiento:</strong> {userData.birthday || 'No especificada'}</p>
                    <p><strong>Creado:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p>No se pudieron cargar los datos del usuario</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3 bg-sitamco-surface border-sitamco-medium elevation-2">
              <div className="card-header bg-sitamco-secondary border-sitamco-light">
                <h5 className="text-sitamco-primary">Estado de Membresía</h5>
              </div>
              <div className="card-body text-sitamco-primary">
                {loading ? (
                  <LoadingSpinner 
                    size="sm" 
                    variant="secondary" 
                    text="Cargando estado..." 
                  />
                ) : userData ? (
                  <div>
                    <p><strong>Estado:</strong> <span className={`badge ${userData.status === 'CREATED' ? 'badge-info' : 'badge-secondary'}`}>{userData.status}</span></p>
                    <p><strong>Estado activo:</strong> 
                      <span className={`badge ms-2 ${userData.active ? 'badge-success' : 'badge-danger'}`}>
                        {userData.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </p>
                    <p><strong>Miembro desde:</strong> {new Date(userData.signed_at).toLocaleDateString()}</p>
                    {userData.modified_at && (
                      <p><strong>Última modificación:</strong> {new Date(userData.modified_at).toLocaleDateString()}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>Estado: Desconocido</p>
                    <span className="badge badge-secondary">Sin datos</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MisDatos