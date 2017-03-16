import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu as MenuAntd, Icon } from 'antd'
import * as LayoutActionCreators from '../../actions/layout'

class Menu extends Component {

  toggleSideBar () {
    const {props:{dispatch, Layout}} =this

    let layoutState = Layout.get('state')
    layoutState = layoutState.set('sideBarOpen', !layoutState.get('sideBarOpen'))
    dispatch(LayoutActionCreators.setState(layoutState))
  }

  renderMenu ({links, parentPath, forceLabel}) {

    const {props:{collapsed}} =this

    parentPath = parentPath || '/'

    return links.map((link, key) => {
      if (link.children) {
        return (
          <MenuAntd.SubMenu key={`sub-menu-${key}`} title={<span>{link.icon ?
            <Icon type={link.icon}/> : ''}
            {!collapsed && link.label}</span>}>
            {this.renderMenu({links: link.children, parentPath: parentPath + link.target + '/', forceLabel: true})}
          </MenuAntd.SubMenu>
        )
      } else {
        return (<MenuAntd.Item key={`menu-${key}`}>
          <Link to={link.target}>
            {link.icon ? <Icon type={link.icon}/> : ''}
            {((!collapsed || forceLabel) && link.label) || ''}
          </Link>
        </MenuAntd.Item>)
      }
    })
  }

  render () {
    const {props:{Layout, collapsed}} =this

    const theme = Layout.get('state').get('theme')

    const links = [
      {
        label: 'Home',
        icon: 'home',
        target: '/'
      },
      {
        label: 'Providers',
        icon: 'cloud',
        target: '/providers'
      },
      {
        label: 'Broadcasters',
        icon: 'skin',
        target: '/broadcasters'
      },
      {
        label: 'Outputs',
        icon: 'cloud',
        children: [{
          label: 'Profiles',
          icon: 'cloud',
          target: '/profiles',
        }, {
          label: 'Presets',
          icon: 'cloud',
          target: '/presets',
        }]
      },
    ]

    return (
      <div className={`menu-content ${theme}`}>
        <div className="logo"><span>PF MANAGER</span></div>
        <MenuAntd {...{theme}} {...this.props} mode={!collapsed ? 'inline' : 'vertical'}>
          {this.renderMenu({links})}
        </MenuAntd>
      </div>
    )
  }
}

Menu.propTypes = {
  collapsed: PropTypes.bool.required
}

Menu.propTypes = {}

export default connect(({Layout}) => ({Layout}))(Menu)
