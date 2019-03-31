<template>
  <div class="container top">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">

            <b-alert show v-if="$auth.$state.redirect">
              You have to login before accessing to <strong>{{ $auth.$state.redirect }}</strong>
            </b-alert>

            <b-alert v-if="error" show variant="danger">
              <ul>
                <template v-for="err in error">
                  <li>{{ err }}</li>
                </template>
              </ul>
            </b-alert>

            <form @submit.prevent="loginUser">
              <div class="form-group row">
                <label for="email" class="col-sm-4 col-form-label text-md-right">Email</label>
                <div class="col-md-6">
                  <input type="email" v-model="userForm.email" class="form-control" required autofocus>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                <div class="col-md-6">
                  <input type="password" v-model="userForm.password" class="form-control" name="password" required>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    middleware: ['auth'],

    data() {
      return {
        error: null,
        userForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async loginUser() {
        await this.$auth.login({
          data: this.userForm
        }).then((response) => {

          this.$router.push({
            path: '/'
          });

        }).catch(e => {
          this.error = e.response.data;
        });
      }
    },
    computed: {
      redirect() {
        return (
          this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect)
        )
      },
      isCallback() {
        return Boolean(this.$route.query.callback)
      }
    },
  }
</script>

<style>
  .top {
    margin-top: 80px;
  }
</style>
