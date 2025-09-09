const baseUrl = '/api'

export const AUTH = `${baseUrl}/auth/`
export const AUTH_LOGIN = `${AUTH}login`
export const AUTH_VALIDATE = `${AUTH}validate`
export const AUTH_ME = `${AUTH}me`
export const AUTH_LOGOUT = `${AUTH}logout`
export const AUTH_CHANGE_PASSWORD = `${AUTH}change-password`

export const USERS = `${baseUrl}/user/`
export const USER = (userId = '') => { return `${USERS}${userId}` }
export const USER_ROLES = (userId) => { return `${USERS}${userId}/roles` }
export const USER_PASSWORD = (userId) => { return `${USERS}${userId}/password` }
export const USER_EMAIL = (userId) => { return `${USERS}${userId}/email` }
export const USER_ROLE = `${USERS}roles/`
export const USER_ROLE_BY_NAME = (roleName) => { return `${USER_ROLE}${roleName}` }
export const USER_ROLE_BY_ID = (roleId) => { return `${USER_ROLE}${roleId}` }
export const USER_PERMISSION = `${USERS}permission/`
export const USER_PERMISSION_BY_NAME = (permissionName) => { return `${USER_PERMISSION}${permissionName}` }

export const ROLES = `${baseUrl}/role/`
export const ROLE = (role_id) => { return `${ROLES}${role_id}` }

export const PERMISSIONS = `${baseUrl}/permission/`
export const PERMISSION = (permission_id) => { return `${PERMISSIONS}${permission_id}` }
