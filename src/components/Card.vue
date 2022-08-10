<template>
  <div class="card" :class="s?'compact-item':''">

    <h2><span class="compact" @click="compact">API权限</span></h2>
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
    </a-col>
    </a-row>
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
    return {
      s: false
    }
  },
  methods: {
    compact () {
      this.s = !this.s
    },
    add (v1, v2) {
    }
  }
}
</script>

<style lang="less" scoped>
.aos {
  margin-bottom: 10px;
}

.compact {
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;
}

.compact-item {
  height: 66px;
  overflow: hidden;
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

//.func-back() {
//  background-color: #fffcfc70;
//  padding: 10px;
//  border: 2px dashed darkgrey;
//  border-radius: 10px;
//}
//
//.func-role-back{
//  .func-back();
//}


</style>
