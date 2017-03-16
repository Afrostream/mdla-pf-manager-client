import ActionTypes from '../consts/ActionTypes'

export function setState (data) {
  return (dispatch, getState) => {
    return {
      type: ActionTypes.Layout.state,
      data
    }
  }
}
