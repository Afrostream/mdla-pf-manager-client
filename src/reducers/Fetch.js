import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'
import { message } from 'antd';

const initialState = Immutable.fromJS({
  isFetching: null
})

export default createReducer(initialState, {

  [ActionTypes.Fetch.setFetch](state, {isFetching}) {
    return state.merge({
      isFetching
    })
  },

  [ActionTypes.Fetch.fetchApi](state, {route, method, id, res}) {
    switch (method) {
      case 'PUT':
      case 'POST':
      case 'DELETE':
        message.success(`Api ${method} ${route} success ${(id && 'id : ' + id) || ''}`, 10);
        break;
      default:
        break
    }
    switch (method) {
      case 'PUT':
        const index = state.get(route).findIndex(item => item.get('_id') == id)
        return state.update(route, list => list.set(index, Immutable.fromJS(res)))
      case 'POST':
        return state.update(route, list => list.concat(Immutable.fromJS([res])))
      case 'DELETE':
        return state.update(route, list => list.delete(list.findIndex((item) => item.get('_id') == id)))
      default:
        return state.merge({
          [route]: res
        })
    }
  },

})
