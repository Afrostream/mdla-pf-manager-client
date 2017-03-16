import { createReducer } from 'redux-create-reducer'
import ActionTypes from '../consts/ActionTypes'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  user: null
});

export default createReducer(initialState, {
  [ActionTypes.User.getProfile](state, {user}) {
    return state.merge({
      [`user`]: user
    })
  }
})
