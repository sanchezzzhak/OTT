<template>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">

        <div class="card border-0 shadow rounded">
          <div class="card-header">
            Sign up to OTT Dashboard
          </div>
          <div class="card-body">
            <bs-input
                type="email"
                id="email"
                label="Email"
                v-model="email"
                @focus="clearErrors()"
            />
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
              <button @click.prevent="register" class="btn btn-primary btn-block">Sing up</button>
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
    }
  },
  name: 'SingUp',
  methods: {
    clearErrors() {
      this.errorPassword = [];
      this.errorPasswordConfrim = [];
      this.errorSecretKey = [];
      this.errorEmail = [];
      this.error = '';
    },
    login() {
      this.clearErrors();
      const {email, password, passwordConfirm} = this;
      this.$store
      .dispatch('register', {email, password, passwordConfirm})
      .then((data) => {

      }).catch((response) => {
        this.error = response.err;
        response.errors && response.errors.forEach((error) => {
          let {message, field} = error;
          field === 'email' && this.errorEmail.push(message)
          field === 'password' && this.errorPassword.push(message)
          field === 'errorSecretKey' && this.errorSecretKey.push(message)
          field === 'passwordConfirm' && this.errorPasswordConfrim.push(message)
        })
      });
    }
  }
}
</script>