import { createReducer } from 'redux-create-reducer'
import ActionTypes from '../consts/ActionTypes'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  search: null
});

export default createReducer(initialState, {
  [ActionTypes.Search.search](state, {res}) {
    return state.merge({
      search: res
    })
  }
})
