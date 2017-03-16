import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout as LayoutAntd, BackTop } from 'antd'
import { withRouter } from 'react-router'
import Menu from './Menu/Menu'
import Header from './Header/Header'
const {Sider, Content} = LayoutAntd;

class App extends Component {
  render () {
    const {props:{Layout, children}} =this;

    const layoutState = Layout.get('state');
    const theme = layoutState.get('theme');

    const sidebarProps = {
      className: 'sidebar',
      collapsible: true,
      collapsed: !layoutState.get('sideBarOpen'),
      trigger: null
    };

    return (
      <LayoutAntd className={`app ${theme}`}>
        <Sider {...sidebarProps}><Menu collapsed={sidebarProps.collapsed}/></Sider>
        <LayoutAntd>
          <Header/>
          <Content>
            {children}
            <BackTop />
          </Content>
        </LayoutAntd>
      </LayoutAntd>
    )
  }
}

export default withRouter(connect(({Layout, User}) => ({Layout, User}))(App))
