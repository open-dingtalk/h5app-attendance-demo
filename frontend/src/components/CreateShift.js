import react, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"
const initTime = moment().add(1, "days").format("YYYY-MM-DD") + " 08:00:00"
const initEndTime = moment().add(1, "days").format("YYYY-MM-DD") + " 18:00:00"
const CreateShift = (props) => {
  const [form] = Form.useForm()
  const [pickerV, setPickerV] = useState(false)
  const [pickerU, setPickerU] = useState(false)

  const onSubmit = (data) => {
    const formData = {
      ...data,
      beginTime: moment(data.beginTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(data.endTime).format("YYYY-MM-DD HH:mm:ss"),
    }
    props.onClick(formData)
  }

  return (
    <div>
      <h4 className="title">考勤模块——{props.title}</h4>
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={{
          shiftName: "小白考勤班次白班",
          beginTime: new Date(initTime),
          endTime: new Date(initEndTime),
        }}
      >
        <Form.Item label="班次名称" name="shiftName">
          <Input placeholder="请输入班次名称" />
        </Form.Item>

        <Form.Item label={"开始时间"} name="beginTime">
          <DatePicker
            visible={pickerV}
            onClose={() => {
              setPickerV(false)
            }}
            min={new Date()}
            precision="second"
            onConfirm={(val, s) => {
              form.setFieldsValue({
                beginTime: val,
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

        <Form.Item label="结束时间" name="endTime">
          <DatePicker
            visible={pickerU}
            onClose={() => {
              setPickerU(false)
            }}
            min={new Date()}
            precision="second"
            onConfirm={(val, s) => {
              form.setFieldsValue({
                endTime: val,
              })
            }}
          >
            {(value) => (
              <div style={{ textAlign: "left" }}>
                <Button onClick={() => setPickerU(true)} type="primary">
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

export default CreateShift
