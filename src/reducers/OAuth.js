import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'
import { storeToken, clearToken } from '../core/storage'

const initialState = Immutable.fromJS({
  token: null
})

export default createReducer(initialState, {

  [ActionTypes.OAuth.signin](state, {res}) {
    if (!res) {
      return state
    }
    storeToken(res)
    return state.merge({
      token: res
    })
  },


  [ActionTypes.OAuth.signOut](state) {

    clearToken()

    return state.merge({
      token: null
    })
  },

})
