<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">

        <div class="card border-0 shadow rounded bg-light bg-gradient">
          <div class="card-header">
            Sign in to OTT Dashboard
          </div>
          <div class="card-body">
            <p class="mb-6">Please enter your user information.</p>
            <div v-if="error && error.length" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ error }}
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
              {{ item }}
            </div>
            <bs-password-eye
              type="password"
              id="password"
              label="Password"
              v-model="password"
              @focus="clearErrors()"
            />
            <div v-for="item in errorPassword">
              {{ item }}
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
                <router-link :to="{name: 'Forgot'}">Forgot?</router-link>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useStore } from '../stores/main-store';

const store = useStore();

let email = '',
  password = '',
  error = '',
  errorPassword = [],
  errorEmail = [],
  errorPin = [],
  showPassword = false;


function clearErrors() {
  errorPassword = [];
  errorEmail = [];
  error = '';
}

function login() {
  clearErrors();
  const { email, password } = this;
  store.login({ email, password }).then((data) => {
    if (this.store.isAuth) {
      this.$router.push('/dashboard');
    }
  }).catch((response) => {
    error = response.err;
    response.errors && response.errors.forEach((error) => {
      let { message, field } = error;
      field === 'email' && errorEmail.push(message);
      field === 'password' && errorPassword.push(message);
    });
  });
}
</script>
