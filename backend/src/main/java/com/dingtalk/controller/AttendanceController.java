package com.dingtalk.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import com.taobao.api.internal.util.StringUtils;
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
    public RpcServiceResult createGroup(@RequestBody String paramStr) throws ApiException {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
        String userId = params.get("userId").toString();
        String positionString = params.get("positions").toString();
        System.out.println("positionString: " + positionString);
        List<OapiAttendanceGroupAddRequest.TopPositionVo> topPositionVos = JSONArray.parseArray(positionString, OapiAttendanceGroupAddRequest.TopPositionVo.class);
        String memberString = params.get("members").toString();
        List<OapiAttendanceGroupAddRequest.TopMemberVo> memberVos = JSONArray.parseArray(memberString, OapiAttendanceGroupAddRequest.TopMemberVo.class);
        memberVos.forEach(topMemberVo -> topMemberVo.setUserId(userId));
        String attendanceName = params.get("name").toString();
        OapiAttendanceGroupAddResponse.TopGroupVo topGroupVo = attendanceManager.createGroup(userId, topPositionVos, memberVos, attendanceName);
        log.info("createGroup:{}", topGroupVo);
        return RpcServiceResult.getSuccessResult(topGroupVo);
    }

    @RequestMapping("/createShift")
    @PostMapping
    public RpcServiceResult createShift(@RequestBody String paramStr) throws Exception {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
        String userId = params.get("userId").toString();
        String classGroupName = params.get("classGroupName").toString();
        String beginTime = params.get("beginTime").toString();
        String endTime = params.get("endTime").toString();
        String shiftName = params.get("shiftName").toString();
        OapiAttendanceShiftAddResponse.TopAtClassVo shift = attendanceManager.createShift(userId, classGroupName, beginTime, endTime, shiftName);
        log.info("createShift:{}", shift);
        return RpcServiceResult.getSuccessResult(shift);
    }

    @RequestMapping("/attendanceSchedule")
    @PostMapping
    public RpcServiceResult attendanceSchedule(@RequestBody String paramStr) throws Exception {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
        String userId = params.get("userId").toString();
        Long groupId = (Long) params.get("groupId");
        String listString = params.get("schedules").toString();
        List<OapiAttendanceGroupScheduleAsyncRequest.TopScheduleParam> topScheduleParams = JSONArray.parseArray(listString, OapiAttendanceGroupScheduleAsyncRequest.TopScheduleParam.class);
        OapiAttendanceGroupScheduleAsyncResponse response = attendanceManager.attendanceSchedule(userId, groupId, topScheduleParams);
        log.info("attendanceSchedule:{}", response);
        return RpcServiceResult.getSuccessResult(response);
    }

    @RequestMapping("/uploadRecord")
    @PostMapping
    public RpcServiceResult uploadRecord(@RequestBody String paramStr) throws Exception {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
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
    public RpcServiceResult attendanceList(@RequestBody String paramStr) throws Exception {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
        String workDateFrom = params.get("workDateFrom").toString();
        String workDateTo = params.get("workDateTo").toString();
        long offset = (int) params.get("offset");
        long limit = (int) params.get("limit");
        String userIdListString = params.get("userIdList").toString();
        List<String> userIdList = Arrays.asList(userIdListString);
        List<OapiAttendanceListResponse.Recordresult> recordresults = attendanceManager.attendanceList(workDateFrom, workDateTo, userIdList, offset, limit);
        log.info("attendanceList:{}", recordresults);
        return RpcServiceResult.getSuccessResult(recordresults);
    }

    @RequestMapping("/leaveStatus")
    @PostMapping
    public RpcServiceResult leaveStatus(@RequestBody String paramStr) throws Exception {
        System.out.println("paramStr: " + paramStr);
        Map params = JSONObject.parseObject(paramStr, Map.class);
        String userIdList = params.get("userIdList").toString();
        long startTime = StringUtils.parseDateTime(params.get("startTime").toString()).getTime();
        long endTime = StringUtils.parseDateTime(params.get("endTime").toString()).getTime();
        OapiAttendanceGetleavestatusResponse.LeaveStatusListVO leaveStatus = attendanceManager.getLeaveStatus(userIdList, startTime, endTime);
        log.info("leaveStatus:{}", leaveStatus);
        return RpcServiceResult.getSuccessResult(leaveStatus.getLeaveStatus());
    }


}
