import ActionTypes from '../consts/ActionTypes'
import * as  UserActionCreators from './user'

export function signin (form) {
  return async (api, getState, dispatch) => {
    return async api => ({
      type: ActionTypes.OAuth.signin,
      res: await api({path: `/auth/signin`, method: 'POST', params: form})
    })
  }
}


/**
 * Logout user
 * @returns {Function}
 */
export function signOut () {
  return {
    type: ActionTypes.OAuth.signOut
  }
}
