import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../components/App'
import HomeScreen from '../screens/HomeScreen'
import PresetsScreen from '../screens/PresetsScreen'
import PofilesScreen from '../screens/ProfilesScreen'

export const routes = (
  <App>
    <Route exact path="/" component={HomeScreen}/>
    <Route path="/presets" component={PresetsScreen}/>
    <Route path="/profiles" component={PofilesScreen}/>
  </App>
)

export default routes
