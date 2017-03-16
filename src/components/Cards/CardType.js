import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as FetchActionCreators from '../../actions/fetch'
import { Card, Table, Button } from 'antd'

class CardType extends Component {

  componentDidMount () {
    const {props:{dispatch, path}} =this
    dispatch(FetchActionCreators.fetchApi({route: path}))
  }

  renderTable () {

    let {props:{Fetch, columns, title, path}} = this
    const dataSource = Fetch.get(path)
    const data = dataSource && dataSource.toJS()
    columns.push({
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={ e => history.push(`/${path}/${record._id || record.name}`)} shape="circle"
                icon="eye" size="default"/>
      )
    })

    return ( data && <Table rowKey="_id" {...{columns, dataSource: data}} size="middle"/> ||
    <p>No {path}</p>)
  }

  renderInfo () {
    return <div />
  }

  renderContent () {

    let {props:{type}} = this

    switch (type) {
      case 'table':
        return this.renderTable()
      default:
        return this.renderInfo()
    }
  }

  render () {

    const {props:{Fetch, path, title}} =this

    const data = Fetch.get(path)

    return (
      <Card {...{title}} extra={<Link to={path}>Voir</Link>}>
        {(data && this.renderContent(data))}
      </Card>
    )
  }
}

CardType.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  columns: PropTypes.array,
  content: PropTypes.object,
  type: React.PropTypes.oneOf(['table', 'info'])
};

CardType.defaultProps = {
  columns: [],
  content: {},
  type: 'table'
};

export default withRouter(connect(({Fetch}) => ({Fetch}))(CardType))
