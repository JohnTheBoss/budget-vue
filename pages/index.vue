<template>
  <div>
    <div class="navbar">Budget-App Header</div>
    <div class="container">
      <div>
        <logo />
        <h1 class="title">budget-vue</h1>
        <h2 class="subtitle">Hello, {{user.displayName}}!</h2>
        <div class="links">
          <button class="button--green" @click="writeToRealtimeDb()">Write DB</button>
          <button class="button--green" @click="getData()">READ DB</button>
          <button class="button--green" @click="logout()">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Logo from "~/components/Logo.vue";

export default {
  middleware: "auth",
  components: {
    Logo
  },
  computed: {
    user() {
      return this.$store.state.auth.authUser;
    }
  },
  methods: {
    ...mapActions({
      logoutUser: "auth/logoutUser",
      getData:"transactions/getTransactions"
    }),

    async logout() {
      try {
        await this.logoutUser().then(() => {
          this.$router.push("/auth/login");
        });
      } catch (e) {
        alert(e);
      }
    },
    async writeToRealtimeDb() {
      let key = this.$fireDb
        .ref(`transactions/${this.$store.state.auth.authUser.uid}`)
        .child(this.$store.state.auth.authUser.uid)
        .push().key;

      const messageRef = this.$fireDb.ref(
        `transactions/${this.$store.state.auth.authUser.uid}/${key}`
      );
      try {
        await messageRef.set({
          currency: "HUF",
          date: "2020-03-05 09:00",
          name: "Ásványvíz",
          value: 265
        });
      } catch (e) {
        alert(e);
        return;
      }
    }
  }
};
</script>

<style lang="scss">
$mainColor: #3351ff;

.navbar {
  background-color: $mainColor;
  color: #ffffff;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
