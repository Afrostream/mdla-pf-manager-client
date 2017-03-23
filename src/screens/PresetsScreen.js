import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as FetchActionCreators from '../actions/fetch'
import { Row, Col, Card, Button, Table, Tag, Tooltip, Badge } from 'antd'
import PresetCreateForm from '../components/Forms/PresetCreateForm'
import { getStatusColor, getStatusProgress } from '../core/utils'

class PresetsScreen extends Component {

  state = {
    visible: false,
    fields: {}
  }

  async componentDidMount () {
    const {props: {dispatch}} = this
    await dispatch(FetchActionCreators.fetchApi({route: 'presetmaps'}))
    await dispatch(FetchActionCreators.fetchApi({route: 'providers'}))
    await dispatch(FetchActionCreators.fetchApi({route: 'presets'}))
  }

  showModal () {
    this.setState({visible: true, fields: {}})
  }

  handleCancel () {
    this.setState({visible: false})
  }

  handleCreate () {
    const {form, props: {dispatch}, state: {fields}} = this
    const id = fields._id
    const method = (id && 'PUT') || 'POST'
    form.validateFields((err, params) => {
      if (err) {
        return
      }
      form.resetFields()
      dispatch(FetchActionCreators.fetchApi({
        route: 'presets',
        id,
        method,
        params
      }))
      this.setState({visible: false})
    })
  }

  editPreset (record, index) {
    this.setState({visible: true, fields: record})
  }

  saveFormRef (form) {
    this.form = form
  }

  render () {

    const {props: {Fetch}} = this

    const data = Fetch.get('presets')
    const fields = this.state.fields
    return (
      <div className="presetsScreen">
        <PresetCreateForm
          {...this.props}
          {...fields}
          ref={this.saveFormRef.bind(this)}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onCreate={this.handleCreate.bind(this)}
        />
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Presets list"
                  extra={<Button icon="plus-circle-o" onClick={e => this.showModal()}>Add New</Button>}>
              {data && <Table rowKey="_id"
                              {...{dataSource: data.toJS()}}
                              onRowClick={this.editPreset.bind(this)}
                              size="middle"
                              columns={[{
                                title: 'Name',
                                dataIndex: 'name',
                                key: 'name',
                              }, {
                                title: 'Description',
                                dataIndex: 'description',
                                key: 'description'
                              }, {
                                title: 'Container',
                                dataIndex: 'container',
                                key: 'container'
                              }, {
                                title: 'Profile',
                                dataIndex: 'profile',
                                key: 'profile'
                              }, {
                                title: 'Status',
                                key: 'status',
                                render: (row) => <Badge status={getStatusColor(row.status)} text={row.status}
                                                        strokeWidth={5}/>
                              }, {
                                title: 'Providers',
                                dataIndex: 'mapProvidersPresets',
                                key: 'mapProvidersPresets',
                                render: (record) => (
                                  <div>
                                    {record.map((item) => <Tooltip key={item._id}
                                                                   title={item.statusMessage}><Tag>{` ${item.providerName} `}</Tag></Tooltip>)}
                                  </div>
                                )
                              }]}/>}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

PresetsScreen.propTypes = {}

PresetsScreen.defaultProps = {}

export default withRouter(connect(({Fetch}) => ({Fetch}))(PresetsScreen))
