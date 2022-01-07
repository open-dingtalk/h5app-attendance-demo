import react, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"

const UploadRecord = (props) => {
  const [form] = Form.useForm()
  const [pickerV, setPickerV] = useState(false)

  const onSubmit = (data) => {
    const formData = {
      ...data,
      time: moment(data.time).format("YYYY-MM-DD HH:mm:ss"),
    }
    console.log(formData)
    props.onClick(formData)
  }
  const now = new Date()
  return (
    <div>
      <h4 className="title">考勤模块——{props.title}</h4>
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          deviceName: "东门打卡机",
          time: now,
        }}
      >
        <Form.Item label="打卡设备名称" name="deviceName">
          <Input placeholder="请输入打卡设备名称" />
        </Form.Item>
        <Form.Item label="打卡时间" name="time">
          <DatePicker
            visible={pickerV}
            onClose={() => {
              setPickerV(false)
            }}
            min={new Date()}
            precision="second"
            onConfirm={(val, s) => {
              form.setFieldsValue({
                time: val,
              })
            }}
          >
            {(value) => (
              <div style={{ textAlign: "left" }}>
                <Button onClick={() => setPickerV(true)} type="primary">
                  选择时间
                </Button>{" "}
                {moment(value).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            )}
          </DatePicker>
        </Form.Item>

        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form>
    </div>
  )
}

export default UploadRecord
