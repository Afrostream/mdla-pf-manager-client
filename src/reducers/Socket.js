import Immutable from 'immutable'
import ActionTypes from '../consts/ActionTypes'
import createReducer from '../core/createReducer'

const initialState = Immutable.fromJS({
  messages: []
})

export default createReducer(initialState, {

  [ActionTypes.Socket.addResponse](state, {message}) {

    const messages = state.get('messages').push(message);
    console.log(`On Soket io add message ${message.type}`)
    return state.merge({
      messages
    })
  }
})
