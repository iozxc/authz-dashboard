export function saveToken (token) {
  window.localStorage.setItem('authz_db_uuid', token)
}

export function getToken () {
  return window.localStorage.getItem('authz_db_uuid')
}

// 删除token
export function removeToken () {
  window.localStorage.removeItem('authz_db_uuid')
}
