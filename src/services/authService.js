/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiConfig, appConfig } from '../config.js'
import * as apiEndpoints from '../constants/apiEndpoints.js'

const { headers, timeout } = apiConfig
const { isDevelopment } = appConfig

/**
 * Login user with credentials
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<Object>} Login response
 */
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(apiEndpoints.AUTH_LOGIN, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'email': username,
        'password': password
      }),
      signal: AbortSignal.timeout(timeout)
    })
    console.log(response)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      data: data,
      token: data.token || data.access_token,
      user: data.user
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
    
    throw error || new Error('Login failed. Please try again.')
  }
}

/**
 * Validate stored authentication token
 * @param {string} token - Authentication token
 * @returns {Promise<boolean>} Whether token is valid
 */
export const validateToken = async (token) => {
  try {
    const response = await fetch(apiEndpoints.AUTH_VALIDATE, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      signal: AbortSignal.timeout(timeout)
    })

    return response.ok
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

/**
 * Fetch current user data from auth/me endpoint
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} User data
 */
export const getUserData = async (token) => {
  try {
    const response = await fetch(apiEndpoints.AUTH_ME, {
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
      data: data,
      user: data.user || data
    }
  } catch (error) {
    console.error('Get user data error:', error)
    
    if (error.name === 'TimeoutError') {
      throw new Error('Request timeout. Please try again.')
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your connection.')
    }
    
    throw new Error(error.message || 'Failed to fetch user data.')
  }
}


/**
 * Change user password
 * @param {string} token - Authentication token
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Change password response
 */
export const changePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await fetch(apiEndpoints.AUTH_CHANGE_PASSWORD, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        'current': currentPassword,
        'new': newPassword
      }),
      signal: AbortSignal.timeout(timeout)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      message: data.message || 'Password changed successfully'
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
    
    throw error || new Error('Failed to change password. Please try again.')
  }
}

/**
 * Get all users (Admin only)
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
 * Logout user (if API endpoint exists)
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const logoutUser = async (token) => {
  try {
    await fetch(apiEndpoints.AUTH_LOGOUT, {
      method: 'POST',
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      },
      signal: AbortSignal.timeout(timeout)
    })
  } catch (error) {
    console.error('Logout error:', error)
    // Don't throw error for logout - just log it
  }
}
