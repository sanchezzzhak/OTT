<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card border-0 shadow rounded">
          <div class="card-body">
            <div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" class="form-control">
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control">
              </div>

              <div class="form-group">
                <button @click.prevent="login" class="btn btn-primary btn-block">Login</button>
              </div>

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
import {auth_login} from "../../autions";

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  name: 'login',
  methods: {
    login: function () {
      const {username, password} = this;
      this.$store.dispatch(auth_login, {username, password}).then(() => {
        this.$router.push('/');
      });
    }
  }
}
</script>
