<template>
  <div class="and-or-select">
    <div class="requireRoles" ref="requireRoles">
      <div v-if="items" v-for="(item,index_1) in items"
           :key="index_1"
           style="margin-bottom: 5px"
           class="role-perms-items">
        <div class="and-or-select_or" v-if="index_1!==0">
          OR
        </div>
        <sup class="sup-close" @click="closeOr(index_1)" v-if="index_1!==0">
          <svg class="icon" aria-hidden="true" style="font-size: 8px;">
            <use xlink:href="#icon-close-circle"></use>
          </svg>
        </sup>
        <div class="s-delete" v-if="index_1===0">
          <svg class="icon" aria-hidden="true" @click="deleteAll" style="font-size: 12px;">
            <use xlink:href="#icon-delete"></use>
          </svg>
        </div>
        <div class="and-or-select_val and-or-select_val_add" v-if="!item.length"
             @click="insert(index_1)">
          INSERT
        </div>
        <div v-if="item" v-for="(val,index_2) in item"
             :key="index_1+'--'+index_2"
             class="role-perms-item"
             :style="index_2!==0?'margin-left: 0px':''"
             :class="{'role-perms-item_first':index_1===0&&index_2===0}">
          <EditorDiv class="role-perms-item_val scroll"
                     @edit="edit"
                     @callback="modifyStart"
                     :callback="[index_1,index_2]"
                     :value="item[index_2]">
          </EditorDiv>
          <sup class="sup-close" @click="close(index_1,index_2)">
            <svg class="icon" aria-hidden="true" style="font-size: 8px;">
              <use xlink:href="#icon-close-circle"></use>
            </svg>
          </sup>
          <div class="and-or-select_and"
               @click="andAdd(index_2===item.length-1, index_1)"
               :class="{'and-or-select_add':index_2===item.length-1}">
            AND
          </div>
        </div>
      </div>
      <div class="role-perms-items">
        <div class="and-or-select_or and-or-select_add" @click="orAdd">
          OR
        </div>
      </div>
  </div>
  </div>

</template>

<script>
import EditorDiv from '@/components/EditorDiv'

export default {
  name: 'AndOrSelect',
  components: { EditorDiv },
  props: {
    items: {
      type: Array
    },
  },
  mounted () {
  },
  data () {
    return {
      modify: ['', ''],
    }
  },
  computed: {},
  methods: {
    edit (v1) {
      this.$set(this.items[this.modify[0]], this.modify[1], v1)
      this.$forceUpdate()
    },
    insert (i) {
      console.log('insert')
      console.log(i)
      this.$set(this.items[i], 0, null)
      this.$forceUpdate()
    },
    orAdd () {

      // if (!this.items) this.items = []
      this.$set(this.items, this.items.length, [])
      this.$forceUpdate()
    },
    andAdd (b, i) {
      if (b) {
        this.$set(this.items[i], this.items[i].length, '')
        this.$forceUpdate()
      }
    },
    modifyStart (i) {
      this.modify = i
    },
    close (index1, index2) {
      this.$delete(this.items[index1], index2)
      this.$forceUpdate()
    },
    closeOr (index1) {
      this.$delete(this.items, index1)
      this.$forceUpdate()
    },
    deleteAll () {
      this.items.splice(0, this.items.length)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less" scoped>
.requireRoles {
}

.role-perms-items {
  display: flex;
  justify-items: center;
  align-items: center;
  min-height: 44px;
}

.role-perms-item {
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 5px 5px 5px 15px;
}

.role-perms-item_first {
  //margin-left: 45px;
}

.role-perms-item_val {
  background-color: #d5d5d5a6;
  padding: 3px 7px;
  border-radius: 5px;
  max-width: 200px;
  height: 34px;
  line-height: 28px;
  min-width: 72px;
  text-align: center;
}

.base_op() {
  font-weight: 700;
  padding: 4px;
  border-radius: 7px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  user-select: none;
  cursor: default;
}

.and-or-select_or {
  .base_op();
  width: 36px;
  background-color: #ce7e49;
  height: 32px;
  cursor: default;
}

.and-or-select_and {
  .base_op();
  width: 36px;
  margin-right: 7px;
  background-color: #ce7e49;
  height: 32px;
  margin-left: 17px;
}

.and-or-select_val {
  .base_op();
  width: 72px;
  margin-right: 10px;
  background-color: #ce7e49;
  height: 32px;
  margin-left: 10px;
}

.and-or-select_val_add {
  cursor: cell;
  background-color: var(--add-background);
  border: var(--add-border);
}

.and-or-select_add {
  cursor: cell;
  background-color: var(--add-background);
  border: var(--add-border);
}

.sup-close {
  top: -15px;
  left: -7px;
  cursor: pointer;
  width: 0px;
}

.sup-ok {
  top: 15px;
  left: -7px;
  cursor: pointer;
  width: 0px;
}

.modify-input {
  text-align: center;
  border: none;
  background-color: #fff0;
  outline: none;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  //border-radius: 5px;
}

.modify-input_text {
}

.s-delete {
  .base_op();
  width: 36px;
  background-color: #e64b4be6;
  height: 32px;
  cursor: pointer;
}



</style>
