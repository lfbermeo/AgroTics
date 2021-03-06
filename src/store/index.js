import Vue from "vue";
import Vuex from "vuex";

import cropsStore from "./crops.store";
import locationsStore from "./locations.store";
import placeTypesStore from "./placeTypes.store";
import plantingPlacesStore from "./plantingPlaces.store";
import newSamplingStore from "./newSampling.store";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    API_URI: "https://agrotics-api.herokuapp.com/api/v1.0/",
    API_URI_TEST: "http://localhost:8080/api/v1.0/",
  },
  mutations: {},
  actions: {},
  modules: {
    crops: cropsStore,
    locations: locationsStore,
    placeTypes: placeTypesStore,
    plantingPlaces: plantingPlacesStore,
    newSampling: newSamplingStore,
  },
  getters: {},
});
