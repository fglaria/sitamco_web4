import { useState } from 'react'
import { loginUser } from '../../services/authService.js'
import { authConfig } from '../../config.js'

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

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign In</h5>
            <button 
              type="button" 
              className="close" 
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-muted text-center mb-3">Welcome back to Sitamco</p>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
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
                className="btn btn-primary btn-block" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="text-center mt-3">
              <a href="#forgot-password" className="text-muted">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login