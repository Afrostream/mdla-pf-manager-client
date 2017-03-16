import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getStatusProgress } from '../core/utils'
import * as FetchActionCreators from '../actions/fetch'
import { Progress, Card, Table, Icon, Row, Col, Button, Select, Input } from 'antd'
import CardType from '../components/Cards/CardType'
import CardContent from '../components/Cards/CardContent'

const {Column, ColumnGroup} = Table

class HomeScreen extends Component {

  componentDidMount () {
    const {props:{dispatch}} =this
    dispatch(FetchActionCreators.fetchApi({route: 'jobs'}))
  }

  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  render () {

    const {props:{Fetch}} =this

    const providers = Fetch.get('providers')
    const jobs = Fetch.get('jobs')
    const broadcasters = Fetch.get('broadcasters')
    const contents = Fetch.get('contents')

    const selectBefore = (
      <Select defaultValue="Http://" style={{width: 80}}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
      </Select>
    );

    return (
      <div className="homeScreen">
        <Row gutter={16} type="flex" justify="start" align="top">

          <Col span={12}>
            <CardType path="providers" title="Providers list" columns={[{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (row) => (row.status && row.status.ok) || 'undefined'
            }]}/>

          </Col>

          <Col span={12}>
            <CardType path="presets" title="Presets list" columns={[{
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
            }]}/>
          </Col>

          <Col span={6}>
            <CardType path="profiles" title="Profiles list" columns={[{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: 'Description',
              dataIndex: 'description',
              key: 'description'
            }]}/>
          </Col>

          <Col span={6}>
            <CardType path="broadcasters" title="Broadcaster list" columns={[{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            }]}/>
          </Col>

          <Col span={6}>
            <Card title="Last jobs" extra={<Link to="jobs">Voir</Link>}>
              {(jobs && jobs.size && jobs.map((row) => {
                return <div> JobId : {row.get('_id')} ContentId : {row.get('contentId')}
                  <Progress status={getStatusProgress(row.get('status'))}
                            percent={row.get('progress')}
                            strokeWidth={5}/>
                </div>
              })) || <div>No jobs</div>}
            </Card>
          </Col>

          <Col span={24}>
            <CardContent />
          </Col>

        </Row>
      </div>
    )
  }
}

HomeScreen.propTypes = {};

HomeScreen.defaultProps = {};

export default withRouter(connect(({Fetch}) => ({Fetch}))(HomeScreen))
