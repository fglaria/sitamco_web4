/**
 * User Service
 * Handles all user data management API calls
 */

import { apiConfig, appConfig } from '../config.js'
import * as apiEndpoints from '../constants/apiEndpoints.js'

const { headers, timeout } = apiConfig
const { isDevelopment } = appConfig

/**
 * Get all users
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Users list response
 */
export const getAllUsers = async (token) => {
  try {
    const response = await fetch(apiEndpoints.USERS, {
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
      users: data.users || data,
      message: data.message || 'Users retrieved successfully'
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

    throw new Error(error.message || 'Failed to retrieve users')
  }
}

/**
 * Update user data
 * @param {string} userId - User ID to update
 * @param {Object} userData - User data to update
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Update response
 */
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await fetch(apiEndpoints.USER(userId), {
      method: 'PUT',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      signal: AbortSignal.timeout(timeout)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      user: data.user || data,
      message: data.message || 'User updated successfully'
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

    throw new Error(error.message || 'Failed to update user')
  }
}