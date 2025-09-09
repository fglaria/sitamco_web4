import { useState, useEffect } from 'react'
import { getAllRoles } from '../../../../services/roleService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'
import './Roles.css'

/**
 * Roles component for managing user roles
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @returns {JSX.Element} Roles JSX element
 */
function Roles({ onLogout }) {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true)
        setError('')
        const token = localStorage.getItem(authConfig.tokenKey)
        
        if (!token) {
          setError('No authentication token found')
          return
        }

        const result = await getAllRoles(token)
        if (result.success && result.roles) {
          setRoles(result.roles)
        } else {
          setError('No se pudieron obtener los roles')
        }
      } catch (err) {
        if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          onLogout()
          return
        }
        setError(err.message || 'Error al cargar los roles')
      } finally {
        setLoading(false)
      }
    }

    fetchRoles()
  }, [onLogout])

  return (
    <div className="dashboard-content roles-container">
      {/* Full Height Table Content */}
      <div className="roles-content">
        
        {loading && (
          <div className="roles-loading">
            <LoadingSpinner 
              size="md" 
              variant="primary" 
              text="Cargando roles..." 
            />
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && roles.length === 0 && (
          <div className="alert alert-info">
            <strong>Sin datos:</strong> No se encontraron roles registrados.
          </div>
        )}

        {!loading && !error && roles.length > 0 && (
          <div className="roles-table-container">
            <table className="table table-hover mb-0 roles-table">
              <thead className="roles-table-header">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Creado</th>
                  <th>Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.id} className="roles-table-row">
                    <td className="roles-table-cell">{role.id}</td>
                    <td className="roles-table-cell">
                      <strong>{role.name}</strong>
                    </td>
                    <td className="roles-table-cell">{role.description || '-'}</td>
                    <td className="roles-table-cell">
                      <span className={`badge ${role.active ? 'bg-success' : 'bg-secondary'} text-white`} style={{ fontSize: '0.75rem' }}>
                        {role.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="roles-table-cell">{role.created_at || '-'}</td>
                    <td className="roles-table-cell">{role.updated_at || '-'}</td>
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

export default Roles