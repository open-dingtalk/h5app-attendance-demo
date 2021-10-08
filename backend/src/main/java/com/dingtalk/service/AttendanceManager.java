package com.dingtalk.service;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.*;
import com.dingtalk.api.response.*;
import com.dingtalk.config.AppConfig;
import com.dingtalk.constant.UrlConstant;
import com.dingtalk.util.AccessTokenUtil;
import com.taobao.api.ApiException;
import com.taobao.api.internal.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 考勤管理
 */
@Slf4j
@Service
public class AttendanceManager {

    /**
     * 创建考勤组
     *
     * @param
     * @return
     */
    public OapiAttendanceGroupAddResponse.TopGroupVo createGroup(String userId,
                                List<OapiAttendanceGroupAddRequest.TopPositionVo> positionVos,
                                List<OapiAttendanceGroupAddRequest.TopMemberVo> memberVos,
                                String attendanceName) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 构建考勤组信息
        // 更多设置可参考文档： https://developers.dingtalk.com/document/app/attendance-group-write
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_CREATE_GROUP);
        OapiAttendanceGroupAddRequest req = new OapiAttendanceGroupAddRequest();
        req.setOpUserId(userId);
        OapiAttendanceGroupAddRequest.TopGroupVo topGroupVo = new OapiAttendanceGroupAddRequest.TopGroupVo();
        topGroupVo.setOwner(userId);
        topGroupVo.setEnableEmpSelectClass(true);
        topGroupVo.setCorpId(AppConfig.getCorpId());
        topGroupVo.setSkipHolidays(true);
        topGroupVo.setPositions(positionVos);
        topGroupVo.setModifyMember(true);
        topGroupVo.setType("TURN");
        topGroupVo.setMembers(memberVos);
        topGroupVo.setName(attendanceName);
        topGroupVo.setEnableNextDay(false);
        topGroupVo.setManagerList(Arrays.asList(userId));
        req.setTopGroup(topGroupVo);

        OapiAttendanceGroupAddResponse rsp = client.execute(req, accessToken);
        log.info("create group rsp body:{}", rsp.getBody());
        if(rsp.getSuccess()){
            return rsp.getResult();
        }
        return null;
    }


    /**
     * 创建考勤班次
     *
     * @param
     * @return
     */
    public OapiAttendanceShiftAddResponse.TopAtClassVo createShift(String userId,
                                                                 String classGroupName,
                                                                 String checkTime,
                                                                 String shiftName) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 构建班次信息
        // 更多设置可参考文档： https://developers.dingtalk.com/document/app/create-modify-shifts
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_CREATE_SHIFT);
        OapiAttendanceShiftAddRequest request = new OapiAttendanceShiftAddRequest();
        OapiAttendanceShiftAddRequest.TopAtClassVo topAtClassVo = new OapiAttendanceShiftAddRequest.TopAtClassVo();
        topAtClassVo.setOwner(userId);
        topAtClassVo.setClassGroupName(classGroupName);
        topAtClassVo.setCorpId(AppConfig.getCorpId());
        topAtClassVo.setName(shiftName);
        List<OapiAttendanceShiftAddRequest.TopAtSectionVo> sectionVos = new ArrayList<>();
        OapiAttendanceShiftAddRequest.TopAtSectionVo sectionVo = new OapiAttendanceShiftAddRequest.TopAtSectionVo();
        List<OapiAttendanceShiftAddRequest.TopAtTimeVo> timeVos = new ArrayList<>();
        OapiAttendanceShiftAddRequest.TopAtTimeVo timeVo = new OapiAttendanceShiftAddRequest.TopAtTimeVo();
        timeVo.setAcross(0L);
        timeVo.setBeginMin(0L);
        timeVo.setCheckTime(StringUtils.parseDateTime(checkTime));
        timeVo.setCheckType("OnDuty");
        timeVo.setFreeCheck(false);
        timeVos.add(timeVo);
        sectionVo.setTimes(timeVos);
        sectionVos.add(sectionVo);
        topAtClassVo.setSections(sectionVos);

        OapiAttendanceShiftAddResponse rsp = client.execute(request, accessToken);
        log.info("create shift rsp body:{}", rsp.getBody());
        if(rsp.getSuccess()){
            return rsp.getResult();
        }
        return null;
    }


    /**
     * 考勤排班
     *
     * @param
     * @return
     */
    public OapiAttendanceGroupScheduleAsyncResponse attendanceSchedule(String userId,
                                                                          Long groupId,
                                                                          List<OapiAttendanceGroupScheduleAsyncRequest.TopScheduleParam> list
                                                                ) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 排班制-考勤组排班
        // 更多设置可参考文档： https://developers.dingtalk.com/document/app/scheduling-system-attendance-group-scheduling
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_SCHEDULE);
        OapiAttendanceGroupScheduleAsyncRequest req = new OapiAttendanceGroupScheduleAsyncRequest();
        req.setOpUserId(userId);
        req.setGroupId(groupId);
        req.setSchedules(list);
        OapiAttendanceGroupScheduleAsyncResponse rsp = client.execute(req, accessToken);
        log.info("create shift rsp body:{}", rsp.getBody());
        if(rsp.getSuccess()){
            return rsp;
        }
        return null;
    }

    /**
     * 上传打卡记录
     *
     * @param
     * @return
     */
    public OapiAttendanceRecordUploadResponse uploadRecord(String userId,
                                                                String deviceName,
                                                                String deviceId,
                                                                String time
                                                                ) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 上传打卡记录
        // 更多设置可参考文档： https://developers.dingtalk.com/document/app/upload-punch-records
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.RECORD_UPLOAD);
        OapiAttendanceRecordUploadRequest req = new OapiAttendanceRecordUploadRequest();
        req.setUserid(userId);
        req.setDeviceName(deviceName);
        req.setDeviceId(deviceId);
        req.setUserCheckTime(StringUtils.parseDateTime(time).getTime());
        OapiAttendanceRecordUploadResponse rsp = client.execute(req, accessToken);
        log.info("create shift rsp body:{}", rsp.getBody());
        if(rsp.getSuccess()){
            return rsp;
        }
        return null;
    }

    /**
     * 获取打卡结果
     *
     * @param
     * @return
     */
    public List<OapiAttendanceListResponse.Recordresult> attendanceList(String workDateFrom,
                                                                String workDateTo,
                                                                List<String> userIdList,
                                                                long offset,
                                                                long limit
                                                                ) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 获取打卡结果
        // 更多设置可参考文档： https://developers.dingtalk.com/document/app/open-attendance-clock-in-data
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_LIST);
        OapiAttendanceListRequest req = new OapiAttendanceListRequest();
        req.setWorkDateFrom(workDateFrom);
        req.setWorkDateTo(workDateTo);
        req.setUserIdList(userIdList);
        req.setOffset(offset);
        req.setLimit(limit);
        OapiAttendanceListResponse rsp = client.execute(req, accessToken);
        log.info("create shift rsp body:{}", rsp.getBody());
        if("ok".equals(rsp.getErrmsg())){
            return rsp.getRecordresult();
        }
        return null;
    }

    /**
     * 假勤审批-查询请假状态
     *
     * @param
     * @return
     */
    public OapiAttendanceGetleavestatusResponse.LeaveStatusListVO getLeaveStatus(String userIdList,
                                                                Long startTime,
                                                                Long endTime
                                                                ) throws ApiException {
        // 1. 获取access_token
        String accessToken = AccessTokenUtil.getAppAccessToken();

        // 2. 查询用户请假状态
        // 更多设置可参考文档：https://developers.dingtalk.com/document/app/query-status
        DingTalkClient client = new DefaultDingTalkClient(UrlConstant.ATTENDANCE_GET_STATUS);
        OapiAttendanceGetleavestatusRequest req = new OapiAttendanceGetleavestatusRequest();
        req.setUseridList(userIdList);
        req.setStartTime(startTime);
        req.setEndTime(endTime);
        req.setOffset(0L);
        req.setSize(10L);
        OapiAttendanceGetleavestatusResponse rsp = client.execute(req, accessToken);
        log.info("create shift rsp body:{}", rsp.getBody());
        if(rsp.getSuccess()){
            return rsp.getResult();
        }
        return null;
    }



}
