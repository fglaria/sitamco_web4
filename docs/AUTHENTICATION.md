# Authentication Configuration

This document explains how authentication is configured and used in the SITAMCO web application.

## Environment Variables

The authentication system uses environment variables for configuration. These must be defined in your `.env` file:

### Required Variables

```env
# Base API URL - where your backend server is running
VITE_API_URL=http://localhost:8000

# Login endpoint path - the authentication endpoint on your server
VITE_API_LOGIN_ENDPOINT=/auth/login
```

### Variable Details

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_URL` | Base URL of your API server | `http://localhost:8000` | `https://api.sitamco.cl` |
| `VITE_API_LOGIN_ENDPOINT` | Login endpoint path | `/auth/login` | `/api/v1/auth/login` |

> **Note**: All environment variables must be prefixed with `VITE_` to be accessible in the React application when using Vite.

## Configuration Architecture

The application uses a centralized configuration approach where all environment variables are loaded in a single place.

### Configuration File (`src/config/config.js`)

All environment variables and application settings are centralized in this file:

```javascript
import config, { getLoginUrl, getValidateUrl, getLogoutUrl } from '../config/config.js'
```

The config object structure:

```javascript
const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    endpoints: { /* ... */ },
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  },
  auth: {
    authKey: 'isAuthenticated',
    tokenKey: 'authToken', 
    userKey: 'user'
  },
  app: {
    name: 'SITAMCO',
    version: '1.0.0',
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD
  }
}
```

### Helper Functions

The config file provides URL helper functions:

- `getLoginUrl()` - Returns full login endpoint URL
- `getValidateUrl()` - Returns full token validation URL  
- `getLogoutUrl()` - Returns full logout endpoint URL
- `getApiUrl(endpoint)` - Returns full URL for any endpoint

## Authentication Service (`src/services/authService.js`)

The authentication service imports configuration from the centralized config:

### Available Functions

#### `loginUser(username, password)`

Authenticates a user with the API.

**Parameters:**
- `username` (string): User's username
- `password` (string): User's password

**Returns:** Promise that resolves to:
```javascript
{
  success: true,
  data: { /* API response data */ },
  token: "jwt-token-string",
  user: { /* user object */ }
}
```

**Expected API Response Format:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@sitamco.cl"
  },
  "message": "Login successful"
}
```

#### `validateToken(token)`

Validates a stored authentication token with the server.

**Parameters:**
- `token` (string): JWT token to validate

**Returns:** Promise that resolves to boolean (true if valid)

#### `logoutUser(token)`

Logs out a user on the server side (optional endpoint).

**Parameters:**
- `token` (string): JWT token for the session to logout

**Returns:** Promise (doesn't throw errors, only logs them)

### Error Handling

The service provides comprehensive error handling:

- **Network Errors**: "Unable to connect to server. Please check your connection."
- **Timeout Errors**: "Request timeout. Please try again."
- **Server Errors**: Uses the error message from the API response
- **Generic Errors**: "Login failed. Please try again."

## Usage in Components

### Login Component

The Login component imports both the auth service and config:

```javascript
import { loginUser } from '../../services/authService.js'
import config from '../../config/config.js'

// In component
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  try {
    const result = await loginUser(username, password)
    
    if (result.success) {
      // Store authentication data using config keys
      localStorage.setItem(config.auth.authKey, 'true')
      localStorage.setItem(config.auth.tokenKey, result.token)
      localStorage.setItem(config.auth.userKey, JSON.stringify(result.user))
      
      // Trigger parent component update
      if (onLogin) onLogin()
    }
  } catch (error) {
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
}
```

### App Component

The App component imports both the auth service and config:

```javascript
import { logoutUser } from './services/authService.js'
import config from './config/config.js'

const handleLogout = async () => {
  const token = localStorage.getItem(config.auth.tokenKey)
  
  // Call logout API if token exists
  if (token) {
    try {
      await logoutUser(token)
    } catch (error) {
      console.error('Logout API call failed:', error)
    }
  }
  
  // Clear all authentication data using config keys
  localStorage.removeItem(config.auth.authKey)
  localStorage.removeItem(config.auth.tokenKey)
  localStorage.removeItem(config.auth.userKey)
  
  setIsAuthenticated(false)
}
```

## Local Storage

The application stores authentication data in localStorage:

| Key | Description | Example Value | Config Reference |
|-----|-------------|---------------|------------------|
| `isAuthenticated` | Boolean flag | `"true"` or `"false"` | `config.auth.authKey` |
| `authToken` | JWT token | `"eyJhbGciOiJIUzI1NiIs..."` | `config.auth.tokenKey` |
| `user` | User object (JSON string) | `'{"id":1,"username":"admin"}'` | `config.auth.userKey` |

> **Note**: All localStorage keys are defined in the config file and should be accessed through `config.auth.*` properties.

## Development Setup

1. **Create `.env` file** in project root:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_API_LOGIN_ENDPOINT=/auth/login
   ```

2. **Start your backend server** on the configured URL

3. **Run the React application**:
   ```bash
   npm run dev
   ```

## Production Setup

1. **Set production environment variables** in your deployment platform:
   ```env
   VITE_API_URL=https://api.sitamco.cl
   VITE_API_LOGIN_ENDPOINT=/auth/login
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   ```

## Security Considerations

- JWT tokens are stored in localStorage (consider httpOnly cookies for enhanced security)
- All API calls use HTTPS in production
- Request timeout prevents hanging connections
- Proper error handling prevents information disclosure
- Token validation helps detect expired/invalid tokens

## Troubleshooting

### Common Issues

**"Unable to connect to server"**
- Check if `VITE_API_URL` matches your running backend
- Verify CORS configuration on your backend
- Ensure backend server is running

**"Request timeout"**
- Check network connectivity
- Verify backend server is responding
- Consider increasing timeout in `API_CONFIG`

**Environment variables not working**
- Ensure variables are prefixed with `VITE_`
- Restart development server after changing `.env`
- Check that `.env` file is in project root

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
VITE_DEBUG=true
```