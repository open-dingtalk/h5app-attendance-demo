import './App.css';
import * as dd from 'dingtalk-jsapi';
import axios from 'axios';
import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //内网穿透工具介绍:
            // https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration?pnamespace=app
            domain: "",
            corpId: '',
            authCode: '',
            userId: '',
            userName: '',
            showType: 0,
            groupId: 0,
            shiftId: 0,
            groupData: {
                positions: [{
                    address: "生物科技产业园区经二路21号",
                    latitude: "36.687495",
                    accuracy: "0",
                    title: "青藏高原自然博物馆",
                    longitude: "101.750329"
                }],
                members: [{
                    role: "Attendance",
                    type: "StaffMember",
                }],
                name: "白班考勤"
            },
            shiftData: {
                classGroupName: "def",
                shiftName: "白班",
                checkTime: "2021-12-02 09:00:00"
            },
            scheduleInfo: {
                schedules: []
            },
            record: {
                deviceName: "东门打卡机",
                deviceId: 1,
                time: "2021-12-02 09:00:00"
            },
            query: {
                workDateFrom: "2021-11-07 08:00:00",
                workDateTo: "2021-11-11 08:00:00",
                offset: 0,
                limit: 50,
                userIdList: []
            },
            recordList: [],
            leaveInfo: {
                startTime: "2021-12-02 09:00:00",
                endTime: "2021-12-12 09:00:00"
            },
            leaveList: []
        }
    }

    render() {
        if (this.state.userId === '') {
            this.login();
        }
        let body;
        if (this.state.showType === 0) {
            body =
                <div className="App">
                    <h2>考勤功能演示</h2>
                    <p>
                        <button type="button" onClick={() => this.createGroup()}>创建考勤组</button>
                    </p>
                    <p>
                        <button type="button" onClick={() => this.createShift()}>创建考勤班次</button>
                    </p>
                    <p>
                        <button type="button" onClick={() => this.attendanceSchedule()}>进行考勤排班</button>
                    </p>
                    <p>
                        <button type="button" onClick={() => this.uploadRecord()}>上传打卡记录</button>
                    </p>
                    <p>
                        <button type="button" onClick={() => this.attendanceList()}>获取打卡结果</button>
                    </p>
                    <p>
                        <button type="button" onClick={() => this.leaveStatus()}>查看请假状态</button>
                    </p>

                </div>
        } else if (this.state.showType === 1) {
            body =
                <div>
                    <h3>
                        <button type={"button"} onClick={() => this.back()}>返回</button>
                    </h3>
                    <h3>打卡记录：</h3>
                    {
                        this.state.recordList.map((item, i) =>
                            <div key={i}>
                                <div>
                                    工作日：{() => this.getDate(new Date(item.workDate))}<br/>
                                    打卡时间：{() => this.getDate(new Date(item.userCheckTime))}
                                </div>
                            </div>
                        )
                    }
                </div>
        } else if (this.state.showType === 2) {
            body =
                <div>
                    <h3>
                        <button type={"button"} onClick={() => this.back()}>返回</button>
                    </h3>
                    <h3>请假状态：</h3>
                    {
                        this.state.leaveList.map((item, i) =>
                            <div key={i}>
                                <div>
                                    开始时间：{() => this.getDate(new Date(item.startTime))}<br/>
                                    结束时间：{() => this.getDate(new Date(item.endTime))}<br/>
                                    请假时长：{() => this.getLeaveTime(this.durationPercent , item.durationUnit)}<br/>
                                </div>
                            </div>
                        )
                    }
                </div>
        }
        return (
            <div>{body}</div>
        );
    }

    back() {
        this.setState({
            showType: 0
        })
    }

    getLeaveTime(durationPercent, durationUnit) {
        const msg = durationPercent === "percent_day" ? "天" : "小时";
        return durationPercent + durationPercent;
    }

    getDate(now) {
        const year = now.getYear();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
    }

    leaveStatus() {
        let data = this.state.leaveInfo;
        data.userIdList = this.state.userId;
        axios.post(this.state.domain + "/attendance/leaveStatus", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data) {
                    this.setState({
                        leaveList: res.data.data,
                        showType: 2
                    })
                }
            } else {
                alert("leaveStatus failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("leaveStatus err, " + JSON.stringify(error))
        })
    }

    attendanceList() {
        let data = this.state.query;
        data.userIdList.push(this.state.userId);
        axios.post(this.state.domain + "/attendance/attendanceList", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data) {
                    this.setState({
                        recordList: res.data.data,
                        showType: 1
                    })
                }
            } else {
                alert("attendanceList failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("attendanceList err, " + JSON.stringify(error))
        })
    }

    uploadRecord() {
        let data = this.state.record;
        data.userId = this.state.userId;
        axios.post(this.state.domain + "/attendance/uploadRecord", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data.success) {
                    alert("上传打卡成功！")
                }
            } else {
                alert("uploadRecord failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("uploadRecord err, " + JSON.stringify(error))
        })
    }

    attendanceSchedule() {
        let data = this.state.scheduleInfo;
        data.userId = this.state.userId;
        data.groupId = this.state.groupId;
        let info = {
            shiftId: this.state.shiftId,
            userid: this.state.userId,
            workDate: new Date().getTime(),
        }
        data.schedules.push(info);
        axios.post(this.state.domain + "/attendance/attendanceSchedule", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data.success) {
                    alert("排班成功！")
                }
            } else {
                alert("attendanceSchedule failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("attendanceSchedule err, " + JSON.stringify(error))
        })
    }

    createShift() {
        let data = this.state.shiftData;
        data.userId = this.state.userId;
        axios.post(this.state.domain + "/attendance/createShift", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data) {
                    // 保存班次id
                    this.setState({
                        shiftId: res.data.data.id
                    })
                    alert("创建班次成功！")
                }
            } else {
                alert("createShift failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("createShift err, " + JSON.stringify(error))
        })
    }

    createGroup() {
        let data = this.state.groupData;
        data.userId = this.state.userId;
        axios.post(this.state.domain + "/attendance/createGroup", JSON.stringify(data)
        ).then(res => {
            if (res && res.data.success) {
                if (res.data.data) {
                    // 保存考勤组id
                    this.setState({
                        groupId: res.data.data.id
                    })
                    alert("创建考勤组成功！")
                }
            } else {
                alert("createGroup failed --->" + JSON.stringify(res));
            }
        }).catch(error => {
            alert("createGroup err, " + JSON.stringify(error))
        })
    }

    login() {
        axios.get(this.state.domain + "/getCorpId")
            .then(res => {
                if (res.data) {
                    this.loginAction(res.data);
                }
            }).catch(error => {
            alert("corpId err, " + JSON.stringify(error))
        })
    }

    loginAction(corpId) {
        // alert("corpId: " +  corpId);
        let _this = this;
        dd.runtime.permission.requestAuthCode({
            corpId: corpId,//企业 corpId
            onSuccess: function (res) {
                // 调用成功时回调
                _this.state.authCode = res.code
                axios.get(_this.state.domain + "/login?authCode=" + _this.state.authCode
                ).then(res => {
                    if (res && res.data.success) {
                        let userId = res.data.data.userId;
                        let userName = res.data.data.userName;
                        alert('登录成功，你好' + userName);
                        setTimeout(function () {
                            _this.setState({
                                userId: userId,
                                userName: userName
                            })
                        }, 0)
                    } else {
                        alert("login failed --->" + JSON.stringify(res));
                    }
                }).catch(error => {
                    alert("httpRequest failed --->" + JSON.stringify(error))
                })
            },
            onFail: function (err) {
                // 调用失败时回调
                alert("requestAuthCode failed --->" + JSON.stringify(err))
            }
        });
    }

}

export default App;
