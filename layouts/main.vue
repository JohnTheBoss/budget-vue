<template>
  <div>
    <nuxt />
    <div class="bottomMenu">
      <nuxt-link to="/" class="menu-item">Home</nuxt-link>
      <nuxt-link to="/transactions" class="menu-item">Tranzakciók</nuxt-link>
      <nuxt-link to="/profile" class="menu-item">Profile</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"]
};
</script>

<style lang="scss">
    body {
        overflow: hidden;
    }
</style>

