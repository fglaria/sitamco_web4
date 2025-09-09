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
  const [selectedPermission, setSelectedPermission] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleRowClick = (permission) => {
    setSelectedPermission(permission)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPermission(null)
  }

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
                </tr>
              </thead>
              <tbody>
                {permissions.map(permission => (
                  <tr 
                    key={permission.id} 
                    className="permisos-table-row clickable-row" 
                    onClick={() => handleRowClick(permission)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="permisos-table-cell"><strong>{permission.id}</strong></td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedPermission && (
          <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles del Permiso</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <strong>ID:</strong>
                      <p className="text-muted">{selectedPermission.id}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>Nombre:</strong>
                      <p>{selectedPermission.name}</p>
                    </div>
                    <div className="col-12">
                      <strong>Descripción:</strong>
                      <p>{selectedPermission.description || 'Sin descripción'}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>Recurso:</strong>
                      <p><code>{selectedPermission.resource || 'Sin recurso'}</code></p>
                    </div>
                    <div className="col-md-6">
                      <strong>Acción:</strong>
                      <p><code>{selectedPermission.action || 'Sin acción'}</code></p>
                    </div>
                    <div className="col-md-6">
                      <strong>Estado:</strong>
                      <p>
                        <span className={`badge ${selectedPermission.active ? 'bg-success' : 'bg-secondary'} text-white`}>
                          {selectedPermission.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </p>
                    </div>
                    {selectedPermission.created_at && (
                      <div className="col-md-6">
                        <strong>Creado:</strong>
                        <p className="text-muted">{selectedPermission.created_at}</p>
                      </div>
                    )}
                    {selectedPermission.updated_at && (
                      <div className="col-md-6">
                        <strong>Actualizado:</strong>
                        <p className="text-muted">{selectedPermission.updated_at}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Show all other properties */}
                  <hr />
                  <h6>Todos los datos:</h6>
                  <pre className="p-3 rounded" style={{ 
                    fontSize: '0.85rem',
                    backgroundColor: 'var(--sitamco-bg-secondary)',
                    color: 'var(--sitamco-text-primary)',
                    border: '1px solid var(--sitamco-border-medium)'
                  }}>
                    {JSON.stringify(selectedPermission, null, 2)}
                  </pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Permisos