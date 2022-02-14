<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <div class="card border-0 shadow rounded">

          <div class="card-body">
              <bs-input
                  type="email"
                  id="email"
                  label="Email"
                  v-model="email"
              />
              <bs-input
                  type="password"
                  id="password"
                  label="Password"
                  v-model="password"
              />

            <div class="d-grid gap-2 mt-3">
              <button @click.prevent="login" class="btn btn-primary btn-block">Login</button>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <p class="text-center">
                <router-link :to="{name: 'Register'}">Register</router-link>
              </p>
            </div>
            <div class="col-6">
              <p class="text-center">
                <router-link :to="{name: 'Remind'}">Remind</router-link>
              </p>
            </div>
          </div>

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
      const {email, password} = this;
      this.$store
      .dispatch('login', {email, password})
      .then((data) => {
        if (this.$store.isAuth) {
          this.$router.push('/dashboard');
        }
      }).catch((response) => {
      });
    }
  }
}
</script>
