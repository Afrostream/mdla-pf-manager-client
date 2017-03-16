import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as FetchActionCreators from '../actions/fetch'
import { Progress, Card, Table, Icon, Row, Col } from 'antd'

const {Column, ColumnGroup} = Table

class Providers extends Component {

  componentDidMount () {
    const {props:{dispatch}} =this
    dispatch(FetchActionCreators.get('jobs'))
    dispatch(FetchActionCreators.get('providers'))
    dispatch(FetchActionCreators.get('broadcasters'))
    dispatch(FetchActionCreators.get('contents'))
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

    return (
      <div className="Providers">
        <Row gutter={16}>
          <Col span={14}>
            <Card title="Providers list" extra={<Link to="providers">Voir</Link>}>
              {(providers && <Table dataSource={providers.toJS()} size="small">
                <Column
                  title="Name"
                  dataIndex="name"
                  key="name"
                />
                <Column
                  title="Status"
                  dataIndex="status"
                  key="status"
                  render={(row) => (row.status && row.status.ok) || 'undefined'}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Link to={`providers/${record._id}`}>Voir</Link>
                  )}
                />
              </Table>)}
            </Card>
          </Col>
          <Col span={10}>
            <Row gutter={16}>
              <Col span={24}>
                <Card title="Broadcaster list" extra={<Link to="broadcasters">Voir</Link>}>
                  {(broadcasters && <Table dataSource={broadcasters.toJS()} size="small">
                    <Column
                      title="Name"
                      dataIndex="name"
                      key="name"
                    />
                    <Column
                      title="Action"
                      key="action"
                      render={(text, record) => (
                        <Link to={`broadcasters/${record._id}`}>Voir</Link>
                      )}
                    />
                  </Table>)}
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Jobs status" extra={<Link to="jobs">Voir</Link>}>
                  {(jobs && jobs.size && jobs.map((job) => {
                    return <Progress percent={job.get('progress') || 0} status="active"/>
                  })) || <p>No jobs</p>}
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={14}>
            <Card title="Contents list" extra={<Link to="contents">Voir</Link>}>
              <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
              {(contents && <Table dataSource={contents.toJS()} size="small">
                <Column
                  title="Id"
                  dataIndex="contentId"
                  key="contentId"
                />
                <Column
                  title="Type"
                  dataIndex="contentType"
                  key="contentType"
                />
                <Column
                  title="Source Url"
                  dataIndex="contentUrl"
                  key="contentUrl"
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <Link to={`contents/${record._id}`}>Voir</Link>
                  )}
                />
              </Table>)}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Providers.propTypes = {};

Providers.defaultProps = {};

export default withRouter(connect(({Fetch}) => ({Fetch}))(Providers))
