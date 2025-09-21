import { useState, useEffect } from 'react'
import { getAllUsers, updateUser } from '../../../../services/userService.js'
import { authConfig } from '../../../../config.js'
import LoadingSpinner from '../../../ui/LoadingSpinner.jsx'
import { STATUS_OPTIONS, translateStatus } from '../../../../constants/statusOptions.js'
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
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [originalUser, setOriginalUser] = useState(null)
  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleRowClick = (user) => {
    setSelectedUser(user)
    setEditedUser({ ...user })
    setOriginalUser({ ...user })
    setIsEditing(false)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
    setEditedUser(null)
    setOriginalUser(null)
    setIsEditing(false)
    setSaveError('')
  }

  const sortUsers = (users, field, direction) => {
    return [...users].sort((a, b) => {
      let aValue = a[field]
      let bValue = b[field]
      
      // Handle different data types
      if (field === 'id') {
        aValue = parseInt(aValue) || 0
        bValue = parseInt(bValue) || 0
      } else if (field === 'name') {
        // Sort by full name
        aValue = [a.first_name, a.middle_name, a.last_name1, a.last_name2]
          .filter(Boolean).join(' ').toLowerCase()
        bValue = [b.first_name, b.middle_name, b.last_name1, b.last_name2]
          .filter(Boolean).join(' ').toLowerCase()
      } else if (field === 'active') {
        aValue = a.active ? 1 : 0
        bValue = b.active ? 1 : 0
      } else {
        // String fields
        aValue = (aValue || '').toString().toLowerCase()
        bValue = (bValue || '').toString().toLowerCase()
      }
      
      if (direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }

  const handleSort = (field) => {
    const newDirection = 
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc'
    
    setSortField(field)
    setSortDirection(newDirection)
    
    const sortedUsers = sortUsers(users, field, newDirection)
    setUsers(sortedUsers)
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️'
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  const hasChanges = () => {
    if (!editedUser || !originalUser) return false
    
    // Compare relevant fields (exclude system fields like created_at, updated_at)
    const fieldsToCompare = [
      'first_name', 'middle_name', 'last_name1', 'last_name2',
      'email', 'run', 'phone', 'active', 'status'
    ]
    
    return fieldsToCompare.some(field => {
      const editedValue = editedUser[field] ?? ''
      const originalValue = originalUser[field] ?? ''
      return editedValue !== originalValue
    })
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser({ ...originalUser })
      setSaveError('')
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveError('')
      
      const token = localStorage.getItem(authConfig.tokenKey)
      if (!token) {
        setSaveError('No authentication token found')
        return
      }

      const result = await updateUser(editedUser.id, editedUser, token)
      
      if (result.success) {
        // Update the user in the users list and maintain sorting
        const updatedUsers = users.map(user => 
          user.id === editedUser.id ? { ...editedUser } : user
        )
        const sortedUsers = sortUsers(updatedUsers, sortField, sortDirection)
        setUsers(sortedUsers)
        
        // Update selected user and original data
        setSelectedUser(editedUser)
        setOriginalUser({ ...editedUser })
        setIsEditing(false)
      } else {
        setSaveError('Failed to update user')
      }
    } catch (err) {
      // Check for 401 error and redirect to public site
      if (err.message && (err.message.includes('401') || err.message.includes('Unauthorized'))) {
        onLogout()
        return
      }
      setSaveError(err.message || 'Error updating user')
    } finally {
      setSaving(false)
    }
  }

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
          // Apply default sorting by ID ascending
          const sortedUsers = sortUsers(result.users, 'id', 'asc')
          setUsers(sortedUsers)
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
    
    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'center' }}>
        <span 
          className={`badge ${isActive ? 'bg-success' : 'bg-danger'} text-white`} 
          style={{ fontSize: '0.7rem' }}
        >
          {isActive ? 'Activo' : 'Inactivo'}
        </span>
        <span 
          className="badge bg-secondary text-white" 
          style={{ fontSize: '0.7rem' }}
        >
          {status}
        </span>
      </div>
    )
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
                          <th 
                            className="th-id sortable-header" 
                            onClick={() => handleSort('id')}
                            style={{ cursor: 'pointer' }}
                          >
                            ID {getSortIcon('id')}
                          </th>
                          <th 
                            className="th-name sortable-header" 
                            onClick={() => handleSort('name')}
                            style={{ cursor: 'pointer' }}
                          >
                            Nombre Completo {getSortIcon('name')}
                          </th>
                          <th 
                            className="th-email sortable-header" 
                            onClick={() => handleSort('email')}
                            style={{ cursor: 'pointer' }}
                          >
                            Email {getSortIcon('email')}
                          </th>
                          <th 
                            className="th-phone sortable-header" 
                            onClick={() => handleSort('phone')}
                            style={{ cursor: 'pointer' }}
                          >
                            Teléfono {getSortIcon('phone')}
                          </th>
                          <th 
                            className="th-active sortable-header" 
                            onClick={() => handleSort('active')}
                            style={{ cursor: 'pointer' }}
                          >
                            Activo {getSortIcon('active')}
                          </th>
                          <th 
                            className="th-status sortable-header" 
                            onClick={() => handleSort('status')}
                            style={{ cursor: 'pointer' }}
                          >
                            Estado {getSortIcon('status')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr 
                            key={user.id} 
                            className="miembros-table-row clickable-row" 
                            onClick={() => handleRowClick(user)}
                            style={{ cursor: 'pointer' }}
                          >
                            <td className="miembros-table-cell cell-id">{user.id}</td>
                            <td className="miembros-table-cell cell-name">
                              <strong>
                                {[user.first_name, user.middle_name, user.last_name1, user.last_name2]
                                  .filter(Boolean)
                                  .join(' ')}
                              </strong>
                            </td>
                            <td className="miembros-table-cell cell-email">{user.email}</td>
                            <td className="miembros-table-cell cell-phone">{user.phone || '-'}</td>
                            <td className="miembros-table-cell cell-active">
                              <span 
                                className={`badge ${user.active ? 'bg-success' : 'bg-danger'} text-white`} 
                                style={{ fontSize: '0.7rem' }}
                              >
                                {user.active ? 'Sí' : 'No'}
                              </span>
                            </td>
                            <td className="miembros-table-cell cell-status">
                              <span 
                                className="badge bg-secondary text-white" 
                                style={{ fontSize: '0.7rem' }}
                              >
                                {translateStatus(user.status)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
            </div>
          )}

          {/* Modal */}
          {showModal && selectedUser && (
            <div className="modal show" style={{ display: 'block' }} onClick={closeModal}>
              <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Detalles del Miembro</h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={closeModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body p-4">
                    {saveError && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error:</strong> {saveError}
                        <button 
                          type="button" 
                          className="btn-close" 
                          onClick={() => setSaveError('')}
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    <form>
                      <div className="row g-3">
                        {/* Left Column */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label small text-muted">ID</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.id || ''} 
                              disabled 
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">Primer Nombre</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.first_name || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('first_name', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">Segundo Nombre</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.middle_name || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('middle_name', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">Primer Apellido</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.last_name1 || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('last_name1', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">Segundo Apellido</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.last_name2 || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('last_name2', e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label small text-muted">Email</label>
                            <input 
                              type="email" 
                              className="form-control form-control-sm" 
                              value={editedUser?.email || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">RUN</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm font-monospace" 
                              value={editedUser?.run || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('run', e.target.value)}
                            />
                          </div>
                          
                          <div className="mb-3">
                            <label className="form-label small text-muted">Teléfono</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={editedUser?.phone || ''} 
                              disabled={!isEditing}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                          </div>
                          
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label className="form-label small text-muted">Activo</label>
                                <select 
                                  className="form-select form-select-sm" 
                                  value={editedUser?.active || false} 
                                  disabled={!isEditing}
                                  onChange={(e) => handleInputChange('active', e.target.value === 'true')}
                                >
                                  <option value={true}>Activo</option>
                                  <option value={false}>Inactivo</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label className="form-label small text-muted">Estado</label>
                                <select 
                                  className="form-select form-select-sm" 
                                  value={editedUser?.status || ''} 
                                  disabled={!isEditing}
                                  onChange={(e) => handleInputChange('status', e.target.value)}
                                >
                                  <option value="">Seleccionar estado</option>
                                  {STATUS_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          {editedUser?.signed_at && (
                            <div className="mb-3">
                              <label className="form-label small text-muted">Fecha de Ingreso</label>
                              <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={formatDate(editedUser.signed_at)} 
                                disabled 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </form>

                    {/* Collapsible JSON Data */}
                    <div className="mt-4">
                      <button 
                        className="btn btn-outline-secondary btn-sm w-100" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#jsonData" 
                        aria-expanded="false"
                      >
                        Ver datos completos (JSON)
                      </button>
                      <div className="collapse mt-2" id="jsonData">
                        <pre className="p-3 rounded small" style={{ 
                          maxHeight: '300px',
                          overflowY: 'auto',
                          fontSize: '0.8rem',
                          backgroundColor: 'var(--sitamco-bg-secondary)',
                          color: 'var(--sitamco-text-primary)',
                          border: '1px solid var(--sitamco-border-medium)',
                          lineHeight: '1.4'
                        }}>
                          {JSON.stringify(selectedUser, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="d-flex gap-2 w-100 justify-content-end">
                      {!isEditing ? (
                        <>
                          <button 
                            type="button" 
                            className="btn btn-outline-primary"
                            onClick={handleEditToggle}
                          >
                            Editar
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cerrar
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            type="button" 
                            className="btn btn-success"
                            onClick={handleSave}
                            disabled={saving || !hasChanges()}
                          >
                            {saving ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                                Guardando...
                              </>
                            ) : (
                              'Guardar'
                            )}
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleEditToggle}
                            disabled={saving}
                          >
                            Cancelar
                          </button>
                        </>
                      )}
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