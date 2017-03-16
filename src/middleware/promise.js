import _ from 'lodash'
import ActionTypes from '../consts/ActionTypes'

export default function (api, {getState, dispatch}) {

  return next =>
    function _r (action) {

      next({
        type: ActionTypes.Fetch.setFetch,
        isFetching: true
      })

      if (action && _.isFunction(action.then)) {
        return action.then(_r)
      }

      if (_.isFunction(action)) {
        return _r(action((data) => {
          const state = getState()
          //Pass locale to all calls
          const {intl:{defaultLocale}, Geo} = state
          const geo = Geo.get('geo')
          if (defaultLocale) {
            data = _.merge({options: {language: defaultLocale.toUpperCase()}}, data)
          }
          if (geo) {
            const countryCode = geo.get('countryCode')
            if (countryCode) {
              data = _.merge({options: {country: countryCode}}, data)
            }
          }
          return api(data).then((res) => {
            next({
              type: ActionTypes.Fetch.setFetch,
              isFetching: false
            })
            return res
          })
        }, getState, dispatch))
      }

      return next(action)
    }
}
