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
    if (!dateString) return '-'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    return `${day}/${month}/${year}`
  }

  const getStatusBadge = (user) => {
    const isActive = user.active
    const status = user.status || 'UNKNOWN'
    
    if (isActive && status === 'CREATED') {
      return <span className="badge bg-success text-white" style={{ fontSize: '0.75rem' }}>Activo</span>
    } else if (!isActive) {
      return <span className="badge bg-danger text-white" style={{ fontSize: '0.75rem' }}>Inactivo</span>
    } else {
      return <span className="badge bg-secondary text-white" style={{ fontSize: '0.75rem' }}>{status}</span>
    }
  }

  return (
    <div 
      className="dashboard-content miembros-container"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        gap: '0'
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
        .miembros-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: var(--sitamco-border-medium) transparent;
        }
        .miembros-table-container {
          height: 100%;
          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--sitamco-border-medium) transparent;
        }
        .miembros-table-container::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .miembros-table-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .miembros-table-container::-webkit-scrollbar-thumb {
          background: var(--sitamco-border-medium);
          border-radius: 3px;
        }
        .miembros-table-container::-webkit-scrollbar-thumb:hover {
          background: var(--sitamco-primary);
        }
      `}</style>
      
      {/* Full Height Table Content */}
      <div className="miembros-content">
        
          {loading && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '200px' 
            }}>
              <LoadingSpinner 
                size="md" 
                variant="primary" 
                text="Cargando usuarios..." 
              />
            </div>
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
            <div 
              className="miembros-table-container"
              style={{ 
                background: 'var(--sitamco-surface)',
                border: '1px solid var(--sitamco-border-medium)',
                borderRadius: '8px'
              }}>
                    <table className="table table-hover mb-0" style={{ 
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      marginBottom: '0'
                    }}>
                      <thead style={{
                        backgroundColor: 'var(--sitamco-text-secondary)',
                        borderBottom: '2px solid var(--sitamco-text-secondary)',
                        position: 'sticky',
                        top: '0',
                        zIndex: '10',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}>
                        <tr>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '25%',
                            minWidth: '180px',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>Nombre Completo</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '20%',
                            minWidth: '160px',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>Email</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '12%',
                            minWidth: '110px',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>Teléfono</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '12%',
                            minWidth: '100px',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>RUN</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '10%',
                            minWidth: '80px',
                            textAlign: 'center',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>Vigente</th>
                          <th style={{
                            color: 'var(--sitamco-text-primary)',
                            fontWeight: '700',
                            padding: '0.875rem 1rem',
                            width: '11%',
                            minWidth: '90px',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            borderBottom: 'none'
                          }}>Ingreso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} style={{ 
                            color: 'var(--sitamco-text-primary)',
                            borderBottom: '1px solid var(--sitamco-border-light)'
                          }}>
                            <td style={{ 
                              padding: '0.75rem 1rem',
                              verticalAlign: 'middle'
                            }}>
                              <strong style={{ 
                                color: 'var(--sitamco-text-primary)',
                                fontSize: '0.9rem',
                                lineHeight: '1.3'
                              }}>
                                {[user.first_name, user.middle_name, user.last_name1, user.last_name2]
                                  .filter(Boolean)
                                  .join(' ')}
                              </strong>
                            </td>
                            <td style={{ 
                              padding: '0.75rem 1rem', 
                              color: 'var(--sitamco-text-primary)',
                              fontSize: '0.85rem',
                              wordBreak: 'break-word',
                              verticalAlign: 'middle'
                            }}>{user.email}</td>
                            <td style={{ 
                              padding: '0.75rem 1rem', 
                              color: 'var(--sitamco-text-primary)',
                              fontSize: '0.85rem',
                              verticalAlign: 'middle'
                            }}>{user.phone || '-'}</td>
                            <td style={{ 
                              padding: '0.75rem 1rem',
                              verticalAlign: 'middle'
                            }}>
                              <code style={{ 
                                color: 'var(--sitamco-text-secondary)',
                                backgroundColor: 'var(--sitamco-bg-secondary)',
                                padding: '0.2rem 0.4rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.8rem',
                                fontFamily: 'monospace'
                              }}>{user.run || 'N/A'}</code>
                            </td>
                            <td style={{ 
                              padding: '0.75rem 1rem',
                              textAlign: 'center',
                              verticalAlign: 'middle'
                            }}>{getStatusBadge(user)}</td>
                            <td style={{ 
                              padding: '0.75rem 1rem', 
                              color: 'var(--sitamco-text-secondary)', 
                              fontSize: '0.8rem',
                              verticalAlign: 'middle'
                            }}>{formatDate(user.signed_at)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
            </div>
          )}
      </div>
    </div>
  )
}

export default Miembros