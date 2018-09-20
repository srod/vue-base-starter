<template>
  <div class="main-layout">
    <nav-bar />
    <slot/>
  </div>
</template>

<script>
/* ============
 * Main Layout
 * ============ */
import NavBar from "@/components/NavBar";

export default {
  name: "MainLayout",

  components: { NavBar }
};
</script>
