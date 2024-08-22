<script setup>
import { useStore } from '../stores/main-store';
import AuthContent from './mixins/AuthContent.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

let email = '',
  password= '',
  secretKey= '',
  passwordConfirm= '',
  error= '',
  errorPassword= [],
  errorPasswordConfirm= [],
  errorSecretKey= [],
  errorEmail= [];

function clearErrors() {
  errorPassword = [];
  errorPasswordConfirm = [];
  errorSecretKey = [];
  errorEmail = [];
  error = '';
}

function singup() {
  clearErrors();
  store.singup({ email, password, passwordConfirm, secretKey }).then((data) => {
    if (store.status === 'singup_success' && !store.isAuth()) {
      router.push('/sing-in');
    }
  }).catch((response) => {
    console.log('catch', response);
    error = response.err;
    response.errors && response.errors.forEach((error) => {
      let { message, field } = error;
      field === 'email' && errorEmail.push(message);
      field === 'password' && errorPassword.push(message);
      field === 'secretKey' && errorSecretKey.push(message);
      field === 'passwordConfirm' && errorPasswordConfirm.push(message);
    });
  });
}

</script>

<template>
  <AuthContent>
    <div class="card border-0 shadow rounded">
      <div class="card-header">
        Sign up to OTT Dashboard
      </div>
      <div class="card-body">
        <p class="mb-6">Please enter your user information.</p>
        <div v-if="error.length > 0" class="alert alert-danger alert-dismissible fade show" role="alert">
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
        <bs-input
          type="text"
          id="secretKey"
          label="Secret Key"
          v-model="secretKey"
          @focus="clearErrors()"
        />
        <div v-for="item in errorSecretKey">
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
        <bs-password-eye
          type="password"
          id="password-confirm"
          label="Password Confirm"
          v-model="passwordConfirm"
          @focus="clearErrors()"
        />
        <div v-for="item in errorPasswordConfirm">
          {{ item }}
        </div>
        <div class="d-grid gap-2 mt-3">
          <button @click.prevent="singup" class="btn btn-primary btn-block">Sing up</button>
        </div>
        <div class="d-md-flex justify-content-between mt-4">
          <div class="mb-2 mb-md-0">
            <router-link :to="{name: 'SingIn'}" class="">Already member? Login</router-link>
          </div>
          <div>
            <router-link :to="{name: 'Forgot'}" class="text-inherit">Forgot your password?</router-link>
          </div>
        </div>
      </div>

    </div>
  </AuthContent>

</template>