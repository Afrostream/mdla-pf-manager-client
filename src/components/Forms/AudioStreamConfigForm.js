import React, { Component } from 'react'
import { Card, Collapse, Button, InputNumber, Slider, Modal, Form, Input, Radio, Select, Row, Col } from 'antd'

const Panel = Collapse.Panel
const FormItem = Form.Item

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
}

class AudioStreamConfigForm extends Component {

  render () {
    const {props:{form}} =this
    const {getFieldDecorator} = form

    return (
      <Card title="Audio Stream Config" style={customPanelStyle}>
        <FormItem label="Bitrate">
          <Row>
            <Col span={12}>
              {getFieldDecorator('audioStreamConfig.bitrate', {
                initialValue: 400,
                rules: [{required: true, message: 'Insert bitrate'}],
              })(
                <Slider min={100} max={10000} step={100}
                        marks={{0: '100', 2000: '2000', 4000: '4000', 6000: '6000', 8000: '8000', 10000: '10000'}}/>
              )}
            </Col>
            <Col span={4}>
              {getFieldDecorator('audioStreamConfig.bitrate', {
                rules: [{required: true, message: 'Insert bitrate'}],
              })(
                <InputNumber min={100} max={10000} style={{marginLeft: 16}} step={100}/>
              )}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Codecs">
          {getFieldDecorator('audioStreamConfig.codec', {
            initialValue: 'aac',
          })(
            <Radio.Group>
              <Radio value="aac">aac</Radio>
              <Radio value="mp3">mp3</Radio>
            </Radio.Group>
          )}
        </FormItem>
      </Card>
    )
  }
}

export default AudioStreamConfigForm