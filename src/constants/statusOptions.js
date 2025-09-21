/**
 * User Status Options and Translations
 * Centralized constants for user status management
 */

export const STATUS_OPTIONS = [
  { value: 'CREATED', label: 'Creado' },
  { value: 'APPLIED', label: 'Postulado' },
  { value: 'ACCEPTED', label: 'Aceptado' },
  { value: 'REGULAR', label: 'Regular' },
  { value: 'REJECTED', label: 'Rechazado' },
  { value: 'REAPPLIED', label: 'Re-postulado' },
  { value: 'SUSPENDED', label: 'Suspendido' },
  { value: 'RESIGNED', label: 'Renunciado' },
  { value: 'EXPELLED', label: 'Expulsado' },
  { value: 'BANNED', label: 'Prohibido' }
]

/**
 * Translate status value to Spanish label
 * @param {string} status - Status value (e.g., 'CREATED')
 * @returns {string} Spanish label or original value
 */
export const translateStatus = (status) => {
  const option = STATUS_OPTIONS.find(opt => opt.value === status)
  return option?.label || status || 'UNKNOWN'
}

/**
 * Get all status options for dropdowns
 * @returns {Array} Array of {value, label} objects
 */
export const getStatusOptions = () => STATUS_OPTIONS