import { useState, useEffect } from 'react'
import { getAllUsers } from '../../../../services/authService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'

/**
 * Miembros component for managing union members
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @returns {JSX.Element} Miembros JSX element
 */
function Miembros({ onLogout }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError('')
        const token = localStorage.getItem(authConfig.tokenKey)
        
        if (!token) {
          setError('No authentication token found')
          return
        }

        const result = await getAllUsers(token)
        if (result.success && result.users) {
          setUsers(result.users)
        } else {
          setError('No se pudieron obtener los usuarios')
        }
      } catch (err) {
        // Check for 401 error and redirect to public site
        if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          onLogout()
          return
        }
        setError(err.message || 'Error al cargar los usuarios')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [onLogout])

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada'
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (user) => {
    const isActive = user.active
    const status = user.status || 'UNKNOWN'
    
    if (isActive && status === 'CREATED') {
      return <span className="badge badge-success">Activo</span>
    } else if (!isActive) {
      return <span className="badge badge-danger">Inactivo</span>
    } else {
      return <span className="badge badge-secondary">{status}</span>
    }
  }

  return (
    <div 
      className="dashboard-content miembros-container"
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--sitamco-border-medium) transparent'
      }}
    >
      <style>{`
        .miembros-container::-webkit-scrollbar {
          width: 6px;
        }
        .miembros-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .miembros-container::-webkit-scrollbar-thumb {
          background: var(--sitamco-border-medium);
          border-radius: 3px;
        }
        .miembros-container::-webkit-scrollbar-thumb:hover {
          background: var(--sitamco-primary);
        }
      `}</style>
      <h2>Gestión de Miembros</h2>
      <div className="welcome-content">
        <p>Administra los miembros del sindicato.</p>
        
        {loading && (
          <LoadingSpinner 
            size="md" 
            variant="primary" 
            text="Cargando usuarios..." 
          />
        )}

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="alert alert-info">
            <strong>Sin datos:</strong> No se encontraron usuarios registrados.
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="card bg-sitamco-surface border-sitamco-medium elevation-2">
                <div className="card-header bg-sitamco-secondary border-sitamco-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-sitamco-primary">Miembros Registrados ({users.length})</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{
                        backgroundColor: 'var(--sitamco-bg-secondary)',
                        borderBottom: '1px solid var(--sitamco-border-medium)'
                      }}>
                        <tr>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '600',
                            padding: '1rem'
                          }}>Nombre Completo</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '600',
                            padding: '1rem'
                          }}>Email</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '600',
                            padding: '1rem'
                          }}>RUN</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '600',
                            padding: '1rem'
                          }}>Estado</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '600',
                            padding: '1rem'
                          }}>Ingreso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} style={{ 
                            color: 'var(--sitamco-text-primary)',
                            borderBottom: '1px solid var(--sitamco-border-light)'
                          }}>
                            <td style={{ padding: '1rem' }}>
                              <div className="user-info">
                                <strong style={{ color: 'var(--sitamco-text-primary)' }}>
                                  {[user.first_name, user.middle_name, user.last_name1, user.last_name2]
                                    .filter(Boolean)
                                    .join(' ')}
                                </strong>
                                {user.phone && (
                                  <div style={{ 
                                    color: 'var(--sitamco-text-secondary)', 
                                    fontSize: '0.875rem',
                                    marginTop: '0.25rem'
                                  }}>{user.phone}</div>
                                )}
                              </div>
                            </td>
                            <td style={{ 
                              padding: '1rem', 
                              color: 'var(--sitamco-text-primary)' 
                            }}>{user.email}</td>
                            <td style={{ padding: '1rem' }}>
                              <code style={{ 
                                color: 'var(--sitamco-text-secondary)',
                                backgroundColor: 'var(--sitamco-bg-secondary)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem'
                              }}>{user.run || 'No especificado'}</code>
                            </td>
                            <td style={{ padding: '1rem' }}>{getStatusBadge(user)}</td>
                            <td style={{ 
                              padding: '1rem', 
                              color: 'var(--sitamco-text-secondary)', 
                              fontSize: '0.875rem' 
                            }}>{formatDate(user.signed_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Miembros