import { prefix } from '@/utils/utils'
import { getToken } from '@/utils/token'

export function api (path) {
  if (path.startsWith('/')) {
    return `${prefix}${path}?uuid=${getToken()}`
  } else {
    return `${prefix}/${path}?uuid=${getToken()}`
  }
}
