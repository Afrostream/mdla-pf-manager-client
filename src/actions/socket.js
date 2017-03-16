import ActionTypes from '../consts/ActionTypes'

export function addResponse (message) {
  return async api => ({
    type: ActionTypes.Socket.addResponse,
    message
  })
}