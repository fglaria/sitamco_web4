import { useState } from 'react'
import { loginUser } from '../../services/authService.js'
import { authConfig } from '../../config.js'
import LoadingSpinner from './LoadingSpinner.jsx'

/**
 * Login component that handles user authentication
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Callback function called when login is successful
 * @param {Function} props.onClose - Callback function called when modal should close
 * @returns {JSX.Element} Login form JSX element
 */
function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  /**
   * Handles form submission and validates user credentials via API
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await loginUser(username, password)
      
      if (result.success) {
        console.log('Login successful!')
        
        // Store authentication data
        localStorage.setItem(authConfig.authKey, 'true')
        if (result.token) {
          localStorage.setItem(authConfig.tokenKey, result.token)
        }
        if (result.user) {
          localStorage.setItem(authConfig.userKey, JSON.stringify(result.user))
        }
        
        // Trigger parent component to update state
        if (onLogin) onLogin()
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="modal show d-block modern-login-backdrop" 
      tabIndex="-1" 
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog modal-dialog-centered modern-login-dialog" role="document">
        <div className="modal-content modern-login-content">
          <div className="modal-header modern-login-header">
            <h5 className="modal-title modern-login-title">Sign In</h5>
          </div>
          <div className="modal-body modern-login-body">
            
            {error && (
              <div className="alert alert-danger modern-error-alert" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                  <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="modern-login-form">
              <div className="modern-form-group">
                <label htmlFor="username" className="modern-form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                    <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
                  Username
                </label>
                <input
                  type="text"
                  className="form-control modern-form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="modern-form-group">
                <label htmlFor="password" className="modern-form-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                    <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" fill="currentColor"/>
                  </svg>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control modern-form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn modern-login-btn w-100" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" variant="light" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                      <path d="M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21S3 16.97 3 12 7.03 3 12 3 21 7.03 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>
            
            <div className="modern-login-footer">
              <a href="#forgot-password" className="modern-forgot-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login