<template>
  <div class="container top">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <logo></logo>
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
    }
  }
</script>

