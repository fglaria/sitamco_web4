import { useState, useEffect } from 'react'
import { getUserData } from '../../../services/authService'
import { authConfig } from '../../../config'

/**
 * MisDatos component that displays user personal information and membership status
 * @returns {JSX.Element} MisDatos JSX element
 */
function MisDatos() {
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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="dashboard-content">
      <h2>Mis Datos</h2>
      <div className="welcome-content">
        <p>Información personal y estado de membresía.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">
                <h5>Información Personal</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Cargando...</span>
                    </div>
                    <p className="mt-2">Cargando datos del usuario...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                  </div>
                ) : userData ? (
                  <div>
                    <p><strong>ID:</strong> {userData.id}</p>
                    <p><strong>Nombre:</strong> {userData.first_name} {userData.middle_name} {userData.last_name1} {userData.last_name2}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>RUN:</strong> {userData.run}</p>
                    <p><strong>Teléfono:</strong> {userData.phone}</p>
                    <p><strong>Dirección:</strong> {userData.address}</p>
                    <p><strong>Comuna:</strong> {userData.commune}</p>
                    <p><strong>Fecha de ingreso:</strong> {userData.signed_at}</p>
                  </div>
                ) : (
                  <p>No se pudieron cargar los datos del usuario</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">
                <h5>Estado de Membresía</h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Cargando estado...</p>
                ) : userData ? (
                  <div>
                    <p>Estado de la cuenta: <strong>{userData.status}</strong></p>
                    <span className={`badge ${userData.active ? 'badge-success' : 'badge-danger'}`}>
                      {userData.active ? 'Activo' : 'Inactivo'}
                    </span>
                    <p className="mt-2">Miembro desde: {userData.signed_at}</p>
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