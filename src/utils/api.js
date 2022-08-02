export const prefix = 'authz-api/v1'
import { getToken } from '@/utils/token'

export function api (path) {
  if (path.startsWith('/')) {
    return `${prefix}${path}?uuid=${getToken()}`
  } else {
    return `${prefix}/${path}?uuid=${getToken()}`
  }
}
