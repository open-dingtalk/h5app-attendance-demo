import "./App.css"
// import * as dd from 'dingtalk-jsapi';
import axios from "axios"
import React from "react"
import "./App.css"
import { Button } from "antd"
import moment from "moment"
import CreateGroup from "./components/CreateGroup"
import CreateShift from "./components/CreateShift"
import UploadRecord from "./components/UploadRecord"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //内网穿透工具介绍:
      // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
      domain: "",
      corpId: "",
      authCode: "",
      userId: "01186053144726141594",
      userName: "",
      showType: 0,
      groupId: 889575013,
      shiftId: 878845020,
      groupData: {
        positions: [
          {
            address: "生物科技产业园区经二路21号",
            latitude: "36.687495",
            accuracy: "0",
            title: "青藏高原自然博物馆",
            longitude: "101.750329",
          },
        ],
        members: [
          {
            role: "Attendance",
            type: "StaffMember",
          },
        ],
        name: "白班考勤",
      },
      shiftData: {
        classGroupName: "def",
        shiftName: "白班",
        beginTime: "2020-10-18 08:00:00",
        endTime: "2020-10-18 18:00:00",
      },
      scheduleInfo: {
        schedules: [],
      },
      record: {
        deviceName: "东门打卡机",
        deviceId: 1,
        time: "2021-10-09 09:00:00",
      },
      query: {
        workDateFrom: moment()
          .subtract(7, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        workDateTo: moment().format("YYYY-MM-DD HH:mm:ss"),
        offset: 0,
        limit: 50,
        userIdList: [],
      },
      recordList: [],
      leaveInfo: {
        startTime: moment().subtract(7, "days").format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      },
      leaveList: [],
    }
  }

  render() {
    if (this.state.userId === "") {
      this.login()
    }
    return (
      <div className="content">
        <div className="header">
          <img
            src="https://img.alicdn.com/imgextra/i3/O1CN01Mpftes1gwqxuL0ZQE_!!6000000004207-2-tps-240-240.png"
            className="headImg"
            alt=""
          />
          钉钉模板
        </div>
        <div className="App">
          {this.state.showType === 0 && (
            <div className="App">
              <h2>考勤功能演示</h2>
              <p>
                <Button
                  type="primary"
                  onClick={() => this.setState({ showType: 3 })}
                >
                  创建考勤组
                </Button>
              </p>
              <p>
                <Button
                  type="primary"
                  onClick={() => this.setState({ showType: 4 })}
                >
                  创建考勤班次
                </Button>
              </p>
              <p>
                <Button
                  type="primary"
                  onClick={() => this.attendanceSchedule()}
                >
                  进行考勤排班
                </Button>
              </p>
              <p>
                <Button
                  type="primary"
                  onClick={() => this.setState({ showType: 5 })}
                >
                  上传打卡记录
                </Button>
              </p>
              <p>
                <Button type="primary" onClick={() => this.attendanceList()}>
                  查看7天内打卡结果
                </Button>
              </p>
              <p>
                <Button type="primary" onClick={() => this.leaveStatus()}>
                  查看7天内请假状态
                </Button>
              </p>
            </div>
          )}

          {this.state.showType === 5 && (
            <div>
              <UploadRecord
                title={"上传打卡记录"}
                onClick={(e) => this.uploadRecord(e)}
              />
            </div>
          )}

          {this.state.showType === 4 && (
            <div>
              <CreateShift
                title={"创建考勤班次"}
                onClick={(e) => this.createShift(e)}
              />
            </div>
          )}

          {this.state.showType === 3 && (
            <div>
              <CreateGroup
                title={"创建考勤组"}
                onClick={(e) => this.createGroup(e)}
              />
            </div>
          )}

          {this.state.showType === 1 && (
            <div>
              <h3>
                <button type={"button"} onClick={() => this.back()}>
                  返回
                </button>
              </h3>
              <h3>打卡记录：</h3>
              {this.state.recordList.map((item, i) => (
                <div key={i}>
                  <div>
                    工作日：{() => this.getDate(new Date(item.workDate))}
                    <br />
                    打卡时间：{() => this.getDate(new Date(item.userCheckTime))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {this.state.showType === 2 && (
            <div>
              <h3>
                <button type={"button"} onClick={() => this.back()}>
                  返回
                </button>
              </h3>
              <h3>请假状态：</h3>
              {this.state.leaveList.map((item, i) => (
                <div key={i}>
                  <div>
                    开始时间：{() => this.getDate(new Date(item.startTime))}
                    <br />
                    结束时间：{() => this.getDate(new Date(item.endTime))}
                    <br />
                    请假时长：
                    {() =>
                      this.getLeaveTime(this.durationPercent, item.durationUnit)
                    }
                    <br />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  back() {
    this.setState({
      showType: 0,
    })
  }

  getLeaveTime(durationPercent, durationUnit) {
    const msg = durationPercent === "percent_day" ? "天" : "小时"
    return durationPercent + durationPercent
  }

  getDate(now) {
    const year = now.getYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      "   " +
      hour +
      ":" +
      minute +
      ":" +
      second
    )
  }

  leaveStatus() {
    let data = this.state.leaveInfo
    data.userIdList = this.state.userId
    axios
      .post(
        this.state.domain + "/attendance/leaveStatus",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data) {
            this.setState({
              leaveList: res.data.data,
              showType: 2,
            })
          }
        } else {
          alert("leaveStatus failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("leaveStatus err, " + JSON.stringify(error))
      })
  }

  attendanceList() {
    let data = this.state.query
    data.userIdList.push(this.state.userId)
    axios
      .post(
        this.state.domain + "/attendance/attendanceList",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data) {
            this.setState({
              recordList: res.data.data,
              showType: 1,
            })
          }
        } else {
          alert("attendanceList failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("attendanceList err, " + JSON.stringify(error))
      })
  }

  uploadRecord(uploadRecordData) {
    const { deviceName, time } = uploadRecordData
    let data = this.state.record
    data.userId = this.state.userId
    data.deviceName = deviceName
    data.time = time
    axios
      .post(
        this.state.domain + "/attendance/uploadRecord",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.success) {
            alert("上传打卡成功！")
            this.back()
          }
        } else {
          alert("uploadRecord failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("uploadRecord err, " + JSON.stringify(error))
      })
  }

  attendanceSchedule() {
    let data = this.state.scheduleInfo
    data.userId = this.state.userId
    data.groupId = this.state.groupId
    let info = {
      shiftId: this.state.shiftId,
      userid: this.state.userId,
      workDate: new Date().getTime(),
    }
    data.schedules.push(info)
    axios
      .post(
        this.state.domain + "/attendance/attendanceSchedule",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data.success) {
            alert("排班成功！")
          }
        } else {
          alert("attendanceSchedule failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("attendanceSchedule err, " + JSON.stringify(error))
      })
  }

  createShift(shiftData) {
    const { shiftName, beginTime, endTime } = shiftData
    let data = this.state.shiftData
    data.userId = this.state.userId
    data.groupId = this.state.groupId
    data.shiftName = shiftName
    data.beginTime = beginTime
    data.endTime = endTime
    axios
      .post(
        this.state.domain + "/attendance/createShift",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data) {
            // 保存班次id
            this.setState({
              shiftId: res.data.data.id,
            })
            alert("创建班次成功！")
            this.back()
          }
        } else {
          alert("createShift failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("createShift err, " + JSON.stringify(error))
      })
  }

  createGroup(groupData) {
    const { name, title, address, latitude, longitude } = groupData
    let data = this.state.groupData
    data.userId = this.state.userId
    data.name = name
    data.positions[0].title = title
    data.positions[0].latitude = latitude
    data.positions[0].longitude = longitude
    data.positions[0].address = address
    axios
      .post(
        this.state.domain + "/attendance/createGroup",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res && res.data.success) {
          if (res.data.data) {
            // 保存考勤组id
            this.setState({
              groupId: res.data.data.id,
            })
            alert("创建考勤组成功！")
            this.back()
          }
        } else {
          alert("createGroup failed --->" + JSON.stringify(res))
        }
      })
      .catch((error) => {
        alert("createGroup err, " + JSON.stringify(error))
      })
  }

  login() {
    axios
      .get(this.state.domain + "/getCorpId")
      .then((res) => {
        if (res.data) {
          // this.loginAction(res.data);
        }
      })
      .catch((error) => {
        alert("corpId err, " + JSON.stringify(error))
      })
  }

  // loginAction(corpId) {
  //     // alert("corpId: " +  corpId);
  //     let _this = this;
  //     dd.runtime.permission.requestAuthCode({
  //         corpId: corpId,//企业 corpId
  //         onSuccess: function (res) {
  //             // 调用成功时回调
  //             _this.state.authCode = res.code
  //             axios.get(_this.state.domain + "/login?authCode=" + _this.state.authCode
  //             ).then(res => {
  //                 if (res && res.data.success) {
  //                     let userId = res.data.data.userId;
  //                     let userName = res.data.data.userName;
  //                     alert('登录成功，你好' + userName);
  //                     setTimeout(function () {
  //                         _this.setState({
  //                             userId: userId,
  //                             userName: userName
  //                         })
  //                     }, 0)
  //                 } else {
  //                     alert("login failed --->" + JSON.stringify(res));
  //                 }
  //             }).catch(error => {
  //                 alert("httpRequest failed --->" + JSON.stringify(error))
  //             })
  //         },
  //         onFail: function (err) {
  //             // 调用失败时回调
  //             alert("requestAuthCode failed --->" + JSON.stringify(err))
  //         }
  //     });
  // }
}

export default App
