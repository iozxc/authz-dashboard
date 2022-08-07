<template>
  <a-input-group compact>
    <a-select :default-value="sp" @change="change" :disabled="valueMatchType!=='range'">
      <a-select-option :value="1">
        相等
      </a-select-option>
      <a-select-option :value="2">
        范围
      </a-select-option>
    </a-select>
    <a-auto-complete
      @select="selectMin"
      :filter-option="filterOption"
      @blur="inputBlurMin"
      v-model:value="v1"
      option-label-prop="value"
      :style="sp===2?'width: 110px;':'width: 250px;'" style="text-align: center;transition: unset"
      placeholder="最小值"
      @focus="focusMin"
      :open="focusMinV"
    >
      <template slot="dataSource">
        <a-select-option v-for="opt in args" :key="'min'-opt" :value="opt.split(':')[0].trim()">
            {{ opt }}
        </a-select-option>
      </template>
    </a-auto-complete>
    <a-input
      v-if="sp===2"
      style=" width: 30px;  pointer-events: none; background-color: #fff;transition: unset"
      placeholder="-"
      disabled
    />
    <a-auto-complete
      v-if="sp===2"
      v-model:value="v2"
      @focus="focusMax"
      :open="focusMaxV"
      @select="selectMax"
      @blur="inputBlurMax"
      :filter-option="filterOption"
      option-label-prop="value"
      style="width: 110px;  text-align: center;transition: unset" placeholder="最大值"
    >
      <template slot="dataSource">
        <a-select-option v-for="opt in args" :key="'max'-opt" :value="opt.split(':')[0].trim()">
            {{ opt }}
        </a-select-option>
      </template>
    </a-auto-complete>
  </a-input-group>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'RangeInput',
  props: {
    items: {
      type: Array
    },
    itemIndex: {
      type: Number
    },
    valueMatchType: {
      type: String
    },
    valueType: {
      type: String
    }
  },
  data () {
    return {
      sp: 1,
      v1: null,
      v2: null,
      int_arr: ['int', 'long', 'byte', 'biginteger'],
      float_arr: ['double', 'float', 'bigdecimal'],
      regex: /#{.*}/,
      selectedItems: ['x'],
      value: '',
      argsRaw: [],
      focusMinV: false,
      focusMaxV: false
    }
  },
  created () {
    let arr = this.items[this.itemIndex].split('-')
    this.v1 = arr[0]
    if (arr.length === 2) this.v2 = arr[1]
    this.sp = arr.length
    this.argsRaw = Object.keys(this.docs.argResource)
  },
  methods: {
    focusMin () {
      this.focusMinV = true
    },
    focusMax () {
      this.focusMaxV = true
    },
    selectMin (input, option) {
      this.v1 = input
      this.focusMinV = false
    },
    selectMax (input, option) {
      this.v2 = input
      this.focusMaxV = false
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      )
    },
    formatValue (val) {
      if (this.regex.test(val)) {
        let a = this.regex.exec(val)
        let rawValue = a.input.substring(2, a.input.length - 1)
        if (this.argsRaw.includes(rawValue.split('.')[0])) {
          return a.input
        }
      }
      if (this.int_arr.includes(this.valueType)) {
        let a = parseInt(val)
        if (isNaN(a)) {
          return 0
        } else {
          return a
        }
      } else if (this.float_arr.includes(this.valueType)) {
        let a = parseFloat(val)
        if (isNaN(a)) {
          return 0
        } else {
          return a
        }
      }
      return val
    },
    inputBlurMin (v) {
      this.v1 = this.formatValue(`${v}`.trim())
      this.concat()
      this.focusMinV = false
    },
    inputBlurMax (v) {
      this.v2 = this.formatValue(`${v}`.trim())
      this.concat()
      this.focusMaxV = false
    },
    concat () {
      let a
      if (this.sp === 2) {
        a = `${this.v1}-${this.v2}`
      } else {
        a = `${this.v1}`
      }
      this.$set(this.items, this.itemIndex, a)
    },
    change (v) {
      this.sp = v
    },

  },
  computed: {
    ...mapState(['docs']),
    args () {
      return Object.keys(this.docs.argResource).map(v => `#{${v}} ${this.docs.argResource[v].description ? ': ' + this.docs.argResource[v].description : ''}`)
    }
  }

}
</script>

<style lang="less" scoped>

</style>
