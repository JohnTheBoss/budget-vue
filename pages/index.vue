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

<style lang="scss">
$mainColor: #3351ff;

body.main-app {
  background-color: #f6f7fc;
}

.navbar {
  background-color: $mainColor;
  color: #ffffff;
}

.box {
  border-radius: 0.5em;
  margin-top: 1em;
  color: #fff;
  padding: 0.5em 1em;
  box-shadow: 0 0 4px 1px #707488;

  &.budgetinfo-box {
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
    .box-header,
    .box-footer {
      font-weight: 200;
    }
    .box-body {
      font-size: 1.5em;
      font-weight: 600;
    }
  }

  &.budgetList-box {
    box-shadow: none;
    background-color: #fff;
    color: #000;

    .box-header {
      color: #696767;
      font-weight: 600;

      &.two-col {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .box-body {
      margin: 1em 0;
    }

    .box-body .item {
      display: flex;
      justify-content: space-between;
      margin: 0.5em 0;

      &:last-child {
        margin-bottom: 0;
      }

      .metadata {
        display: flex;
        flex-grow: 1;
        flex-direction: row;

        .category-icon {
          align-self: center;
          background-color: aqua;
          border-radius: 50%;
          width: 3em;
          height: 3em;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.5em;
          color: #fff;
        }

        .multiLine {
          flex-grow: 1;

          .category-name {
            font-weight: 600;
          }

          .description {
            font-weight: 200;
            color: #696767;
            font-size: 0.9em;
          }
        }
      }
      .price {
        font-weight: 600;
      }
    }
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
