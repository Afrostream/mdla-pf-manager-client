import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'

const initialState = Immutable.fromJS({
  'geo': null
})

export default createReducer(initialState, {

  [ActionTypes.Geo.getgeo](state, {geo}) {
    return state.merge({
      geo
    })
  }
})
