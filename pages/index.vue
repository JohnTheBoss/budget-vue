<template>
  <div>
    <div class="navbar">
      Budget-App | Hello, {{user.displayName}}!
      <a
        href="javascript:void();"
        class="text-white"
        @click="logout()"
      >Logout</a>
    </div>
    <div class="app-content">
      <div class="container">
        <div class="row">
          <div class="col-6 text-center">
            <div class="budgetinfo-box expense-box">
              <small>Expense:</small>
              <h1>0</h1>
            </div>
          </div>
          <div class="col-6 text-center">
            <div class="budgetinfo-box income-box">
              <small>Income</small>
              <h1>0</h1>
            </div>
          </div>
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
      getData: "transactions/getTransactions"
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

.budgetinfo-box{
  border-radius: 1em;
  margin-top: 1em;
  color: #fff;
  padding: .5em .25em;
  &.expense-box{
    background-color: #f5787e;
  }
  &.income-box{
    background-color: #03a9f4;
  }
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
