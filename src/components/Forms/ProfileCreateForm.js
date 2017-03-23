import React from 'react'
import _ from 'lodash'
import { Badge, Transfer, Button, Modal, Form, Input, Radio, Select, Row, Col } from 'antd'
import { getStatusColor, getStatusProgress } from '../../core/utils'

const FormItem = Form.Item
const Option = Select.Option

export default Form.create({
  mapPropsToFields(props) {
    const plainObj = _(props)
      .pick([
        'name',
        'description',
        'presets'
      ])
      .flattenJson()
      .mapValues((value, prop) => {
        let mapVal = value
        if (_.isArray(value)) {
          mapVal = _.map(value, (item) => ({key: item._id.toString(), label: item.name}))
        }
        return {...{prop}, value: mapVal}
      })
      .value()
    return plainObj
  }

})(
  (props) => {
    const {visible, onCancel, onCreate, form, Fetch} = props
    const {getFieldDecorator} = form
    const presets = Fetch.get('presets')
    const presetList = (presets && _.map(presets.toJS(), (preset, key) =>
        <Option key={preset._id.toString()}><Badge
          status={getStatusColor(preset.status)}
          strokeWidth={5}/>{`${preset.name}`}</Option>
      )) || [];

    const getDecoratorValue = (values = []) => {
      const presetsValue = values.map((presetValue) => {
        const item = presets.find((preset) => preset.get('_id') == ( presetValue.key || presetValue._id || presetValue)).toJS();
        return {_id: item._id, key: item._id.toString(), label: item.name};
      });
      return presetsValue;
    }

    return (
      <Modal
        visible={visible}
        title="Create a new profile"
        okText="Create"
        wrapClassName="vertical-center-modal"
        onCancel={onCancel}
        onOk={onCreate}
        width="75%"
      >
        <Form layout="horizontal">
          <FormItem label="Name">
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please input the name of profile!'}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea"/>)}
          </FormItem>
          <FormItem label="Presets">
            {getFieldDecorator('presets', {
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
                {presetList}
              </Select>
            )}
          </FormItem>

        </Form>
      </Modal>
    )
  }
)