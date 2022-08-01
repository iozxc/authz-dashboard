<template>
  <div ref="editor" class="input-box" contenteditable="true" @input="inputText" @blur="inputBlur"
       @focus="inputFocus"></div>
</template>
<script>
export default {
  name: 'EditorDiv',
  props: ['value', 'callback'], // 父组件v-model绑定的prop
  data () {
    return {
      isBlur: true, // 解决赋值时光标自动定位到起始位置
    }
  },
  watch: {
    value (val) {
      if (this.isBlur) {
        this.$refs.editor.innerHTML = val
        this.value = val

      }
    }
  },
  mounted () {
    this.$refs.editor.innerHTML = this.value
  },
  methods: {
    // 监听输入框内容
    inputText () {
      this.$emit('callback', this.callback)
      this.$emit('edit', this.$refs.editor.innerHTML)
    },
    inputFocus () {
      this.isBlur = false
    },
    inputBlur () {
      this.isBlur = true
    }
  }
}
</script>
<style scoped>
.input-box {
  background-color: #d5d5d5a6;
  padding: 3px 7px;
  border-radius: 5px;
  max-width: 200px;
  height: 34px;
  line-height: 28px;
  min-width: 72px;
  text-align: center;
}
</style>
