<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container">
      <a class="navbar-brand" href="">
        TL
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <template v-if="!$auth.$state.loggedIn">
            <li class="nav-item">
              <nuxt-link :to="{ name: 'login' }" class="nav-link">
                Login
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{ name: 'register' }" class="nav-link">
                Register
              </nuxt-link>
            </li>
          </template>
          <template v-if="$auth.$state.loggedIn">
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logout" href="#">
                Logout
              </a>
            </li>
            <template v-if="$auth.$state.loggedIn">
              <b-nav-item-dropdown :text="$auth.user.name" right>
                <b-dropdown-item @click="$auth.logout()">Logout</b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
            <template v-else>
              <b-dropdown-item to="/login">Login</b-dropdown-item>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$auth.logout();
      }
    }
  }
</script>

<style scoped>

</style>
