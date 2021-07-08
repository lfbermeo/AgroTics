import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_SAMPLINGS: "samplings",
    complete: false,
    completeSamples: false,
    numOfPlantedCrops: 0,
    samplingData: {
      samplingDate: "",
      observations: "",
      plantedAreaId: -1,
    },
    soilData: {
      ph: -1,
      mo: -1,
      nitrogen: -1,
      phosfor: -1,
      potasium: -1,
      others: "",
    },
    weatherData: {
      temperature: false,
      humidity: -1,
      irrigation: -1,
    },
    plagueData: {
      plagueProduct: "",
      amount: "",
      applicationDate: "",
    },
    samples: [],
    plantedArea: {},
  }),
  mutations: {
    SET_NEW_SAMPLESO(state, locations) {
      state.locations = locations;
    },
    SET_POPULATE_SAMPLES(state) {
      let samples = [];

      for (let i = 0; i < state.numOfPlantedCrops; i++) {
        samples[i] = {};
      }

      state.samples = samples;
    },
    SET_COMPLETE(state, value) {
      state.complete = value;
    },
    SET_COMPLETE_SAMPLES(state, value) {
      state.completeSamples = value;
    },
    SET_SOIL_DATA(state, soilData) {
      state.soilData = soilData;
    },
    SET_WEATHER_DATA(state, weatherData) {
      state.weatherData = weatherData;
    },
    SET_PLAGUE_DATA(state, plagueData) {
      state.plagueData = plagueData;
    },
    SET_PLANTED_AREA(state, plantedAreaData) {
      state.plantedArea = { ...plantedAreaData };
    },
  },
  actions: {
    async loadPlantedArea({ commit, rootState }, plantedAreaId) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}plantedAreas/${plantedAreaId}/with/plantedCrops`
        );
        console.log(res.data);
        commit("SET_PLANTED_AREA", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async saveSampling({ state, dispatch, rootState }) {
      const { locationName } = location;

      const locationData = { locationName };

      try {
        // Create location endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_SAMPLINGS}`,
          locationData
        );
        console.log(res);
        dispatch("getLocations");
      } catch (err) {
        console.log(err);
      }
    },
    checkSamples({ state, commit }) {
      const isEmpty = state.samples.find((sample) => Object.keys(sample) === 0);

      if (isEmpty) {
        commit("SET_COMPLETE_SAMPLES", false);
      } else {
        commit("SET_COMPLETE_SAMPLES", true);
      }
    },
  },
  getters: {
    isComplete: (state) => {
      return state.complete && state.completeSamples;
    },
    // Devuelve todos los locations
    allLocations: (state) => {
      return state.locations;
    },
    // Devuleve unicamente el location coincidente
    selectLocation: (state) => (id) => {
      return state.locations.find((location) => location.locationId === id);
    },
    count: (state) => {
      return state.locations.length;
    },
    getPlantedArea: (state) => {
      return state.plantedArea;
    },
  },
};
