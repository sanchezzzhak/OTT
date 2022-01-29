<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <div class="card border-0 shadow rounded">
          <div class="card-body">
              <div class="form-floating">
                <input type="email" id="email" v-model="email" class="form-control">
                <label for="email">Email</label>
              </div>

              <div class="form-floating mt-3">
                <input type="password" id="password" v-model="password" class="form-control">
                <label for="password">Password</label>
              </div>

              <div class="d-grid gap-2 mt-3">
                <button @click.prevent="login" class="btn btn-primary btn-block">Login</button>
              </div>
          </div>
        </div>

        <div class="register mt-3 text-center">
          <p>
            <router-link :to="{name: 'Register'}">Register!</router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  name: 'login',
  methods: {
    login() {
      const {username, password} = this;
      this.$store.dispatch('login', {username, password}).then(() => {
        if (this.$store.isAuth) {
          this.$router.push('/dashboard');
        }
      });
    }
  }
}
</script>
