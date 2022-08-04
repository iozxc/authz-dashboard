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
    <a-input

      @blur="inputBlurMin"
      v-model:value="v1"
      :style="sp===2?'width: 100px;':'width: 230px;'" style="text-align: center;transition: unset"
      placeholder="最小值"/>
    <a-input
      v-if="sp===2"
      style=" width: 30px;  pointer-events: none; background-color: #fff;transition: unset"
      placeholder="-"
      disabled
    />
    <a-input v-if="sp===2"
             v-model:value="v2"
             @blur="inputBlurMax"
             style="width: 100px;  text-align: center;transition: unset" placeholder="最大值"/>
  </a-input-group>
</template>

<script>

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
      regex: /#{.*}/
    }
  },
  created () {
    console.log(this.valueType)
    let arr = this.items[this.itemIndex].split('-')
    this.v1 = arr[0]
    if (arr.length === 2) this.v2 = arr[1]
    this.sp = arr.length
  },
  methods: {
    formatValue (val) {
      if (this.regex.test(val)) {
        return this.regex.exec(val)
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
      this.v1 = this.formatValue(v.target.value)
      this.concat()
    },
    inputBlurMax (v) {
      this.v2 = this.formatValue(v.target.value)
      this.concat()
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

  computed: {}

}
</script>

<style lang="less" scoped>

</style>
