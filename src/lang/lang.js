import Vue from "vue";
import VueI18n from "vue-i18n";

import hu from "./hu.json";
import en from './en.json'

Vue.use(VueI18n);

const locale = "hu";

const messages = {
  hu,
  en
};

const i18n = new VueI18n({
  locale,
  messages
});

export default i18n;
