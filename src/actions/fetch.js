import ActionTypes from '../consts/ActionTypes'

export function fetch (isFetching) {
  return async api => ({
    type: ActionTypes.Fetch.setFetch,
    isFetching
  })
}

export function fetchApi ({method = 'GET', route = '', id = null, params = {}}) {
  return (api) => {
    return async api => ({
      type: ActionTypes.Fetch.fetchApi,
      id,
      method,
      route,
      res: await api({
        path: `/api/${route}${(id && '/' + id) || ''}`,
        method,
        params
      })
    })
  }
}