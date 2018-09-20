<template>
  <main-layout>
    <h1>Home</h1>
    <p>
      <router-link :to="{ name: 'login.index' }">Login</router-link>
    </p>
  </main-layout>
</template>

<script>
/* ============
 * Home Index Page
 * ============ */
import MainLayout from "@/layouts/Main.vue";
import { authComputed } from "@/store/helpers";

export default {
  name: "HomeIndex",

  components: { MainLayout },

  computed: {
    ...authComputed
  }
};
</script>
