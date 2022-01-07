import react, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"

const CreateGroup = (props) => {
  const [form] = Form.useForm()
  const [pickerV, setPickerV] = useState(false)
  const [time, settime] = useState(null)
  const initValue = {
    name: "小白考勤测试一组",
    title: "青藏高原自然博物馆",
    address: "生物科技产业园区经二路21号",
    latitude: "36.687495",
    longitude: "101.750329",
  }

  const onSubmit = (data) => {
    props.onClick(data)
  }
  const now = new Date()
  return (
    <div>
      <h4 className="title">考勤模块——{props.title}</h4>
      <Form form={form} onFinish={onSubmit} initialValues={initValue}>
        <Form.Item label="考勤组名称" name="name">
          <Input placeholder="请输入考勤组名称" />
        </Form.Item>
        <Form.Item label="考勤标题" name="title">
          <Input placeholder="请输入考勤标题" />
        </Form.Item>
        <Form.Item label="考勤地址" name="address">
          <Input placeholder="请输入考勤地址" />
        </Form.Item>
        <Form.Item label="考勤地址纬度" name="latitude">
          <Input placeholder="请输入考勤地址纬度" />
        </Form.Item>
        <Form.Item label="考勤地址经度" name="longitude">
          <Input placeholder="请输入考勤地址经度" />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form>
    </div>
  )
}

export default CreateGroup
