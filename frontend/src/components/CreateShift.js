import react, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"
const initTime = moment().add(1,"days").format("YYYY-MM-DD") + " 08:00:00"
const initEndTime = moment().add(1,"days").format("YYYY-MM-DD") + " 18:00:00"
const CreateShift = (props) => {
  const [form] = Form.useForm()
  const [pickerV, setPickerV] = useState(false)
  const [time, settime] = useState(null)

  const onSubmit = (data) => {
    props.onClick(data)
  }
  const now = new Date()
  return (
    <div>
      <h4 className="title">考勤模块——{props.title}</h4>
      <Form form={form} onFinish={onSubmit} initialValues={{
          shiftName:'小白考勤班次白班',
          beginTime:initTime,
          endTime:initEndTime
      }}>
        <Form.Item label="班次名称" name="shiftName">
          <Input placeholder="请输入班次名称" />
        </Form.Item>
        <Form.Item
            label="开始时间"
            name="beginTime"
            >
            <Input placeholder="请输入" />
          {/*  <DatePicker*/}
          {/*      visible={pickerV}*/}
          {/*      onClose={() => {*/}
          {/*        setPickerV(false)*/}
          {/*      }}*/}
          {/*      min={new Date()}*/}
          {/*      precision="second"*/}
          {/*      onConfirm={(val, s) => {*/}
          {/*        settime(val)*/}
          {/*        form.setFieldsValue({*/}
          {/*            beginTime: moment(val).format("YYYY-MM-DD HH:mm:ss"),*/}
          {/*        })*/}
          {/*      }}*/}
          {/*  >*/}
          {/*  {(value) => {*/}
          {/*      console.log(value,'====value')*/}
          {/*      return*/}
          {/*      return value*/}
          {/*        ? moment(value).format("YYYY-MM-DD HH:mm:ss")*/}
          {/*        : initTime*/}
          {/*  }}*/}
          {/*</DatePicker>*/}
        </Form.Item>

        <Form.Item
            label="结束时间"
            name="endTime"
            >
            <Input placeholder="请输入" />
          {/*<DatePicker*/}
          {/*    visible={pickerV}*/}
          {/*    onClose={() => {*/}
          {/*      setPickerV(false)*/}
          {/*    }}*/}
          {/*    // min={new Date()}*/}
          {/*    precision="second"*/}
          {/*    onConfirm={(val, s) => {*/}
          {/*      settime(val)*/}
          {/*      form.setFieldsValue({*/}
          {/*          endTime: moment(val).format("YYYY-MM-DD HH:mm:ss"),*/}
          {/*      })*/}
          {/*    }}*/}
          {/*>*/}
          {/*  {(value) => {*/}
          {/*    return value*/}
          {/*        ? moment(value).format("YYYY-MM-DD HH:mm:ss")*/}
          {/*        : initEndTime*/}
          {/*  }}*/}
          {/*</DatePicker>*/}
          {/*</DatePicker>*/}
          {/*</DatePicker>*/}
        </Form.Item>

        <Button htmlType="submit" type="primary">
          提交
        </Button>
      </Form>
    </div>
  )
}

export default CreateShift
