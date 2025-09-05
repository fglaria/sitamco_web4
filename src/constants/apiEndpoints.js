const baseUrl = '/api'

export const apiEndpoints = {
  AUTH: {
    LOGIN: `${baseUrl}/auth/login`,
    VALIDATE: `${baseUrl}/auth/validate`,
    ME: `${baseUrl}/auth/me`,
    LOGOUT: `${baseUrl}/auth/logout`,
    CHANGE_PASSWORD: `${baseUrl}/auth/change-password`
  },
  USER: {
    GET: `${baseUrl}/user/`,
  }
}
