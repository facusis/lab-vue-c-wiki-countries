
  <script setup>

  import { inject } from 'vue';

  const countries = inject('countries');

  </script>

  <template>
    <div class="page-layout">
      <aside class="countries-list">
        <ul>
          <li v-for="country in countries" :key="country.alpha3Code"><!-- lista de países -->
            <router-link :to="`/list/${country.alpha3Code}`">
              {{ country.name.common }}
            </router-link>
          </li>
        </ul>

      </aside>

      <main>
        <router-view /> <!-- Acá se carga CountryDetails.vue -->
      </main>

    </div>
  </template>


  <style scoped>
    .page-layout {
      display: flex;

    }
  </style>

