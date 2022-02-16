<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <div class="card border-0 shadow rounded bg-light bg-gradient">
          <div class="card-header">
            Sign in to OTT Dashboard
          </div>
          <div class="card-body">
            <div v-if="error.length > 0" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{error}}
              <button type="button" @click="clearErrors()" class="btn-close"></button>
            </div>
            <bs-input
              type="email"
              id="email"
              label="Email"
              v-model="email"
              @focus="clearErrors()"
            />
            <div v-for="item in errorEmail">
              {{item}}
            </div>
            <bs-input
              type="password"
              id="password"
              label="Password"
              v-model="password"
              @focus="clearErrors()"
            />
            <div v-for="item in errorPassword">
              {{item}}
            </div>
            <div class="d-grid gap-2 mt-3">
              <button @click.prevent="login" class="btn btn-primary btn-block">Sign in</button>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <p class="text-center">
                <router-link :to="{name: 'SingUp'}">Sing up</router-link>
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
        password: '',
        error: '',
        errorPassword: [],
        errorEmail: [],
        errorPin: [],
      };
    },
    name: 'login',
    methods: {
      clearErrors() {
        this.errorPassword = [];
        this.errorEmail = [];
        this.error = '';
      },
      login() {
        this.clearErrors();
        const {email, password} = this;
        this.$store.dispatch('login', {email, password}).then((data) => {
          if (this.$store.isAuth) {
            this.$router.push('/dashboard');
          }
        }).catch((response) => {
          this.error = response.err;
          response.errors && response.errors.forEach((error) => {
            let {message, field} = error;
            field === 'email' && this.errorEmail.push(message);
            field === 'password' && this.errorPassword.push(message);
          });
        });
      },
    },
  };
</script>
