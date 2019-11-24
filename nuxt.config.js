module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - BudgetAPP",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#3351ff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/style.scss"],

  router: {
    base: process.env.DEPLOY_ENV === "GH_PAGES" ? "/budget-vue/" : "/"
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/i18n.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  auth: {
    // Options
    redirect: {
      login: "/auth/login",
      logout: "/auth/login",
      callback: "/auth/login",
      home: "/"
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
            propertyName: "token"
          },
          user: {
            url: "/api/auth/current",
            method: "get",
            propertyName: "user",
            tokenRequired: true,
            tokenType: "bearer"
          }
        },
        tokenRequired: true,
        tokenType: "bearer"
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
