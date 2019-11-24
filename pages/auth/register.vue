<template>
  <div class="authPage">
    <div class="authBox">
      <div class="authLeft">
        <h1>BudgetAPP</h1>
        <div class="bodyCenter">
          <h2>Regisztráció</h2>
          <form class="form-signin" @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="inputFullname">Név</label>
              <input
                type="text"
                id="inputFullname"
                v-model.trim="user.name"
                class="form-control"
                placeholder="Név"
                required
              />
            </div>
            <div class="form-group">
              <label for="inputEmail">Email</label>
              <input
                type="email"
                id="inputEmail"
                v-model.trim="user.email"
                placeholder="joe@doe.hu"
                required
              />
            </div>

            <div class="form-group">
              <label for="inputPassword">Jelszó</label>
              <input
                type="password"
                id="inputPassword"
                v-model.trim="user.password"
                placeholder="••••••••"
                required
              />
            </div>

            <div class="form-group">
              <label for="inputPasswordAgain">Jelszó újra</label>
              <input
                type="password"
                id="inputPasswordAgain"
                v-model.trim="user.passwordAgain"
                placeholder="••••••••"
                required
              />
            </div>

            <div class="form-group">
              <button
                class="btn btn-login"
                :disabled="user.email == '' || user.fullName == '' || user.password == '' || user.passwordAgain == '' || user.password != user.passwordAgain"
                type="submit"
              >Regisztráció</button>
            </div>
          </form>
          <div class="muted">
            Van fiókom,
            <nuxt-link to="/auth/login">bejelentkezek</nuxt-link>
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
  data() {
    return {
      login: false,
      user: {
        email: "",
        name: "",
        password: "",
        passwordAgain: ""
      },
      errors: []
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post(`/api/auth/register/`, { user: this.user })
        .then(response => {
          this.login = response.data.success.login;
        })
        .catch(data => {
          if (data.response) {
            this.errors.push({ message: data.response.data.errors.msg });
          } else {
            this.errors.push({
              message: "Ismeretlen eredetü hiba történt, próbáld meg később!"
            });
          }
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