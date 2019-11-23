export const state = () => ({
    locales: ['en', 'hu'],
    locale: 'hu'
  })
  
  export const mutations = {
    SET_LANG (state, locale) {
      if (state.locales.includes(locale)) {
        state.locale = locale
      }
    }
  }
  