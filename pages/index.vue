<template>
  <div>
    <div class="navbar">
      Budget-App | Hello, <nuxt-link to="/profile">{{user.displayName}}</nuxt-link>!
      <a
        href="javascript:void(0);"
        class="text-white"
        @click="logout()"
      >Logout</a>
    </div>
    <div class="app-content">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="box budgetinfo-box expense-box">
              <div class="box-header">Spent</div>
              <div class="box-body">-$230.00</div>
              <div class="box-footer">Expense this month</div>
            </div>
          </div>
          <div class="col-6">
            <div class="box budgetinfo-box income-box">
              <div class="box-header">Earned</div>
              <div class="box-body">+$983.00</div>
              <div class="box-footer">Incomes this month</div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="box budgetList-box">
              <div class="box-header two-col">
                <div class="left">Today</div>
                <div class="right">-$3600</div>
              </div>
              <div class="box-body">
                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="box budgetList-box">
              <div class="box-header two-col">
                <div class="left">Yesterday</div>
                <div class="right">-$3600</div>
              </div>
              <div class="box-body">
                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>
              </div>
            </div>
          </div>


           <div class="col-12">
            <div class="box budgetList-box">
              <div class="box-header two-col">
                <div class="left">05. Marc</div>
                <div class="right">-$3600</div>
              </div>
              <div class="box-body">
                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>

                <div class="item">
                  <div class="metadata">
                    <div class="category-icon">
                      <fa :icon="['fas', 'shopping-cart']" />
                    </div>
                    <div class="multiLine">
                      <div class="category-name">Shopping</div>
                      <div class="description">New Notebook</div>
                    </div>
                  </div>
                  <div class="price">-$1200</div>
                </div>
              </div>
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

<style lang="scss" scoped>
$mainColor: #3351ff;

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
