import config from '../core/config'
const {token} =config

export function clearToken () {
  return localStorage.removeItem(token.user)
}

export function storeToken (oauthData) {
  if (oauthData.access_token) {
    oauthData.expiresAt = new Date(Date.now() + 1000 * (oauthData.expiresIn || oauthData.expires_in)).toISOString()
    localStorage.setItem(token.user, JSON.stringify(oauthData))
  }
  return oauthData
}

export function storeGeo (geoData) {
  if (geoData) {
    localStorage.setItem(token.geo, JSON.stringify(geoData))
  }
  return geoData
}

export function getToken () {
  let storedData = localStorage.getItem(token.user)
  let tokenData = null
  if (storedData) {
    try {
      tokenData = JSON.parse(storedData)
    } catch (err) {
      console.log('deserialize oauth data error')
    }
  }
  return tokenData
}
