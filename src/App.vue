
<script setup>
  import { onMounted, provide, ref } from 'vue';
  import Navbar from "./components/Navbar.vue";

  const countries = ref([])

  onMounted(async () => {
    const response = await fetch('https://ih-countries-api.herokuapp.com/countries');
    const data = await response.json()

    countries.value = data.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
    );
  })

  provide('countries', countries);

</script>


<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>


<style>

</style>