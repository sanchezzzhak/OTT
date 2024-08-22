<script setup>
import AuthContent from './mixins/AuthContent.vue';
import { useStore } from '../stores/main-store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

let email = '';
let password = '';
let error = '';
let errorPassword = [];
let errorEmail = [];
let errorPin = [];
let showPassword = false;

function clearErrors() {
  errorPassword = [];
  errorEmail = [];
  error = '';
}

function login() {
  clearErrors();
  store.login({ email, password }).then((data) => {
    if (store.isAuth) {
      router.push('/dashboard');
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

<template>
  <AuthContent>
    <div class="card border-0 shadow rounded">
      <div class="card-header">
        {{$t('Auth.sign_in_title')}}
      </div>
      <div class="card-body">
        <p class="mb-6">{{$t('Auth.header')}}</p>
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
          <button @click.prevent="login" class="btn btn-primary btn-block">{{ $t('sign_in') }}</button>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <p class="text-center">
            <router-link :to="{name: 'SingUp'}">{{ $t('sign_up') }}</router-link>
          </p>
        </div>
        <div class="col-6">
          <p class="text-center">
            <router-link :to="{name: 'Forgot'}">{{ $t('forgot') }}?</router-link>
          </p>
        </div>
      </div>

    </div>
  </AuthContent>
</template>