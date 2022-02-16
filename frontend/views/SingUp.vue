<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <div class="card border-0 shadow rounded">
          <div class="card-header">
            Sign up to OTT Dashboard
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
              type="text"
              id="secretKey"
              label="Secret Key"
              v-model="secretKey"
              @focus="clearErrors()"
            />
            <div v-for="item in errorSecretKey">
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
            <bs-input
              type="password"
              id="password-confirm"
              label="Password Confirm"
              v-model="passwordConfirm"
              @focus="clearErrors()"
            />
            <div v-for="item in errorPasswordConfirm">
              {{item}}
            </div>
            <div class="d-grid gap-2 mt-3">
              <button @click.prevent="singup" class="btn btn-primary btn-block">Sing up</button>
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
        secretKey: '',
        passwordConfirm: '',
        error: '',
        errorPassword: [],
        errorPasswordConfirm: [],
        errorSecretKey: [],
        errorEmail: [],
      };
    },
    name: 'register',
    methods: {
      clearErrors() {
        this.errorPassword = [];
        this.errorPasswordConfirm = [];
        this.errorSecretKey = [];
        this.errorEmail = [];
        this.error = '';
      },
      singup() {
        this.clearErrors();
        const {email, password, passwordConfirm, secretKey} = this;
        this.$store.dispatch('singup', {email, password, passwordConfirm, secretKey}).then((data) => {
          if (data.status && !this.$store.isAuth) {
            this.$router.push('/sing-in');
          }
        }).catch((response) => {

          console.log('catch', response);

          this.error = response.err;
          response.errors && response.errors.forEach((error) => {
            let {message, field} = error;
            field === 'email' && this.errorEmail.push(message);
            field === 'password' && this.errorPassword.push(message);
            field === 'secretKey' && this.errorSecretKey.push(message);
            field === 'passwordConfirm' && this.errorPasswordConfirm.push(message);
          });
        });
      },
    },
  };
</script>