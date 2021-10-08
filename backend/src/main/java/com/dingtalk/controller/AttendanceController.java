package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.aliyun.dingtalkim_1_0.models.TopboxCloseResponse;
import com.aliyun.dingtalkim_1_0.models.TopboxOpenResponse;
import com.aliyun.dingtalkim_1_0.models.UpdateInteractiveCardResponse;
import com.dingtalk.api.request.OapiAttendanceGroupAddRequest;
import com.dingtalk.api.request.OapiAttendanceGroupScheduleAsyncRequest;
import com.dingtalk.api.response.*;
import com.dingtalk.model.RpcServiceResult;
import com.dingtalk.service.AttendanceManager;
import com.dingtalk.util.TimeUtil;
import com.taobao.api.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    AttendanceManager attendanceManager;

    @RequestMapping("/createGroup")
    @PostMapping
    public RpcServiceResult createGroup(@RequestBody Map params) throws ApiException {
        String userId = params.get("userId").toString();
        String positionString = params.get("positions").toString();
        List<OapiAttendanceGroupAddRequest.TopPositionVo> topPositionVos = JSONArray.parseArray(JSON.toJSONString(positionString), OapiAttendanceGroupAddRequest.TopPositionVo.class);
        String memberString = params.get("members").toString();
        List<OapiAttendanceGroupAddRequest.TopMemberVo> memberVos = JSONArray.parseArray(JSON.toJSONString(memberString), OapiAttendanceGroupAddRequest.TopMemberVo.class);
        String attendanceName = params.get("name").toString();
        OapiAttendanceGroupAddResponse.TopGroupVo topGroupVo = attendanceManager.createGroup(userId, topPositionVos, memberVos, attendanceName);
        log.info("createGroup:{}", topGroupVo);
        return RpcServiceResult.getSuccessResult(topGroupVo);
    }

    @RequestMapping("/createShift")
    @PostMapping
    public RpcServiceResult createShift(@RequestBody Map params) throws Exception {
        String userId = params.get("userId").toString();
        String classGroupName = params.get("classGroupName").toString();
        String checkTime = params.get("checkTime").toString();
        String shiftName = params.get("shiftName").toString();
        OapiAttendanceShiftAddResponse.TopAtClassVo shift = attendanceManager.createShift(userId, classGroupName, checkTime, shiftName);
        log.info("createShift:{}", shift);
        return RpcServiceResult.getSuccessResult(shift);
    }

    @RequestMapping("/attendanceSchedule")
    @PostMapping
    public RpcServiceResult attendanceSchedule(@RequestBody Map params) throws Exception {
        String userId = params.get("userId").toString();
        Long groupId = (Long) params.get("groupId");
        String listString = params.get("schedules").toString();
        List<OapiAttendanceGroupScheduleAsyncRequest.TopScheduleParam> topScheduleParams = JSONArray.parseArray(JSON.toJSONString(listString), OapiAttendanceGroupScheduleAsyncRequest.TopScheduleParam.class);
        OapiAttendanceGroupScheduleAsyncResponse response = attendanceManager.attendanceSchedule(userId, groupId, topScheduleParams);
        log.info("attendanceSchedule:{}", response);
        return RpcServiceResult.getSuccessResult(response);
    }

    @RequestMapping("/uploadRecord")
    @PostMapping
    public RpcServiceResult uploadRecord(@RequestBody Map params) throws Exception {
        String userId = params.get("userId").toString();
        String deviceName = params.get("deviceName").toString();
        String deviceId = params.get("deviceId").toString();
        String time = params.get("time").toString();
        OapiAttendanceRecordUploadResponse response = attendanceManager.uploadRecord(userId, deviceName, deviceId, time);
        log.info("uploadRecord:{}", response);
        return RpcServiceResult.getSuccessResult(response);
    }

    @RequestMapping("/attendanceList")
    @PostMapping
    public RpcServiceResult attendanceList(@RequestBody Map params) throws Exception {
        String workDateFrom = params.get("workDateFrom").toString();
        String workDateTo = params.get("workDateTo").toString();
        long offset = (long) params.get("offset");
        long limit = (long) params.get("limit");
        String userIdListString = params.get("userIdList").toString();
        List<String> userIdList = Arrays.asList(userIdListString);
        List<OapiAttendanceListResponse.Recordresult> recordresults = attendanceManager.attendanceList(workDateFrom, workDateTo, userIdList, offset, limit);
        log.info("attendanceList:{}", recordresults);
        return RpcServiceResult.getSuccessResult(recordresults);
    }

    @RequestMapping("/leaveStatus")
    @PostMapping
    public RpcServiceResult leaveStatus(@RequestBody Map params) throws Exception {
        String userIdList = params.get("userIdList").toString();
        long startTime = (long)params.get("startTime");
        long endTime = (long)params.get("endTime");
        OapiAttendanceGetleavestatusResponse.LeaveStatusListVO leaveStatus = attendanceManager.getLeaveStatus(userIdList, startTime, endTime);
        log.info("leaveStatus:{}", leaveStatus);
        return RpcServiceResult.getSuccessResult(leaveStatus.getLeaveStatus());
    }


}
