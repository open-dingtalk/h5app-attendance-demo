import react, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { DatePicker } from "antd-mobile"
import moment from "moment"

const UploadRecord = (props) => {
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
                shiftName:'东门打卡机',
                time:moment().format("YYYY-MM-DD HH:mm:ss")
            }}>
                <Form.Item label="打卡设备名称" name="deviceName">
                    <Input placeholder="请输入打卡设备名称"/>
                </Form.Item>
                <Form.Item
                    label="打卡时间"
                    name="time"
                >
                    <Input placeholder="请输入打卡时间"/>
                    {/*<DatePicker*/}
                    {/*    visible={pickerV}*/}
                    {/*    onClose={() => {*/}
                    {/*        setPickerV(false)*/}
                    {/*    }}*/}
                    {/*    min={new Date()}*/}
                    {/*    precision="second"*/}
                    {/*    onConfirm={(val, s) => {*/}
                    {/*        settime(val)*/}
                    {/*        form.setFieldsValue({*/}
                    {/*            time: moment(val).format("YYYY-MM-DD HH:mm:ss"),*/}
                    {/*        })*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {(value) => {*/}
                    {/*        return value*/}
                    {/*            ? moment(value).format("YYYY-MM-DD HH:mm:ss")*/}
                    {/*            : moment(now).format("YYYY-MM-DD HH:mm:ss")*/}
                    {/*    }}*/}
                    {/*</DatePicker>*/}
                </Form.Item>

                <Button htmlType="submit" type="primary">
                    提交
                </Button>
            </Form>
        </div>
    )
}

export default UploadRecord
