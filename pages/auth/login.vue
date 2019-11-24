<template>
  <div class="authPage">
    <div class="authBox">
      <div class="authLeft">
        <h1>BudgetAPP</h1>
        <div class="bodyCenter">
          <h2>Bejelentkezés</h2>
          <form class="form-signin" @submit.prevent="login">
            <div class="form-group">
              <label for="inputEmail">Email</label>
              <input type="email" id="inputEmail" v-model="email" placeholder="joe@doe.hu" required />
            </div>

            <div class="form-group">
              <label for="inputPassword">Jelszó</label>
              <input
                type="password"
                id="inputPassword"
                v-model="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div class="form-group">
              <button
                class="btn btn-login"
                :disabled="email == '' || password == ''"
                type="submit"
              >Bejelentkezés</button>
            </div>
          </form>
          <div class="muted">
            Nincs fiókom
            <nuxt-link to="/auth/register">Regisztrálok</nuxt-link>
          </div>
        </div>
      </div>
      <div class="authRight">APP PROMO</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  middleware: ["auth"],
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },

  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      );
    }
  },

  methods: {
    async login() {
      this.errors = [];
      return this.$auth
        .login({
          data: {
            user: {
              email: this.email,
              password: this.password
            }
          }
        })
        .catch(e => {
          console.log(e);
          // this.$toast.error(e.response.data);
          // this.errors.push({ message: e.response.data });
        });
    }
  }
};
</script>

<style>
body {
  background-color: #edeced;
}

.authPage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2em;
}

.authBox {
  display: flex;
  flex-direction: row;
  background-color: #fffeff;
  border-radius: 2em;
}

.authBox .authLeft,
.authBox .authRight {
  padding: 1em;
  width: 50%;
}

.authBox .authLeft .bodyCenter {
  padding: 1.5em 0;
}

.authBox .authLeft .bodyCenter h2 {
  text-align: center;
  padding-bottom: 0.5em;
}

.authBox .authLeft .form-group {
  display: flex;
  flex-direction: column;
  padding: 0.5em 0;
}

.authBox .authLeft .form-group input {
  border: none;
  border-bottom: 1px solid #b3b3b3;
  padding: 0.25em 0;
}

button.btn.btn-login {
  background-color: #000;
  border: none;
  padding: 1em;
  color: #fff;
  border-radius: 0.5em;
  text-align: center;
  cursor: pointer;
}

button.btn.btn-login:disabled {
  background-color: rgb(41, 41, 41);
  cursor: not-allowed;
}

.authBox .authLeft .bodyCenter .muted {
  text-align: center;
  font-size: 0.9em;
  margin-top: 2em;
}

.authBox .authLeft .bodyCenter .muted a {
  text-decoration: none;
  font-weight: bold;
  color: #000;
}

.authBox .authRight {
  background-color: #000;
  color: #fff;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
}
</style>
