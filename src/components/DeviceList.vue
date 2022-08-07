<template>
  <div>
    <a-list v-if="!loading" item-layout="horizontal" size="large" :pagination="pagination" :data-source="devices">
      <div slot="footer"><b>有效登录用户数量（共：{{ allUserid.length }} <span style="margin-left: 5px">个</span>）</b>   <span
        style="color:#e8cccc;margin-right: 10px"> | </span> <b>最近访问设备（共：{{ devices.length }} <span
        style="margin-left: 5px">个</span>）</b>  - 近2天
        <span style="margin-left: 5px;cursor: pointer" class="hover-color-yellow" @click="reload"><a-icon type="sync"/></span>
      </div>
      <a-list-item slot="renderItem" key="item.issueTokenId" slot-scope="item, index">
        <template slot="actions">
         <span class="hover-hand hover-color-green" @click="onlyLook(item.userId)">
            <a-icon type="pushpin" style="margin-right: 8px"
                    :style="onlylook?'color: green':''"/> {{ !onlylook ? '只看该用户' : '查看全部用户' }}
          </span>
           <span class="hover-hand hover-color-purple"
                 @click="checkLogin(item.userId,item.id, item.deviceType, item.deviceId)">
             <a-icon type="bug" style="margin-right: 8px"/> 登录检查
          </span>
          <span class="hover-hand hover-color-yellow"
                @click="logout(item.userId,item.id, item.deviceType, item.deviceId)">
             <a-icon type="logout" style="margin-right: 8px"/> 下线
          </span>
          <span class="hover-hand hover-color-red"
                @click="ban(item.userId,item.id, item.deviceType, item.deviceId,item.lastRequestIp)">
            <a-icon type="disconnect" style="margin-right: 8px"/> 封号
          </span>
        </template>

        <a-list-item-meta>
          <div slot="title">
            <sapn :class="{'deny':item.denyUser,'live':!item.denyUser&&allUserid.includes(item.userId)}">用户Id：{{
                item.userId
              }}</sapn>
            <span style="margin-left: 10px" v-if="item.deviceType"
                  :class="{'deny':item.denyDevice}">设备Type：{{ item.deviceType }}</span>
            <span style="margin-left: 10px" v-if="item.deviceId" :class="{'deny':item.denyDevice}">设备ID：{{
                item.deviceId
              }}</span>
          </div>
          <div slot="description">
            <span class="description-item">最后一次访问时间：{{ item.lastRequestTime }}</span>
            <span class="description-item" :class="item.denyIp?'deny':''">最后一次访问IP：{{ item.lastRequestIp }}</span>
            <span class="description-item">登录标识：{{ item.id }}</span>
            <span v-if="item.denyIpRange" class="deny">此网段被封禁</span>
          </div>
        </a-list-item-meta>

      </a-list-item>
      <a-drawer
        placement="right" :closable="false"
        title="封号"
        :width="720"
        :visible="show"
        @close="onClose"
        :body-style="{ paddingBottom: '80px' }"
      >
        <a-row>
          <h3>
            用户信息
          </h3>
          <a-col :span="24" :style="pStyle">
            <b style="margin-right: 10px">用户id：</b>{{ curUser.userId }}
          </a-col>
          <a-col :span="24" :style="pStyle">
            <b style="margin-right: 10px">登录标识: </b> {{ curUser.id }}
          </a-col>
          <a-col :span="24" :style="pStyle">
            <b style="margin-right: 10px">最后一次访问IP: </b> {{ curUser.ip }}
          </a-col>
          <a-col :span="24" :style="pStyle">
            <b style="margin-right: 10px">设备Type: </b> {{ curUser.deviceType }}
          </a-col>
          <a-col :span="24" :style="pStyle" v-if="curUser.deviceId">
            <b style="margin-right: 10px">设备ID: </b> {{ curUser.deviceId }}
          </a-col>
        </a-row>
        <a-divider v-if="curUser.deny"/>
        <a-row v-if="curUser.deny">
          <h3>
            封禁信息
          </h3>
          <a-col :span="24" :style="pStyle">
            <b>用户信息: </b>
            <div v-if="curUser.deny.userId" class="deny-inner-info">
              <span>用户id：</span> {{ curUser.deny.userId.userId }}  <br>
              <span>结束时间：</span> {{ curUser.deny.userId.timeMeta.end }}  <br>
              <span>封禁时长（开始到结束）:</span> {{ curUser.deny.userId.timeMeta.time }} <span class="deny-inner-info-button"
                                                                                      @click="removeUserDeny"><a-icon
              type="delete"/>移除</span> <br>
            </div>
            <div class="deny-inner-info" v-else>
              无
            </div>
          </a-col>
          <a-col :span="24" :style="pStyle">
            <b>设备信息：</b>
            <div v-if="curUser.deny.device" class="deny-inner-info">
              <span>封禁设备Type：</span> {{ curUser.deny.device.deviceType }}  <br>
              <span>封禁设备Id：</span> {{ curUser.deny.device.deviceId }}  <br>
              <span>结束时间：</span> {{ curUser.deny.device.timeMeta.end }} <br>
              <span>封禁时长（开始到结束）:</span> {{ curUser.deny.device.timeMeta.time }}  <span class="deny-inner-info-button"
                                                                                       @click="removeDeviceDeny"><a-icon
              type="delete"/>移除</span> <br>
            </div>
            <div class="deny-inner-info" v-else>
              无
            </div>
          </a-col>
          <a-col :span="24" :style="pStyle">
            <b>ip信息: </b>
            <div v-if="curUser.deny.ip" class="deny-inner-info">
              <span>封禁ip：</span> {{ curUser.deny.ip.ip }}  <br>
              <span>结束时间：</span> {{ curUser.deny.ip.timeMeta.end }} <br>
              <span>封禁时长（开始到结束）:</span> {{ curUser.deny.ip.timeMeta.time }}  <span class="deny-inner-info-button"
                                                                                   @click="removeIpDeny"><a-icon
              type="delete"/>移除</span> <br>
            </div>
            <div class="deny-inner-info" v-else>
              无
            </div>
          </a-col>
        </a-row>
        <a-divider/>
        <a-form :form="form" layout="vertical"
                @submit="handleSubmit" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="封禁类型">
                <a-select
                  v-decorator="[
                    'type',
                    {
                      rules: [{ required: true, message: '请选择封禁类型' }],
                    },
                  ]"
                  placeholder="封禁类型"
                >
                  <a-select-option value="ip">
                    IP
                  </a-select-option>
                  <a-select-option value="user">
                    User
                  </a-select-option>
                  <a-select-option value="device" @select="">
                    Device
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="结束时间">
               <a-date-picker
                 v-decorator="[
                    'denyEndDateTime',
                    {
                      rules: [{ required: true, message: '请选择结束时间' }],
                    },
                  ]"
                 style="width: 100%"
                 placeholder="结束时间"
                 :get-popup-container="trigger => trigger.parentNode"
                 show-time>
                <template slot="renderExtraFooter">
                  解除封禁的时间
                </template>
              </a-date-picker>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            取消
          </a-button>
          <a-button type="primary" @click="handleSubmit">
            提交
          </a-button>
        </div>
      </a-drawer>
    </a-list>
    <a-skeleton v-if="loading" :title="false" active/>
    <a-skeleton v-if="loading" :title="false" active/>
    <a-skeleton v-if="loading" :title="false" active/>
  </div>
