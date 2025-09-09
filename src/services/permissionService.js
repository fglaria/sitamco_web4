/**
 * Permission Service
 * Handles all permission management API calls
 */

import { apiConfig, appConfig } from '../config.js'
import * as apiEndpoints from '../constants/apiEndpoints.js'

const { headers, timeout } = apiConfig
const { isDevelopment } = appConfig

/**
 * Get all permissions
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Permissions list response
 */
export const getAllPermissions = async (token) => {
  try {
    const response = await fetch(apiEndpoints.PERMISSIONS, {
      method: 'GET',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      signal: AbortSignal.timeout(timeout)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      permissions: data.permissions || data,
      message: data.message || 'Permissions retrieved successfully'
    }
  } catch (error) {
    if (error.name === 'TimeoutError') {
      let message = 'Request timeout. Please try again.'
      message = isDevelopment ? `${message} (${error})` : message
      throw new Error(message)
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      let message = 'Unable to connect to server. Please check your connection.'
      message = isDevelopment ? `${message} (${error})` : message
      throw new Error(message)
    }

    throw new Error(error.message || 'Failed to retrieve permissions')
  }
}