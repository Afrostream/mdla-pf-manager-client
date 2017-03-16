import ActionTypes from '../consts/ActionTypes'

export function search (value) {
  return (api) => {
    return async api => ({
      type: ActionTypes.Search.search,
      res: await api({
        path: `/api/search/`,
        method: 'POST',
        params: {query: value},
        passToken: true
      })
    })
  }
}
