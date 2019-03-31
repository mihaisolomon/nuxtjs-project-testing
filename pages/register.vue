<template>
  <div class="container top">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">

            <b-alert v-if="error" show variant="danger">
              <ul>
                <template v-for="err in error">
                  <li>{{ err[0] }}</li>
                </template>
              </ul>
            </b-alert>

            <form @submit.prevent="registerUser">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input type="text" class="form-control" v-model="userForm.name" required autofocus>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input type="email" class="form-control" v-model="userForm.email" required>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <label for="phone_number" class="col-md-4 col-form-label text-md-right">Phone number</label>

                <div class="col-md-6">
                  <input type="text" class="form-control" v-model="userForm.phone_number" required>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                <div class="col-md-6">
                  <input type="password" class="form-control" v-model="userForm.password" required>
                  <span class="invalid-feedback" role="alert">
                    <strong></strong>
                  </span>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Register
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

    // middleware: ['auth'],

    data() {
      return {
        error: null,
        userForm: {
          name: '',
          email: '',
          password: '',
          phone_number: ''
        }
      }
    },
    methods: {
      async registerUser() {
        await this.$axios.post('register', this.userForm)
          .then((response) => {
            this.$auth.login({
              data: {
                email: this.userForm.email,
                name: this.userForm.name,
                phone_number: this.userForm.phone_number,
                password: this.userForm.password
              }
            }).catch(e => {
              this.error = e + ''
            });
            this.$router.push({
              path: '/'
            });
          })
          .catch(e => {
            this.error = e.response.data;
          });
      }
    }
  }
</script>

<style>
  .top {
    margin-top: 80px;
  }
</style>
