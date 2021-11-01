### 考勤模块--demo

- 此demo主要展示考勤相关模块功能，包括考勤规则模块、考勤打卡模块、考勤统计模块、假期审批模块等。
- 项目结构
  - backend：后端模块，springboot构建，接口功能包括：创建考勤组、创建考勤班次、考勤排班安排、查询考勤数据、上传考勤打卡记录、查询考勤假期状态等功能。
  - frontend：前端模块，react构建，场景功能包括：自动登录，设置考勤组信息、构建班次信息、上传打卡记录、展示考勤记录、展示假期状态等。

### 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个H5应用： https://open-dev.dingtalk.com/#/index

4. 配置应用

   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

   - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

     https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration

![image-20210706171740868](https://img.alicdn.com/imgextra/i4/O1CN01C9ta8k1L3KzzYEPiH_!!6000000001243-2-tps-953-517.png)



配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

本demo使用接口相关权限：

- 通讯录管理——成员信息读权限
- 考勤——企业考勤数据上传权限
- 考勤——考勤组管理权限
- 考勤——查询企业考勤数据权限

![image-20210706172027870](https://img.alicdn.com/imgextra/i3/O1CN016WCr6428wDdBhkWi6_!!6000000007996-2-tps-1358-571.png)



### 运行前准备

 下载demo

```shell
git clone https://github.com/open-dingtalk/h5app-attendance-demo.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

### 修改前端页面

**打开项目，命令行中执行以下命令，编译打包生成build文件**

```shell
cd front-end
npm install
npm run build
```

**将打包好的静态资源文件放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)

### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到创建的应用，进入应用



### 运行展示（部分）

![image-20210909163138817](https://img.alicdn.com/imgextra/i1/O1CN01Vns1ph1NFMeWG3uS1_!!6000000001540-0-tps-1080-2400.jpg)

应用首页

![image-20210909164323214](/Users/nannanness/Desktop/1.jpg)

自动登录

![image-20210909163811222](https://img.alicdn.com/imgextra/i4/O1CN01OvnRyS1xwFuLIPqvi_!!6000000006507-0-tps-576-1280.jpg)

创建考勤组

![6](https://img.alicdn.com/imgextra/i3/O1CN01qAvgIF1Wjtb0Xky3K_!!6000000002825-0-tps-1080-512.jpg)

系统提示

![image-20210909164100930](https://img.alicdn.com/imgextra/i1/O1CN01M1v9lV257Qt1I4bT5_!!6000000007479-0-tps-576-1280.jpg)

上传打卡

![image-20210909164358523](https://img.alicdn.com/imgextra/i4/O1CN0187Lpm81RSQPLIq8WR_!!6000000002110-0-tps-1080-2400.jpg)

获取打卡记录





### 参考文档

1. 创建考勤组，文档链接：https://developers.dingtalk.com/document/app/attendance-group-write
2. 创建班次信息，文档链接：https://developers.dingtalk.com/document/app/create-modify-shifts
3. 考勤组排班，文档链接：https://developers.dingtalk.com/document/app/scheduling-system-attendance-group-scheduling
4. 上传打卡记录，文档链接：https://developers.dingtalk.com/document/app/upload-punch-records
5. 获取打卡结果，文档链接：https://developers.dingtalk.com/document/app/open-attendance-clock-in-data
6. 查询请假状态，文档链接：https://developers.dingtalk.com/document/app/query-status
