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

class VideoStreamConfigForm extends Component {

  render () {
    const {props:{form}} =this
    const {getFieldDecorator} = form
    return (
      <Card title="Video Stream Config" style={customPanelStyle}>
        <FormItem label="Bitrate">
          <Row>
            <Col span={12}>
              {getFieldDecorator('videoStreamConfig.bitrate', {
                initialValue: 400,
                rules: [{required: true, message: 'Insert bitrate'}],
              })(
                <Slider min={100} max={10000} step={100}
                        marks={{0: '100', 2000: '2000', 4000: '4000', 6000: '6000', 8000: '8000', 10000: '10000'}}/>
              )}
            </Col>
            <Col span={4}>
              {getFieldDecorator('videoStreamConfig.bitrate', {
                rules: [{required: true, message: 'Insert bitrate'}],
              })(
                <InputNumber min={100} max={10000} style={{marginLeft: 16}} step={100}/>
              )}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Interlace Mode">
          {getFieldDecorator('videoStreamConfig.interlaceMode', {
            initialValue: 'progressive',
          })(
            <Select>
              <Select.Option value="progressive">progressive</Select.Option>
              <Select.Option value="auto">auto</Select.Option>
            </Select>
          )}
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label="Width">
              {getFieldDecorator('videoStreamConfig.width', {
                initialValue: 426,
                rules: [{required: true, message: 'Insert Width'}],
              })(
                <InputNumber min={256} max={4096} step={256}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Height">
              {getFieldDecorator('videoStreamConfig.height', {
                initialValue: 240,
                rules: [{required: true, message: 'Insert Height'}],
              })(
                <InputNumber min={256} max={4096} step={256}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="Codecs">
          {getFieldDecorator('videoStreamConfig.codec', {
            initialValue: 'h264',
          })(
            <Radio.Group>
              <Radio value="h264">h264</Radio>
              <Radio value="hevc">hevc</Radio>
              <Radio value="vp9">vp9</Radio>
              <Radio value="ts">ts</Radio>
              <Radio value="mss">mss</Radio>
              <Radio value="hls">hls</Radio>
              <Radio value="dash">dash</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label="Gop Mode">
              {getFieldDecorator('videoStreamConfig.gopMode', {
                initialValue: 'fixed',
              })(
                <Radio.Group>
                  <Radio value="fixed">fixed</Radio>
                  <Radio value="cgop">cgop</Radio>
                  <Radio value="sgop">sgop</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Gop Size">
              {getFieldDecorator('videoStreamConfig.gopSize', {
                initialValue: 90,
                rules: [{required: true, message: 'Insert gop Size'}],
              })(
                <Slider min={10} max={500} step={1}
                        marks={{10: '10', 100: '100', 200: '200', 500: '500'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="Rate">
          {getFieldDecorator('videoStreamConfig.rate', {
            initialValue: 24,
            rules: [{required: true, message: 'Insert Rate'}],
          })(
            <Slider min={12} max={144} step={12}
                    marks={{12: '12', 96: '96', 144: '144'}}/>
          )}
        </FormItem>
      </Card>
    )
  }
}

export default VideoStreamConfigForm