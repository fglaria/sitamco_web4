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
  const [selectedRole, setSelectedRole] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleRowClick = (role) => {
    setSelectedRole(role)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedRole(null)
  }

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
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr 
                    key={role.id} 
                    className="roles-table-row clickable-row" 
                    onClick={() => handleRowClick(role)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="roles-table-cell"><strong>{role.id}</strong></td>
                    <td className="roles-table-cell">
                      <strong>{role.name}</strong>
                    </td>
                    <td className="roles-table-cell">{role.description || '-'}</td>
                    <td className="roles-table-cell">
                      <span className={`badge ${role.active ? 'bg-success' : 'bg-secondary'} text-white`} style={{ fontSize: '0.75rem' }}>
                        {role.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedRole && (
          <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalles del Rol</h5>
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
                      <p className="text-muted">{selectedRole.id}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>Nombre:</strong>
                      <p>{selectedRole.name}</p>
                    </div>
                    <div className="col-12">
                      <strong>Descripción:</strong>
                      <p>{selectedRole.description || 'Sin descripción'}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>Estado:</strong>
                      <p>
                        <span className={`badge ${selectedRole.active ? 'bg-success' : 'bg-secondary'} text-white`}>
                          {selectedRole.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </p>
                    </div>
                    {selectedRole.created_at && (
                      <div className="col-md-6">
                        <strong>Creado:</strong>
                        <p className="text-muted">{selectedRole.created_at}</p>
                      </div>
                    )}
                    {selectedRole.updated_at && (
                      <div className="col-md-6">
                        <strong>Actualizado:</strong>
                        <p className="text-muted">{selectedRole.updated_at}</p>
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
                    {JSON.stringify(selectedRole, null, 2)}
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

export default Roles