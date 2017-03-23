import React from 'react'
import _ from 'lodash'
import { Badge, Button, Modal, Form, Input, Radio, Select, Row, Col } from 'antd'
import { getStatusColor, getStatusProgress } from '../../core/utils'
import AudioStreamConfigForm from './AudioStreamConfigForm'
import VideoStreamConfigForm from './VideoStreamConfigForm'

const FormItem = Form.Item
const Option = Select.Option
const OptGroup = Select.OptGroup

export default Form.create({
  mapPropsToFields(props) {
    const plainObj = _(props)
      .pick([
        'name',
        'description',
        'providers',
        'container',
        'profile',
        'rateControl',
        'mapProvidersPresets',
        'videoStreamConfig',
        'audioStreamConfig'
      ])
      .flattenJson()
      .mapValues((value, prop) => {
        let mapVal = value
        if (_.isArray(value)) {
          mapVal = _.map(value, (item) => ({key: item._id.toString(), label: item.name}))
        }
        return {...{prop}, mapVal}
      })
      .value()
    return plainObj
  }
})(
  (props) => {
    const {visible, onCancel, onCreate, form, Fetch} = props
    const {getFieldDecorator, getFieldValue} = form
    const presetmaps = Fetch.get('presetmaps')
    const presetmapsList = (presetmaps && _.map(presetmaps.toJS(), (preset, key) =>
        <Option key={preset._id.toString()}>{`${preset.providerName} ${preset.name}`}</Option>
      )) || [];

    const getDecoratorValue = (values = []) => {
      const presetsValue = values.map((presetValue) => {
        const item = presetmaps.find((preset) => preset.get('_id') == ( presetValue.key || presetValue._id || presetValue)).toJS();
        return {_id: item._id, key: item._id.toString(), label: item.providerName};
      });
      return presetsValue;
    }

    return (
      <Modal
        visible={visible}
        title="Create a new preset"
        okText="Create"
        wrapClassName="vertical-center-modal"
        onCancel={onCancel}
        onOk={onCreate}
        width="75%"
      >
        <Form layout="horizontal">
          <FormItem label="Name">
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please input the name of preset!'}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea"/>)}
          </FormItem>

          <FormItem
            label="Container"
          >
            {getFieldDecorator('container', {
              initialValue: 'mpd',
            })(
              <Radio.Group placeholder="Please select a container">
                <Radio value="mpd">mpd</Radio>
                <Radio value="m3u8">m3u8</Radio>
                <Radio value="mp4">mp4</Radio>
                <Radio value="webm">webm</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem label="Profile">
            {getFieldDecorator('profile', {
              initialValue: 'high',
            })(
              <Radio.Group placeholder="Please select a profile">
                <Radio value="high">high</Radio>
                <Radio value="main">main</Radio>
                <Radio value="baseline">baseline</Radio>
                <Radio value="hq">hq</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem label="Rate Control">
            {getFieldDecorator('rateControl', {
              initialValue: 'VBR',
            })(
              <Radio.Group>
                <Radio value="VBR">VBR</Radio>
                <Radio value="CBR">CBR</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem label="Providers Preset Map">
            {getFieldDecorator('mapProvidersPresets', {
              rules: [
                {
                  required: false,
                  type: 'array'
                }
              ],
              getValueFromEvent: getDecoratorValue
            })(
              <Select multiple labelInValue
                      searchPlaceholder="PresetMaps">
                {presetmapsList}
              </Select>
            )}
          </FormItem>
          <Row gutter={16}>
            <Col span={12}>
              {getFieldDecorator('videoStreamConfig', {
                rules: [
                  {required: true},
                ],
              })(
                <VideoStreamConfigForm {...props}/>
              )}
            </Col>
            <Col span={12}>
              {getFieldDecorator('audioStreamConfig', {
                rules: [
                  {required: true},
                ],
              })(
                <AudioStreamConfigForm {...props}/>
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
)