// 保存token
export function saveItem (name, token) {
    window.localStorage.setItem(name, token)
}

// 获取token
export function getItem (name) {
    return window.localStorage.getItem(name)
}

export function getItemObj (name) {
    let item = window.localStorage.getItem(name);
    if (item) return JSON.parse(item);
    return item;
}

export function getToken () {
    let token = getItemObj('authz_db_user_token');
    if (token) return token.accessToken.tokenVal;
    return null;
}

// 删除token
export function removeItem (name) {
    window.localStorage.removeItem(name)
}
