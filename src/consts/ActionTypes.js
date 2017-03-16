import keyMirror from 'keymirror'

export default {
  Layout: keyMirror({
    state: null,
  }),
  Fetch: keyMirror({
    setFetch: null,
    fetchApi: null,
  }),
  Geo: keyMirror({
    geo: null,
  }),
  OAuth: keyMirror({
    refresh: null,
    signin: null,
    signup: null,
    reset: null,
    signOut: null
  }),
  Search: keyMirror({
    search: null,
  }),
  User: keyMirror({
    getProfile: null,
  }),
  Socket: keyMirror({
    addResponse: null,
  })
}
