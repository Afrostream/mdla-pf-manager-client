import React from 'react'
import _ from 'lodash'
import { Badge, Transfer, Button, Modal, Form, Input, Radio, Select, Row, Col } from 'antd'

const FormItem = Form.Item

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
        return {...{prop}, value}
      })
      .value()
    return plainObj
  }
})(
  (props) => {
    const {visible, onCancel, onCreate, form, Fetch} = props
    const {getFieldDecorator, getFieldValue} = form
    const presets = Fetch.get('presets')
    const presetList = (presets && _.map(presets.toJS(), (preset) =>
        <Option value={preset}
                key={preset._id}>{`${preset.name}`}</Option>
      )) || [];
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
          {/*<FormItem label="Presets">
           {getFieldDecorator('presets', {
           rules: [{required: true, message: 'Pleaseadd presets or create one before!', type: 'array'}],
           })(<Transfer
           dataSource={(presets && presets.toJS()) || []}
           targetKeys={[]}
           showSearch
           listStyle={{
           width: 250,
           height: 300,
           }}
           operations={['to right', 'to left']}
           render={item => `${item.name}`}
           />)}
           </FormItem>*/}
          <FormItem label="Presets">
            {getFieldDecorator('presets', {
              rules: [
                {
                  required: false,
                  type: 'array'
                }
              ],
              valuePropName: 'name',
            })(
              <Select multiple
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