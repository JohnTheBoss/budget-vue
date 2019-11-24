<template>
  <div class="authPage">
    <div class="authBox">
      <div class="authHeader">
        <h1>Bejelentkezés - BudgetAPP</h1>
      </div>
      <div class="authBody">
        <form @submit.prevent="loginOrRegister">
          <input type="email" v-model="email" placeholder="Your email address" />
          <input type="password" v-model="password" placeholder="Your password" />

          <input
            v-if="!isLogin"
            type="password"
            v-model="registrationPassword"
            placeholder="Re-enter Password"
          />

          <button v-text="isLogin ? 'Belépés' : 'Regisztáció'" />
        </form>
      </div>
      <div class="authFooter">
        <button
          v-text="!isLogin ? 'Van már fiókom!' : 'Még nincs fiókom!'"
          @click="isLogin=!isLogin"
        />
      </div>
    </div>

    <!--    <div>
      <div>
        <form @submit.prevent="forgetPWD">
          forget passwd:
          <input type="email" v-model="email" />
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>-->
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "Login",
  asyncData() {
    return {
      authenticatedUser: null,
      email: "",
      password: "",
      registrationPassword: "",
      isLogin: true
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password
        })
        .catch(error => {
          console.error(error);
        });
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
    forgetPWD() {
      firebase.auth().sendPasswordResetEmail(this.email);
    },
    async register() {
      if (this.password === this.registrationPassword) {
        this.$store
          .dispatch("auth/signUp", {
            email: this.email,
            password: this.password
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error("PASS !== PASS2");
      }
    },
    loginOrRegister() {
      if (this.isLogin) {
        this.register();
      } else {
        this.login();
      }
    }
  }
};
</script>

<style>
.authPage {
  display: flex;
  flex-direction: row;
  height: 100vh;
  margin: 0 2em;
}

.authBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: chartreuse;
}

.authBody input {
  width: 100%;
  padding: 0.5em;
  margin: 0.25em 0;
}
</style>