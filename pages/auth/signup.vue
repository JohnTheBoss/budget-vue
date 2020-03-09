<template>
  <div class="text-center">
    <form class="form-signin" @submit.prevent="createUser()">
      <img class="mb-4" src="~assets/logo.png" alt="Logo" width="72" height="72" />
      <h1 class="h3 mb-3 font-weight-normal">SignUp</h1>

      <label for="inputName" class="sr-only">Name</label>
      <input
        type="text"
        id="inputName"
        class="form-control mb-2"
        placeholder="Name"
        v-model="formData.name"
        required
        autofocus
      />

      <label for="inputEmail" class="sr-only">Email</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control mb-2"
        placeholder="Email"
        v-model="formData.email"
        required
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control mb-2"
        placeholder="Password"
        v-model="formData.password"
        required
      />

      <label for="inputPasswordAgain" class="sr-only">Password Again</label>
      <input
        type="password"
        id="inputPasswordAgain"
        class="form-control"
        placeholder="Password Again"
        v-model="formData.passwordAgain"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">SignUp</button>
      <p class="mt-5 mb-3 text-muted">
        Already have an account?
        <nuxt-link to="/auth/login">Sign In</nuxt-link>
      </p>
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
      name: "",
      password: "",
      passwordAgain: ""
    }
  }),
  methods: {
    async createUser() {
      try {
        await this.$fireAuth
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then(
            function(result) {
              return result.user.updateProfile({
                displayName: this.formData.name
              });
            }.bind(this)
          )
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