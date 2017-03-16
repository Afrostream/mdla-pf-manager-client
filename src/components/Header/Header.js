import React, { Component } from 'react'
import { Layout as LayoutAntd, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import * as LayoutActionCreators from '../../actions/layout'

class Header extends Component {

  toggleSideBar () {
    const {props:{dispatch, Layout}} =this
    let layoutState = Layout.get('state')
    layoutState = layoutState.set('sideBarOpen', !layoutState.get('sideBarOpen'))
    dispatch(LayoutActionCreators.setState(layoutState))
  }

  render () {
    const {props:{Layout}} =this
    const layoutState = Layout.get('state')
    const collapsed = !(layoutState && layoutState.get('sideBarOpen'))

    return (
      <LayoutAntd.Header>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggleSideBar.bind(this)}
        />
        <Menu
          className='header-menu'
          theme="dark"
          mode="horizontal"
          style={{
            float: 'right'
          }}
        >
          {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
          {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
          {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
        </Menu>
      </LayoutAntd.Header>
    )
  }
}

export default connect(({Layout}) => ({Layout}))(Header)
