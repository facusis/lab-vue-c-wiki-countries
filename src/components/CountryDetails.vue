
<script setup>
  import { useRoute } from 'vue-router';
  import { computed, inject, onMounted, ref, watch } from 'vue';

  const route = useRoute();
  const alpha3Code = ref(route.params.alpha3Code)

  const country = ref(null)
  const countries = inject('countries');


  async function fetchCountry() {
    const response = await fetch(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code.value}`);
    const data = await response.json()
    country.value = data
    
  }

  onMounted(() => {
    fetchCountry();
  });

  watch(
    () => route.params.alpha3Code, 
    newCode => {
      alpha3Code.value = newCode
      fetchCountry()
    } 
  )

  const borderNames = computed(() => {
    if (!country.value || !country.value.borders) return [];

    // ?? — Operador de fusión nula (nullish coalescing operator)
    // Devuelve el valor de la izquierda (country.value.borders) si no es null ni undefined.
    // Si sí es null o undefined, entonces devuelve lo de la derecha ([]).
    // return country.value.borders ?? [];

    return country.value.borders.map(code => {
      const borderCountry = countries.value.find(c => c.alpha3Code === code);
      return borderCountry ? borderCountry.name.common : code;
    });
  });


  const flagUrl = computed(() => {
    return country.value ? `https://flagpedia.net/data/flags/icon/72x54/${country.value.alpha2Code.toLowerCase()}.png`: ''

  }
)

</script>

<template>
  <div v-if="country">
    <h2>Detalle del pais</h2>
    <p>Codigo desde la URL: {{ alpha3Code }} </p>

    <img  :src="flagUrl" :alt="country.name.common + ' flag'" />

    <p v-if="country">Nombre común: {{ country.name.official }} </p>
    <p v-else>Cargando país...</p>

    <p v-if="country.capital?.length"> Capital: {{country.capital.join(', ') }} </p>
    <p v-else>Pais sin capital definida.</p>

    <p>Area: {{ country.area }} km2</p>

    <p v-if="borderNames.length">Fronteras con: {{ borderNames.join(', ') }}</p>
    <p v-else>No tiene fronteras definidas.</p>

  </div>
</template>


<style scoped>

</style>

