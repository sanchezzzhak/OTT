<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">

        <div class="card border-0 shadow rounded">
          <div class="card-header">
            Sign up to OTT Dashboard
          </div>
          <div class="card-body">
            <p class="mb-6">Please enter your user information.</p>
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
            <bs-password-eye
              type="password"
              id="password"
              label="Password"
              v-model="password"
              @focus="clearErrors()"
            />
            <div v-for="item in errorPassword">
              {{item}}
            </div>
            <bs-password-eye
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
            <div class="d-md-flex justify-content-between mt-4">
              <div class="mb-2 mb-md-0">
                <router-link :to="{name: 'SingIn'}" class="fs-6">Already member? Login </router-link>
              </div>
              <div>
                <router-link :to="{name: 'Forgot'}" class="text-inherit fs-6">Forgot your password?</router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import {useStore} from '../stores/main-store';

  export default {
    data() {
      let store = useStore();
      return {
        store,
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
        this.store.singup({email, password, passwordConfirm, secretKey}).then((data) => {
          if (this.store.status === 'singup_success' && !this.store.isAuth) {
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