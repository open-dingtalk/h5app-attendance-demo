package com.dingtalk.constant;

/**
 * 钉钉开放接口网关常量
 */
public class UrlConstant {

    /**
     * 获取access_token url
     */
    public static final String GET_ACCESS_TOKEN_URL = "https://oapi.dingtalk.com/gettoken";

    /**
     * 创建考勤组 url
     */
    public static final String ATTENDANCE_CREATE_GROUP = "https://oapi.dingtalk.com/topapi/attendance/group/add";
    /**
     * 上传打卡记录 url
     */
    public static final String RECORD_UPLOAD = "https://oapi.dingtalk.com/topapi/attendance/record/upload";
    /**
     * 获取打卡记录 url
     */
    public static final String ATTENDANCE_LIST = "https://oapi.dingtalk.com/attendance/list";
    /**
     * 获取请假状态 url
     */
    public static final String ATTENDANCE_GET_STATUS = "https://oapi.dingtalk.com/topapi/attendance/getleavestatus";

    /**
     * 创建班次 url
     */
    public static final String ATTENDANCE_CREATE_SHIFT = "https://oapi.dingtalk.com/topapi/attendance/shift/add";
    /**
     * 考勤排班 url
     */
    public static final String ATTENDANCE_SCHEDULE = "https://oapi.dingtalk.com/topapi/attendance/group/schedule/async";
    /**
     * 更新考勤组 url
     */
    public static final String UPDATE_GROUP = "https://oapi.dingtalk.com/topapi/attendance/group/modify";

    /**
     * 通过免登授权码获取用户信息 url
     */
    public static final String GET_USER_INFO_URL = "https://oapi.dingtalk.com/topapi/v2/user/getuserinfo";
    /**
     * 根据用户id获取用户详情 url
     */
    public static final String USER_GET_URL = "https://oapi.dingtalk.com/topapi/v2/user/get";
   }
