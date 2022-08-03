<template>
  <div class="rate-limit">
    <div>
      <a-row>
        <a-col :xs="24" :sm="24" :md="14" :lg="10" :xl="10">
         <h4 class="title">窗口大小【毫秒】</h4>
         <div class="rate-limit-item window">
            <a-input :value="window"
                     @change="onChangeWindow">
              <div slot="addonAfter">毫秒</div>
            </a-input>
          </div>
          <h4 class="title">窗口内最大请求数</h4>
          <div class="rate-limit-item max-requests">
             <a-input :value="maxRequests"
                      @change="onChangeMaxRequests"
                      @blur="onChangeMaxRequests">
               <div slot="addonAfter">次</div>
             </a-input>
          </div>
          <h4 class="title">最小间隔【毫秒】（若两次请求间隔低于此值，将拦截 - 0为不做限制）</h4>
          <div class="rate-limit-item min-interval">
             <a-input :value="minInterval" @change="onChangeMinInterval">
               <div slot="addonAfter">毫秒</div>
             </a-input>
          </div>
          <div class="check-type">
            <a-radio-group :default-value="rateLimit.checkType" @change="changeType">
              <a-radio-button value="ip">
                ip
              </a-radio-button>
              <a-radio-button value="userId">
                userId
              </a-radio-button>
            </a-radio-group>
          </div>
        </a-col>
         <a-col :xs="24" :sm="24" :md="10" :lg="14" :xl="14">
          <div class="associated-patterns">
            <h4 class="title">关联的路径（当此路径被封禁时，关联的路径也会封禁）</h4>
            <a-select
              mode="tags"
              :default-value="rateLimit.associatedPatterns"
              style="width: 100%"
              placeholder="选择关联的路径"
              @change="handleChange"
            >
              <a-select-option v-for="v in paths" :key="v">
                {{ v }}
              </a-select-option>
            </a-select>
          </div>
        </a-col>
      </a-row>
      <div style="margin-right: 130px ">
         <h4 class="title">惩罚等级 & 封禁时间【毫秒】</h4>
         <div class="punishment-time scroll">
            <div class="punishment-time-item-i"
                 :key="'punishment-time-item-'+i"
                 v-for="(v,i) in rateLimit.punishmentTime">
               <editor-div class="punishment-time-item scroll"
                           :value="v"
                           :callback="i"
                           @callback="modify"
                           @blur="blur"
                           @edit="punishmentTimeEdit"></editor-div>
              <sup class="sup-close" @click="close(i)">
                <svg class="icon" aria-hidden="true" style="font-size: 8px;">
                  <use xlink:href="#icon-close-circle"></use>
                </svg>
              </sup>
               <div>-></div>
            </div>
            <div class="time-add" @click="addTime">ADD</div>
          </div>
      </div>

     </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EditorDiv from '@/components/EditorDiv'

export default {
  name: 'RateLimit',
  components: { EditorDiv },
  props: {
    rateLimit: {
      type: Object,
      default: {
        window: 0,
        maxRequests: 0,
        minInterval: 0,
        associatedPatterns: []
      }
    }
  },
  data () {
    return {
      top: 10,
      i: -1,
      window: 0,
      minInterval: 0,
      maxRequests: 0
    }
  },
  computed: {
    ...mapState(['docs']),
    paths () {
      let arr = []
      for (let path in this.docs.paths) {
        for (let method in this.docs.paths[path]) {
          arr.push(`${method} ${path}`)
        }
      }
      return arr
    }
  },
  created () {
    this.maxRequests = Number(this.rateLimit.maxRequests)
    this.window = Number(this.rateLimit.window)
    this.minInterval = Number(this.rateLimit.minInterval)
  },
  methods: {
    close (i) {
      this.$delete(this.rateLimit.punishmentTime, i)
    },
    changeType (v) {
      this.$message.info(`检查类型为 ${v.target.value}`)
    },
    blur () {
      this.rateLimit.punishmentTime.sort((a, b) => {
        return a - b
      })
      this.$forceUpdate()
    },
    modify (i) {
      this.i = i
    },
    addTime (t) {
      let a = this.rateLimit.punishmentTime.length
      if (a === 0) {
        this.rateLimit.punishmentTime.push(1000)
      } else {
        this.rateLimit.punishmentTime.push(this.rateLimit.punishmentTime[a - 1] * 2)
      }
    },
    punishmentTimeEdit (v) {
      let a = Number(v)
      if (isNaN(a)) {
        this.rateLimit.punishmentTime[this.i] = 0
      } else {
        this.rateLimit.punishmentTime[this.i] = a
      }
    },
    handleChange (value) {
      this.rateLimit.associatedPatterns = value
    },
    onChangeMinInterval (v) {
      if (isNaN(Number(v.target.value))) {
        this.minInterval = 0
      } else {
        this.minInterval = Number(v.target.value)
      }
      this.rateLimit.minInterval = this.minInterval
    },
    onChangeWindow (v) {
      if (isNaN(Number(v.target.value))) {
        this.window = 0
      } else {
        this.window = Number(v.target.value)
      }
      this.rateLimit.window = this.window
    },
    onChangeMaxRequests (v) {
      if (isNaN(Number(v.target.value))) {
        this.maxRequests = 0
      } else {
        this.maxRequests = Number(v.target.value)
      }
      this.rateLimit.maxRequests = this.maxRequests
    }
  }
}
</script>

<style lang="less" scoped>
.rate-limit-item {
  text-align: center;
}

.window {
  width: 200px;
  margin: auto;
}

.max-requests {
  width: 200px;
  margin: auto;
}

.min-interval {
  width: 200px;
  margin: auto;
}

.rate-limit {
  .title {
    text-align: center;
    margin-top: 10px;
  }
}

.check-type {
  width: 170px;
  margin: auto;
  position: absolute;
  top: 0;
}

.punishment-time {
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 10px;
  margin-left: 100px;
}

.associated-patterns {
  text-align: center;
  max-height: 200px;
  overflow-y: scroll;
}

.punishment-time-item-i {
  display: flex;
  justify-items: center;
  align-items: center;
}

.punishment-time-item {
  margin: 0 10px;
  background-color: #d5d5d5a6;
  padding: 3px 7px;
  border-radius: 5px;
  max-width: 200px;
  height: 34px;
  line-height: 28px;
  min-width: 72px;
  text-align: center;
}

.time-add {
  font-weight: 700;
  padding: 4px;
  border-radius: 7px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  user-select: none;
  width: 36px;
  height: 32px;
  cursor: cell;
  margin: 0 10px;
  background-color: var(--add-background);
  border: var(--add-border);
}

.ant-select-selection--multiple {
  min-height: 160px !important;
}

.sup-close {
  top: -15px;
  left: -18px;
  cursor: pointer;
  width: 0px;
}


@media screen and (max-width: 900px) {
  .punishment-time {
    margin-left: 50px;
  }
}

@media screen and (max-width: 767px) {
  .punishment-time {
    margin: 0 20px;
  }
}


</style>
