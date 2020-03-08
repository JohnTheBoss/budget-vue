<template></template>

<script>
export default {
  middleware: "guest",
  created() {
    this.$router.push("/auth/login");
  }
};
</script>

<style>
</style>