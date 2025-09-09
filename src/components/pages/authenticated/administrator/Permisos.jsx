import { useState, useEffect } from 'react'
import { getAllPermissions } from '../../../../services/permissionService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'
import './Permisos.css'

/**
 * Permisos component for managing system permissions
 * @param {Object} props - Component props
 * @param {Function} props.onLogout - Logout handler
 * @returns {JSX.Element} Permisos JSX element
 */
function Permisos({ onLogout }) {
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setLoading(true)
        setError('')
        const token = localStorage.getItem(authConfig.tokenKey)
        
        if (!token) {
          setError('No authentication token found')
          return
        }

        const result = await getAllPermissions(token)
        if (result.success && result.permissions) {
          setPermissions(result.permissions)
        } else {
          setError('No se pudieron obtener los permisos')
        }
      } catch (err) {
        if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
          onLogout()
          return
        }
        setError(err.message || 'Error al cargar los permisos')
      } finally {
        setLoading(false)
      }
    }

    fetchPermissions()
  }, [onLogout])

  return (
    <div className="dashboard-content permisos-container">
      {/* Full Height Table Content */}
      <div className="permisos-content">
        
        {loading && (
          <div className="permisos-loading">
            <LoadingSpinner 
              size="md" 
              variant="primary" 
              text="Cargando permisos..." 
            />
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && permissions.length === 0 && (
          <div className="alert alert-info">
            <strong>Sin datos:</strong> No se encontraron permisos registrados.
          </div>
        )}

        {!loading && !error && permissions.length > 0 && (
          <div className="permisos-table-container">
            <table className="table table-hover mb-0 permisos-table">
              <thead className="permisos-table-header">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Recurso</th>
                  <th>Acción</th>
                  <th>Estado</th>
                  <th>Creado</th>
                  <th>Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(permission => (
                  <tr key={permission.id} className="permisos-table-row">
                    <td className="permisos-table-cell">{permission.id}</td>
                    <td className="permisos-table-cell">
                      <strong>{permission.name}</strong>
                    </td>
                    <td className="permisos-table-cell">{permission.description || '-'}</td>
                    <td className="permisos-table-cell">
                      <code>{permission.resource || '-'}</code>
                    </td>
                    <td className="permisos-table-cell">
                      <code>{permission.action || '-'}</code>
                    </td>
                    <td className="permisos-table-cell">
                      <span className={`badge ${permission.active ? 'bg-success' : 'bg-secondary'} text-white`} style={{ fontSize: '0.75rem' }}>
                        {permission.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="permisos-table-cell">{permission.created_at || '-'}</td>
                    <td className="permisos-table-cell">{permission.updated_at || '-'}</td>
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

export default Permisos