<template>
  <div>
    <h1>SignUP</h1>
    <form @submit.prevent="createUser()">
      <div class="form-group">
        <input v-model="formData.name" type="text" class="form-control" placeholder="Name" />
      </div>

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
        <input
          v-model="formData.passwordAgain"
          type="password"
          class="form-control"
          placeholder="Password Again"
        />
      </div>

      <div class="form-group">
        <button type="submit">SignUp</button>
      </div>
    </form>
    <nuxt-link to="/auth/login">Login</nuxt-link>
  </div>
</template>

<script>
export default {
  data: () => ({
    formData: {
      email: "",
      name: "",
      password: "",
      passwordAgain: ""
    }
  }),
  methods: {
    async createUser() {
      try {
        await this.$fireAuth
          .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
          .then(function(result) {
            return result.user.updateProfile({
              displayName: this.formData.name
            });
          }.bind(this))
          .catch(function(error) {
            console.log(error);
          });
      } catch (e) {
        alert(e);
      }
    }
  }
};
</script>

<style>
</style>