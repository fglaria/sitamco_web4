/**
 * Application Configuration
 * Centralized configuration for all environment variables and app settings
 * 
 * Environment Variables:
 * - VITE_API_URL: Base API URL (default: http://localhost:8000)
 */


// * API Configuration
export const apiConfig = {
  /** @type {string} Base API URL */
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',

  /** @type {number} Request timeout in milliseconds */
  timeout: 10000,
  
  /** @type {Object} Default headers for API requests */
  headers: {
    'Content-Type': 'application/json'
  }
}

// * Authentication Configuration
export const authConfig = {
  /** @type {string} localStorage key for authentication status */
  authKey: 'isAuthenticated',
  
  /** @type {string} localStorage key for auth token */
  tokenKey: 'authToken',
  
  /** @type {string} localStorage key for user data */
  userKey: 'user'
}

// * Application Configuration
export const appConfig = {
  /** @type {string} Application name */
  name: 'SITAMCO',
  
  /** @type {string} Application version */
  version: '1.0.0',
  
  /** @type {boolean} Development mode flag */
  isDevelopment: import.meta.env.DEV || false,
  
  /** @type {boolean} Production mode flag */
  isProduction: import.meta.env.PROD || false
}
  