<template>
  <div class="container top">
    <div class="row justify-content-center">
      <div class="col-md-8">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          {{ state }}
        </div>
        <div class="card-footer">
          <b-btn-group>
            <b-button @click="$auth.fetchUser()">Fetch User</b-button>
            <b-button @click="$auth.logout()">Logout</b-button>
          </b-btn-group>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  export default {
    middleware:['auth'],
    components: {
      Logo
    },
    computed: {
      state() {
        return JSON.stringify(this.$auth.$state, undefined, 2)
      }
    }
  }
</script>

