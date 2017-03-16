import { match } from 'react-router'
import _ from 'lodash'

let router
let routes

export default {
  init: function (props) {

    // Store the history and routes objects to be used in the resolve method.
    // they are private variables.
    router = props.router
    routes = props.routes
  },
  navigate: function (path) {

    // Uses the history object to navigate.
    // Any other library may handle the navigation just updating the location
    // like:
    // location.href = path;
    router.push(path)
  },
  resolve: function (location, callback) {
    match({routes, location}, (err, redirect, renderProps) => {

      let {routes} = renderProps
      // We return the second level route's component, since the Tiles component
      // is used in the first lever route. Your app may update this function to
      // make route matching working ok.

      //const component = _.find(routes, (comp) => {
      //  return comp.path === location.pathname
      //})

      //callback(component)
      callback(routes[1].component)

    })
  }
}
