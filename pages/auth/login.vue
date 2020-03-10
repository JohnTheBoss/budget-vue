<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent="signInUser()">
      <img class="mb-4" src="~assets/logo.png" alt="Logo" width="72" height="72" />
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-2"
        placeholder="Email"
        v-model="formData.email"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
         v-model="formData.password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      <p class="mt-5 mb-3 text-muted">New user? <nuxt-link to="/auth/signup">SignUp</nuxt-link> to create your account.</p>
      <p class="mt-2 mb-3 text-muted">&copy; 2020 BudgetApp</p>
    </form>
  </div>
</template>

<script>
export default {
  middleware: "guest",
  head() {
    return {
      bodyAttrs: {
        class: "auth-page"
      }
    };
  },
  data: () => ({
    formData: {
      email: "",
      password: ""
    }
  }),
  methods: {
    async signInUser() {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        this.$router.push("/");
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style>

</style>