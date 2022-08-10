<template>
  <div class="card" style="padding: 30px;background-color: rgb(228 231 230 / 31%);text-align: unset;position: relative">
    <div class="delete delete-api-per" @click="removePerm">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-delete"></use>
      </svg>
    </div>
     <div class="save save-api-per" @click="savePerm">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-save"></use>
      </svg>
    </div>
    <a-row>
      <a-col class="func-role-back" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <h3>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-people"></use>
        </svg>
        Roles
      </h3>
      <div class="card-item-sl div-text-scroll">
         <h4 class="require">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-require"></use>
          </svg>
           require
         </h4>
         <and-or-select class="aos"
                        :items="item.auth.requireRoles"></and-or-select>
         <h4 class="exclude">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-p-exclude"></use>
          </svg>
           exclude
         </h4>
         <and-or-select class="aos"
                        :items="item.auth.excludeRoles"></and-or-select>
      </div>
    </a-col>
      <a-col class="func-role-back" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <h3>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-permissions"></use>
        </svg>
        Permissions
      </h3>
      <div class="card-item-sl div-text-scroll">
         <h4 class="require">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-account_tree-o"></use>
          </svg>
           require
         </h4>
        <and-or-select class="aos"
                       :items="item.auth.requirePermissions"></and-or-select>
         <h4 class="exclude">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-p-exclude"></use>
          </svg>
           exclude
         </h4>
        <and-or-select class="aos"
                       :items="item.auth.excludePermissions"></and-or-select>
      </div>
    </a-col>
    </a-row>
  </div>
</template>

<script>
import AndOrSelect from '@/components/AndOrSelect'
import { mapState } from 'vuex'

export default {
  name: 'ControllerPerm',
  components: { AndOrSelect },
  props: {
    name: ''
  },
  computed: {
    ...mapState(['docs'])
  },
  created () {
    if (!this.docs.controllerPermissions[this.name]) {
      this.$set(this.docs.controllerPermissions, this.name, {})
    }
    this.item = this.docs.controllerPermissions[this.name]
    if (!this.item.auth) this.$set(this.item, 'auth', {})
    if (!this.item.auth.requireRoles) this.$set(this.item.auth, 'requireRoles', [])
    if (!this.item.auth.requirePermissions) this.$set(this.item.auth, 'requirePermissions', [])
    if (!this.item.auth.excludeRoles) this.$set(this.item.auth, 'excludeRoles', [])
    if (!this.item.auth.excludePermissions) this.$set(this.item.auth, 'excludePermissions', [])

  },
  mounted () {

  },
  data () {
    return {
      item: {}
    }
  },
  methods: {
    removePerm () {
      this.$confirm({
        title: '确认删除Controller权限?',
        onOk: () => {
          this.$set(this.item, 'auth', {
            requireRoles: [],
            requirePermissions: [],
            excludeRoles: [],
            excludePermissions: [],
          })

          if (this.item.hasAuth) {
            let data = {
              operate: 'delete',
              target: 'api',
              controller: this.name
            }
            this.$http.post('/operate', data).then(res => {
              if (res.code === 100) {
                this.$message.success(
                  <div style="margin-top: 10px">
                  <div>controller权限删除成功</div>
                </div>
                )
              } else {
                this.$message.error(`删除失败，网络异常`)
              }
            })
          }

          this.$set(this.item, 'hasAuth', false)

        }
      })
    },
    savePerm () {

      let data = {
        operate: 'update',
        target: 'api',
        controller: this.name,
        role: {
          require: this.item.auth.requireRoles,
          exclude: this.item.auth.excludeRoles
        },
        permission: {
          require: this.item.auth.requirePermissions,
          exclude: this.item.auth.excludePermissions
        }
      }

      this.$http.post('/operate', data).then(res => {
        if (res.code === 100) {
          let _controller = res.data
          if (!_controller.auth) {
            _controller.auth = {
              requireRoles: [],
              requirePermissions: [],
              excludeRoles: [],
              excludePermissions: []
            }
          } else {
            if (!_controller.auth.requireRoles) _controller.auth.requireRoles = []
            if (!_controller.auth.requirePermissions) _controller.auth.requirePermissions = []
            if (!_controller.auth.excludeRoles) _controller.auth.excludeRoles = []
            if (!_controller.auth.excludePermissions) _controller.auth.excludePermissions = []
          }
          this.$set(this.docs.controllerPermissions, this.name, _controller)
          this.item =   this.docs.controllerPermissions[this.name]
          console.log(this.item)
          console.log(this.docs.controllerPermissions)
          this.$message.success('保存成功，已自动去重')
        } else {
          this.$message.error('保存失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.aos {
  margin-bottom: 20px;
}

.compact {
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;
}

h2 {
  margin-bottom: 15px;
}

@media screen and (max-width: 500px) {
  .compact-item {
    height: 50px;
  }
}

.card {
  transition: height .5s ease-in-out;

  .card-item-sl {
    //margin-left: 20px;
    user-select: none;
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    .card-item-sl {
      padding: 5px;
    }

    .compact-item {
      height: 50px;
    }
  }

}

.delete {
  position: absolute;
  right: 55px;
  top: 10px;
  padding: 3px;
  background-color: #ff000099;
  box-shadow: 0 1px 2px rgba(185, 37, 37, 0.21);
  border-radius: 10px;
  cursor: pointer;
  z-index: 10;
}

.save {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  padding: 3px;
  background-color: #36c217c7;
  border-radius: 10px;
  box-shadow: var(--button-shadow-color);
  z-index: 10;
}

</style>
