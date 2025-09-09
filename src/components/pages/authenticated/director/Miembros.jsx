import { useState, useEffect } from 'react'
import { getAllUsers } from '../../../../services/userService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'
import './Miembros.css'

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
    <div className="dashboard-content miembros-container">
      
      {/* Full Height Table Content */}
      <div className="miembros-content">
        
          {loading && (
            <div className="miembros-loading">
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
            <div className="miembros-table-container">
                    <table className="table table-hover mb-0 miembros-table">
                      <thead className="miembros-table-header">
                        <tr>
                          <th className="th-name">Nombre Completo</th>
                          <th className="th-email">Email</th>
                          <th className="th-phone">Teléfono</th>
                          <th className="th-run">RUN</th>
                          <th className="th-status">Vigente</th>
                          <th className="th-date">Ingreso</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} className="miembros-table-row">
                            <td className="miembros-table-cell cell-name">
                              <strong>
                                {[user.first_name, user.middle_name, user.last_name1, user.last_name2]
                                  .filter(Boolean)
                                  .join(' ')}
                              </strong>
                            </td>
                            <td className="miembros-table-cell cell-email">{user.email}</td>
                            <td className="miembros-table-cell cell-phone">{user.phone || '-'}</td>
                            <td className="miembros-table-cell cell-run">
                              <code>{user.run || 'N/A'}</code>
                            </td>
                            <td className="miembros-table-cell cell-status">{getStatusBadge(user)}</td>
                            <td className="miembros-table-cell cell-date">{formatDate(user.signed_at)}</td>
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