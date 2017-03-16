import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'
import * as FetchActionCreators from '../../actions/fetch'
import { Card, Table, Button, Select, Icon, Badge, Dropdown, Tooltip, Progress, Row, Col, Menu, Popconfirm } from 'antd'
import { getStatusColor, getStatusProgress } from '../../core/utils'

const {Column, ColumnGroup} = Table
const Option = Select.Option

class CardContent extends Component {

  componentDidMount () {
    const {props:{dispatch, path}} =this
    dispatch(FetchActionCreators.fetchApi({route: path}))
  }

  getMediaInfo (data) {
    const {props:{dispatch}} =this
    data.dirty = true
    dispatch(FetchActionCreators.fetchApi({route: `contents/${data._id}/mediaInfo`}))
  }

  updateBroadcasters (data, value) {
    const {props:{dispatch, Fetch}} =this
    data.dirty = true
    const broadcasters = Fetch.get('broadcasters')
    data.broadcasters = broadcasters.filter((bc => {
      return _.indexOf(value, bc.get('_id'))
    })).toJS()
    dispatch(FetchActionCreators.fetchApi({route: `contents`, id: data._id, method: 'PUT', params: data}))
  }

  startNewJob (data) {
    const {props:{dispatch}} =this
    data.dirty = true
    dispatch(FetchActionCreators.fetchApi({route: 'jobs', method: 'POST', params: {contentId: data._id}}))
  }

  updateJob (arg, data) {
    switch (arg.key) {
      case 'update':
        return this.getJobStatus(data)
      case 'restart':
        return this.restartJob(data)
    }
  }

  getJobStatus (data) {
    const {props:{dispatch}} =this
    data.dirty = true
    dispatch(FetchActionCreators.fetchApi({
      route: `jobs/${data._id}/status`
    }))
  }

  deleteJob (data) {
    const {props:{dispatch}} =this
    data.dirty = true
    dispatch(FetchActionCreators.fetchApi({
      route: `jobs/${data._id}`,
      method: 'DELETE'
    }))
  }

  restartJob (data) {
    const {props:{dispatch}} =this
    data.dirty = true
    dispatch(FetchActionCreators.fetchApi({
      route: `jobs`,
      id: data._id,
      method: 'PUT'
    }))
  }

  expandedRowRender (record) {

    const menu = (
      <Menu onClick={e => this.updateJob(e, record)}>
        <Menu.Item key="update">
          Update status
        </Menu.Item>
        <Menu.Item key="restart">
          Restart Job
        </Menu.Item>
      </Menu>
    )

    const columns = [
      {title: 'Date', dataIndex: 'createdAt', key: 'createdAt'},
      {title: 'Provider', dataIndex: 'providerName', key: 'providerName'},
      {title: 'Encoding Id', dataIndex: 'encodingId', key: 'encodingId'},
      {
        title: 'Status',
        key: 'status',
        render: (row) => <Badge status={getStatusColor(row.status)} text={row.status} strokeWidth={5}/>
      },
      {
        title: 'Progress',
        key: 'progress',
        render: (row) => <Progress status={getStatusProgress(row.status)} percent={row.progress} strokeWidth={5}/>
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (row) => (
          <span className={'table-operation'}>
            <Popconfirm title="Are you sure delete this job?" onConfirm={e => this.deleteJob(row)}
                        okText="Yes"
                        cancelText="No">
              <a href="#">Stop</a>
            </Popconfirm>
            <Dropdown overlay={menu}>
              <a href="#">
                More <Icon type="down"/>
              </a>
            </Dropdown>
          </span>
        ),
      },
    ]

    const data = record.jobs || []

    return (
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  }

  render () {

    const {props:{Fetch, path, title, router, history, dispatch}} =this
    const data = Fetch.get(path)
    const broadcasters = Fetch.get('broadcasters')

    const broadcastersList = (broadcasters && _.map(broadcasters.toJS(), (broadcaster) => <Option
        key={broadcaster._id}>{broadcaster.name}</Option>
      )) || []

    return (
      <Card {...{title}} extra={<Link to={path}>Voir</Link>}>
        {(data && <Table
          className="table-expanded"
          dataSource={data.toJS()}
          rowKey="_id"
          size="middle"
          expandedRowRender={record => this.expandedRowRender(record)}
          columns={[
            {
              title: 'Id',
              dataIndex: '_id',
              key: '_id',
            }, {
              title: 'Content Id',
              dataIndex: 'contentId',
              key: 'contentId',
            }, {
              title: 'Type',
              dataIndex: 'contentType',
              key: 'contentType',
            }, {
              title: 'Source Url',
              dataIndex: 'contentUrl',
              key: 'contentUrl',
            }, {
              render: (text, record) => (
                <Tooltip placement="left" title="Fetch Mediainfo">
                  <Select multiple
                          onChange={value => this.updateBroadcasters(record, value)}
                          searchPlaceholder="Broadcasters"
                          defaultValue={record.broadcasters.map(bc => bc._id).toString() || []}>
                    {broadcastersList}
                  </Select>
                </Tooltip>
              )
            }, {
              render: (text, record) => (
                <Tooltip placement="left" title="Fetch Mediainfo">
                  <Button onClick={ e => this.getMediaInfo(record)}
                          loading={record.dirty}
                          shape="circle"
                          type={record.mediaInfo ? 'primary' : 'default'}
                          icon="barcode" size="default"/>
                </Tooltip>
              )
            }, {
              render: (text, record) => (
                <Tooltip placement="left" title="Start Transcoding">
                  <Badge count={record.jobs.length}>
                    <Button disabled={!record.mediaInfo} onClick={ e => this.startNewJob(record)}
                            loading={record.dirty}
                            shape="circle"
                            icon="rocket" size="default"/>
                  </Badge>
                </Tooltip>
              )
            }, {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <Button onClick={ e => history.push(`/contents/${record._id}`)} shape="circle"
                        icon="eye" size="default"/>
              )
            }]}>
        </Table>)}
      </Card>
    )
  }
}

CardContent.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
};

CardContent.defaultProps = {
  title: 'Contents list',
  path: 'contents'
};

export default withRouter(connect(({Fetch}) => ({Fetch}))(CardContent))
