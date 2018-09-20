<template>
  <main-layout>
    <div>
      <p>Home</p>
    </div>
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
