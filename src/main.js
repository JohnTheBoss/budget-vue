// Import Vue
import Vue from "vue";
import VueRouter from "vue-router";

// Import Vue App, routes, store
import App from "./App";
import routes from "./routes";
import i18n from "./lang/lang";
import store from "./store";

import "@/assets/css/style.scss";

Vue.use(VueRouter);

// Configure router
const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  mode: "history"
});

const DEFAULT_TITLE = "Budget App";
router.afterEach((to, from) => {
  document.title = to.name + " | " + DEFAULT_TITLE || DEFAULT_TITLE;
});

export const app = new Vue({
  el: "#app",
  store,
  i18n,
  render: h => h(App),
  router
});
