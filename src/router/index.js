import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ViewAreas from "../views/ViewAreas.vue";
import ViewCrops from "../views/ViewCrops.vue";
import ViewLocations from "../views/ViewLocations.vue";
import ViewPlaceTypes from "../views/ViewPlaceTypes.vue";
import ViewPlantingPlaces from "../views/ViewPlantingPlaces.vue";
import ViewPlantedAreas from "../views/ViewPlantedAreas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/locations",
    name: "Locations",
    component: ViewLocations,
  },
  {
    path: "/placeTypes",
    name: "PlaceTypes",
    component: ViewPlaceTypes,
  },
  {
    path: "/plantingPlaces",
    name: "PlantingPlaces",
    component: ViewPlantingPlaces,
  },
  {
    path: "/crops",
    name: "Crops",
    component: ViewCrops,
  },
  {
    path: "/plantedAreas",
    name: "PlantedAreas",
    component: ViewPlantedAreas,
  },
  {
    path: "/samplings",
    name: "Samplings",
    component: Home,
  },
  {
    path: "/areas",
    name: "Areas",
    component: ViewAreas,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
