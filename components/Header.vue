<template>
  <div class="header">
    <div class="top">
      <div class="left">
        <div class="locale-changer">
          <select v-model="$i18n.locale" @change="changeLang()">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
          </select>
        </div>
      </div>
      <div class="center">BUDGET-APP</div>
      <div class="right">
        <button type="submit" @click="$store.dispatch('auth/logout')">LogOut</button>
      </div>
    </div>

    <div class="headerBox">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      langs: Object.keys(this.$i18n.messages)
    };
  },
  methods: {
    changeLang: function() {
        this.$store.commit("language/SET_LANG", this.$i18n.locale);
    }
  }
};
</script>

<style>
</style>