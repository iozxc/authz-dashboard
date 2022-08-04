<template>
  <a-input-group compact>
    <a-select :default-value="sp" @change="change">
      <a-select-option :value="1">
        相等
      </a-select-option>
      <a-select-option :value="2">
        范围
      </a-select-option>
    </a-select>
    <a-input
      :default-value="items[itemIndex].split('-')[0]"
      @blur="inputBlurMin"
      :style="sp===2?'width: 100px;':'width: 230px;'" style="text-align: center;transition: unset"
      placeholder="最小值"/>
    <a-input
      v-if="sp===2"
      style=" width: 30px;  pointer-events: none; background-color: #fff;transition: unset"
      placeholder="-"
      disabled
    />
    <a-input v-if="sp===2"
             :default-value="items[itemIndex].split('-')[1]"
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
    }
  },
  data () {
    return {
      sp: 1,
      _v1: '',
      _v2: '',
    }
  },
  created () {
    console.log(this.items)
    let arr = this.items[this.itemIndex].split('-')
    this._v1 = arr[0]
    if (arr.length === 2) this._v2 = arr[1]
    this.sp = arr.length
  },
  methods: {
    inputBlurMin (v) {
      this._v1 = v.target.value
      let a
      if (this.sp === 2) {
        a = `${this._v1}-${this._v2}`
      } else {
        a = `${this._v1}`
      }
      this.$set(this.items, this.itemIndex, a)
    },
    inputBlurMax (v) {
      this._v2 = v.target.value
      let a
      if (this.sp === 2) {
        a = `${this._v1}-${this._v2}`
      } else {
        a = `${this._v1}`
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
