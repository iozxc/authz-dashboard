<template>
  <div ref="editor" class="input-box" style="-webkit-user-select: auto" contenteditable="true" @input="inputText"
       @blur="inputBlur"
       @focus="inputFocus"></div>
</template>
<script>
export default {
  name: 'EditorDiv',
  props: ['value', 'callback'],
  data () {
    return {
      isBlur: true,
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
      this.$emit('blur')
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
