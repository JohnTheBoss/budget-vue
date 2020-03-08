<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="signInUser()">
      <div class="form-group">
        <input v-model="formData.email" type="email" class="form-control" placeholder="Email" />
      </div>

      <div class="form-group">
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
      </div>

      <div class="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
    <nuxt-link to="/auth/signup">SignUp</nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: "guest",
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
        alert("Sucessfull Login!");
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