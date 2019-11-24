const dotEnv = require("dotenv");
dotEnv.config();

const checkEnv = require("check-env");
checkEnv(["FB_API_KEY", "FB_AUTH_DOMAIN", "FB_DB_URL", "FB_PROJECT_ID", "FB_STORAGE_BUCKET", "FB_MESSAGING_SENDER_ID", "FB_APP_ID"]);

export default {
  mode: 'spa',

  env: {
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_DB_URL: process.env.FB_DB_URL,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID
  },


  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - BudgetAPP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3351ff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/style.scss'
  ],

  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/budget-vue/' : "/"
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/firebase.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
