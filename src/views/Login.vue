<template>
  <div class="login-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Log in</h4>
    </header>
    <main class="form-group">
      <input type="text" v-model="email" placeholder="Email" :class="(emailError) ? 'err' : ''" />
      <input type="password" v-model="password" placeholder="Password" :class="(passwordError) ? 'err' : ''" />
      <button class="login-btn" @click="login">Log in</button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
    </main>
    <footer>
      <p>
        Don't have an account?
        <router-link class="link" to="/register">Sign up</router-link>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      hasErrors: false,
      emailError: false,
      passwordError: false,
      error: ''
    }
  },
  methods: {
    login() {
      let api_url = this.$store.state.api_url;

      if (this.email == '' || this.password == '') return alert('Please fill in all fields')
      this.$http.post(api_url + 'user/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        if (response.data.auth) {
          localStorage.setItem('jwt', response.data.token)
          this.$router.push('/')
        } else {
          if (response.data.mailError) {
            this.emailError = true
          } else {
            this.emailError = false
          }
          if (response.data.passError) {
            this.passwordError = true
          } else {
            this.passwordError = false
          }
            this.error = response.data.msg
            this.hasErrors = true
        }
      }).catch(err => {
        console.log('Error:', err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  box-sizing: border-box;

  header {
    padding: 15px 25px;

    h3 {
      color: #000;
      font-size: 28px;
      text-align: center;
      font-weight: 700;
      margin: 0;
      span {
        font-weight: 300;
      }
    }

    h4 {
      color: #888;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      margin: 0;
    }
  }

  footer {
    width: calc(100% - 50px);
    height: 20px;
    background-color: #EEE;
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.2);
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #888;
      font-size: 16px;
      line-height: 40px;
      margin: 0;
      padding: 0;
      text-align: center;

      .link {
        color: #333;
        text-decoration: none;
        font-weight: 700;
      }
    }
  }
}
</style>
