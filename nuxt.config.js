require("dotenv").config();

const isProd = function() {
  return process.env.NODE_ENV === "production";
};

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "Budget-App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "An app to keep track of your finances."
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
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
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
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Docs: https://firebase.nuxtjs.org/guide
    "@nuxtjs/firebase",
    [
      "nuxt-fontawesome",
      {
        component: "fa",
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"]
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: ["fab"]
          },
          {
            set: "@fortawesome/free-regular-svg-icons",
            icons: ["far"]
          }
        ]
      }
    ]
  ],

  pwa: {
    manifest: {
      charset: "UTF-8",
      lang: 'en',
      name: "BudgetApp",
      short_name: "BudgetApp - Track your finances",
      description: "An app to keep track of your finances.",
      display: 'standalone',
      theme_color: '#3351ff'
    },
    workbox: {
      dev: !isProd()
    }
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  firebase: {
    config: {
      apiKey: process.env.FireBase_apiKey,
      authDomain: process.env.FireBase_authDomain,
      databaseURL: process.env.FireBase_databaseURL,
      projectId: process.env.FireBase_projectId,
      storageBucket: process.env.FireBase_storageBucket,
      messagingSenderId: process.env.FireBase_messagingSenderId,
      appId: process.env.FireBase_appId,
      measurementId: process.env.FireBase_measurementId
    },
    services: {
      auth: {
        initialize: {
          onSuccessAction: "auth/handleSuccessfulAuthentication",
          ssr: false
        }
      },
      realtimeDb: true,
      storage: true,
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
