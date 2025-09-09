/**
 * Role Service
 * Handles all role management API calls
 */

import { apiConfig, appConfig } from '../config.js'
import * as apiEndpoints from '../constants/apiEndpoints.js'

const { headers, timeout } = apiConfig
const { isDevelopment } = appConfig

/**
 * Get all roles
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Roles list response
 */
export const getAllRoles = async (token) => {
  try {
    const response = await fetch(apiEndpoints.ROLES, {
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
      roles: data.roles || data,
      message: data.message || 'Roles retrieved successfully'
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

    throw new Error(error.message || 'Failed to retrieve roles')
  }
}