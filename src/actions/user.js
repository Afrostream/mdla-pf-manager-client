import ActionTypes from '../consts/ActionTypes'

export function setUser (user) {
  return {
    type: ActionTypes.User.setUser,
    user
  }
}

export function getProfile () {
  return async (api, getState) => {
    let user = getState().User.get('user')
    if (!user) {
      await api({
        path: `/api/users/me`,
        passToken: true
      }).then((body) => {
        user = body
      })
    }

    if (!user) {
      throw new Error('No user found')
    }

    return {
      type: ActionTypes.User.getProfile,
      user: user
    }
  }
}
