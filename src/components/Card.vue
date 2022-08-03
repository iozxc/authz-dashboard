<template>
  <div class="card">
    <div>
      <h3>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-people"></use>
        </svg>
        Roles
      </h3>
      <div class="card-item-sl">
         <h4 class="require">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-require"></use>
          </svg>
           require
         </h4>
         <and-or-select class="aos"
                        :items="path.auth.requireRoles"></and-or-select>
         <h4 class="exclude">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-p-exclude"></use>
          </svg>
           exclude
         </h4>
         <and-or-select class="aos"
                        :items="path.auth.excludeRoles"></and-or-select>
      </div>
    </div>
    <div>
      <h3>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-permissions"></use>
        </svg>
        Permissions
      </h3>
      <div class="card-item-sl">
         <h4 class="require">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-account_tree-o"></use>
          </svg>
           require
         </h4>
        <and-or-select class="aos"
                       :items="path.auth.requirePermissions"></and-or-select>
         <h4 class="exclude">
           <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-p-exclude"></use>
          </svg>
           exclude
         </h4>
        <and-or-select class="aos"
                       :items="path.auth.excludePermissions"></and-or-select>
      </div>
    </div>
  </div>
</template>

<script>
import AndOrSelect from '@/components/AndOrSelect'

export default {
  name: 'Card',
  components: { AndOrSelect },
  props: {
    path: {
      type: Object,
      default: {
        auth: {
          requireRoles: [],
          requirePermissions: [],
          excludeRoles: [],
          excludePermissions: []
        }
      }
    }
  },
  created () {
    console.log('create')
    if (!this.path.auth) {
      this.$set(this.path, 'auth', {
        requireRoles: [],
        requirePermissions: [],
        excludeRoles: [],
        excludePermissions: []
      })
    } else {
      if (!this.path.auth.requireRoles) this.$set(this.path.auth, 'requireRoles', [])
      if (!this.path.auth.requirePermissions) this.$set(this.path.auth, 'requirePermissions', [])
      if (!this.path.auth.excludeRoles) this.$set(this.path.auth, 'excludeRoles', [])
      if (!this.path.auth.excludePermissions) this.$set(this.path.auth, 'excludePermissions', [])
    }
  },
  mounted () {

  },
  data () {
    return {}
  },
  methods: {
    add (v1, v2) {
      console.log(v1)
      console.log(v2)
    }
  }
}
</script>

<style lang="less" scoped>
.aos {
  margin-bottom: 10px;
}

.card {
  .card-item-sl {
    margin-left: 20px;
    user-select: none;
    padding: 20px;
  }

  @media screen and (max-width: 500px) {
    .card-item-sl {
      padding: 5px;
    }
  }

}
</style>