</template>

<script>

export default {
  name: 'DeviceList',
  components: {},
  props: {
    blacklist: {}
  },
  data () {
    return {
      show: false,
      pStyle: {
        marginTop: '12px',
      },
      loading: true,
      rawDevices: [],
      curUser: {},
      form: this.$form.createForm(this),
      onlylook: false,
      allUserid: [],
      devices: [{
        deviceType: '',
        deviceId: '',
        userId: '',
        lastRequestTime: null,
        lastRequestIp: '',
        id: '',
      }],
      userBlacklist: [],
      ipBlacklist: [],
      iprangeBlacklist: [],
      pagination: {
        onChange: page => {
          // skip
        },
        pageSize: 8,
      },
    }
  },
  methods: {
    removeUserDeny () {
      this.removeDeny('user')
    },
    removeDeviceDeny () {
      this.removeDeny('device')
    },
    removeIpDeny () {
      this.removeDeny('ip')
    },
    removeDeny (type) {
      let data = {
        userId: this.curUser.userId,
        deviceType: this.curUser.deviceType,
        deviceId: this.curUser.deviceId,
        ip: this.curUser.ip,
        type
      }
      this.$http.post('/device/deny-remove', data).then(res => {
        if (res.code === 100) {
          this.$set(this.curUser, 'deny', res.data)
          this.reload()
          this.reloadDenyInfo()
          this.$message.success('ok')
        } else {
          this.$message.success('error')
        }
      })
    },
    reloadDenyInfo () {
      let data = {
        userId: this.curUser.userId,
        deviceType: this.curUser.deviceType,
        deviceId: this.curUser.deviceId,
        ip: this.curUser.ip
      }
      this.$http.post('/device/get-deny-info', data).then(res => {
        if (res.code === 100) {
          this.$set(this.curUser, 'deny', res.data)
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {

          let data = {
            date: values.denyEndDateTime.format('YYYY-MM-DD HH:mm:ss'),
            type: values.type,
          }
          if (data.type === 'ip') {
            data.ip = this.curUser.ip
          }
          if (data.type === 'user' || data.type === 'device') {
            data.userId = this.curUser.userId
          }
          if (data.type === 'device') {
            data.deviceType = this.curUser.deviceType
            data.deviceId = this.curUser.deviceId
          }
          this.$http.post('/device/deny', data).then(res => {
            if (res.code === 100) {
              this.$message.success('成功')
              this.reload()
              this.reloadDenyInfo()
            }
          })
          this.form = this.$form.createForm(this)
        }
      })
    },
    ban (userId, id, deviceType, deviceId, ip) {
      let data = {
        userId,
        deviceType,
        deviceId,
        ip
      }
      this.curUser = {
        ...data,
        id
      }

      this.reloadDenyInfo()
      this.form = this.$form.createForm(this)

      this.show = true
    },
    onClose () {
      this.show = false
    },
    onlyLook (userId) {
      if (this.onlylook) {
        this.onlylook = false
        this.devices = this.rawDevices
      } else {
        this.onlylook = true
        this.devices = this.rawDevices.filter(v => v.userId === userId)
      }

    },
    logout (userId, id, deviceType, deviceId) {
      this.$http.get('/device/logout', {
        params: {
          userId,
          id
        }
      }).then(res => {
        if (res.code === 100) {
          this.$message.success(
            <div>
              <div> 用户id：{userId} </div>
             <div>
                设备: {deviceType} - {deviceId} 已下线
             </div>
            </div>)
        }
      })
      this.$http.get('/device/get-all-userid').then(res => {
        this.allUserid = res.data
      })
    },
    checkLogin (userId, id, deviceType, deviceId) {
      this.$http.get('/device/check-is-login', {
        params: {
          userId,
          id
        }
      }).then(res => {
        if (res.data === true) {
          this.$message.success(
            <div>
              <div> 用户id：{userId} 登录标识：{id} </div>
              <div>
                  设备: {deviceType} - {deviceId} 登录有效
              </div>
            </div>)
        } else {
          this.$message.warn(
            <div>
              <div> 用户id：{userId} 登录标识：{id} </div>
              <div>
                 设备: {deviceType} - {deviceId} 此登录失效
              </div>
            </div>)
        }
      })
    },
    reload () {
      this.loading = true
      this.$http.get('/device/active-users', {
        params: {
          time: '2d'
        }
      }).then(res => {
        this.rawDevices = res.data
        this.devices = res.data
        this.loading = false
      })
    }
  },
  mounted () {
    this.$http.get('/device/active-users', {
      params: {
        time: '2d'
      }
    }).then(res => {
      this.rawDevices = res.data
      this.devices = res.data
      this.loading = false
    })
    this.$http.get('/device/get-all-userid').then(res => {
      this.allUserid = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.ant-list-item-meta {
  margin-bottom: -12px !important;
}

.description-item {
  margin-left: 10px;
}

.hover-color-red:hover {
  color: #ff0a0a;
}

.hover-color-yellow:hover {
  color: #ce7e49;
}

.hover-color-green:hover {
  color: #68a201;
}

.hover-color-purple:hover {
  color: palevioletred;
}

.deny {
  color: #ff0a0a;
}

.live {
  color: #88b3e3;
}

.deny-inner-info {
  margin-left: 10px;
  margin-top: 5px;
}

.deny-inner-info > span {
  margin-top: 5px;
  display: inline-block;
}

.deny-inner-info-button {
  position: relative;
  float: right;
  right: 60px;
  user-select: none;
  cursor: pointer;
}

.deny-inner-info-button:hover {
  color: red;
}


</style>
