import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as FetchActionCreators from '../actions/fetch'
import { Row, Col, Card, Button, Table, Tag, Badge } from 'antd'
import ProfileCreateForm from '../components/Forms/ProfileCreateForm'

class PofilesScreen extends Component {

  state = {
    visible: false,
    fields: {}
  }

  async componentDidMount () {
    const {props:{dispatch}} =this
    await dispatch(FetchActionCreators.fetchApi({route: 'presets'}))
    await dispatch(FetchActionCreators.fetchApi({route: 'profiles'}))
  }

  showModal () {
    this.setState({visible: true, fields: {}})
  }

  handleCancel () {
    this.setState({visible: false})
  }

  handleCreate () {
    const {form, props:{dispatch}, state:{fields}} = this
    const id = fields._id
    const method = (id && 'PUT') || 'POST'
    form.validateFields((err, params) => {
      if (err) {
        return
      }
      form.resetFields()
      dispatch(FetchActionCreators.fetchApi({
        route: 'profiles',
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

    const {props:{Fetch}} =this

    const data = Fetch.get('profiles')
    const fields = this.state.fields
    return (
      <div className="profilesScreen">
        <ProfileCreateForm
          {...this.props}
          {...fields}
          ref={this.saveFormRef.bind(this)}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onCreate={this.handleCreate.bind(this)}
        />
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Profiles list"
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
                                title: 'Presets',
                                dataIndex: 'presets',
                                key: 'presets',
                                render: (record) => (
                                  <div>
                                    {record.map((item) => <Tag key={item._id}>{` ${item.name} `}</Tag>)}
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

PofilesScreen.propTypes = {}

PofilesScreen.defaultProps = {}

export default withRouter(connect(({Fetch}) => ({Fetch}))(PofilesScreen))
