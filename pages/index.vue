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
          <div class="col-6">
            <div class="budgetinfo-box expense-box">
              <div class="box-header">Spent</div>
              <div class="box-body">-$230.00</div>
              <div class="box-footer">Expense this month</div>
            </div>
          </div>
          <div class="col-6">
            <div class="budgetinfo-box income-box">
              <div class="box-header">Earned</div>
              <div class="box-body">+$983.00</div>
              <div class="box-footer">Incomes this month</div>
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
  head() {
    return {
      bodyAttrs: {
        class: "main-app"
      }
    };
  },
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

body.main-app {
  background-color: #f6f7fc;
}

.navbar {
  background-color: $mainColor;
  color: #ffffff;
}

.budgetinfo-box {
  border-radius: 0.5em;
  margin-top: 1em;
  color: #fff;
  padding: 0.5em 1em;
  box-shadow: 0 0 4px 1px #707488;
  &.expense-box {
    background: rgb(237, 96, 149);
    background: linear-gradient(
      62deg,
      rgba(237, 96, 149, 1) 55%,
      rgba(247, 158, 176, 1) 100%
    );
  }
  &.income-box {
    background: rgb(48, 202, 148);
    background: linear-gradient(
      62deg,
      rgba(48, 202, 148, 1) 20%,
      rgba(110, 234, 146, 1) 100%
    );
  }
  .box-header, .box-footer{
    font-weight: 200;
  }
  .box-body {
    font-size: 1.5em;
    font-weight: 600;
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
