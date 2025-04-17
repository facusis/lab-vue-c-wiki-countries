
// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "countries",
    component: () => import("../components/CountriesList.vue"),
    children: [
      {
        path: "/list/:alpha3Code",
        name: "country-details",
        component: () => import("../components/CountryDetails.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;