import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_LOCATIONS: "locations",
    loading: true,
    location: {
      locationId: 0,
      locationName: "",
    },
    locations: [],
  }),
  mutations: {
    SET_LOCATIONS(state, locations) {
      state.locations = locations;
    },
  },
  actions: {
    async getLocations({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_LOCATIONS}`
        );
        console.log(res.data);
        commit("SET_LOCATIONS", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async saveLocation({ state, dispatch, rootState }, location) {
      const { locationName } = location;

      const locationData = { locationName };

      try {
        // Create location endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_LOCATIONS}`,
          locationData
        );
        console.log(res);
        dispatch("getLocations");
      } catch (err) {
        console.log(err);
      }
    },
    async editLocation({ state, dispatch, rootState }, location) {
      const { locationId, locationName } = location;

      const locationData = { locationName };
      try {
        // Edit location endpoint
        const res = await Axios.put(
          `${rootState.API_URI}${state.EP_LOCATIONS}/${locationId}`,
          locationData
        );
        console.log(res);
        dispatch("getLocations");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLocation({ state, dispatch, rootState }, location) {
      const { locationId } = location;
      try {
        // Delete location endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_LOCATIONS}/${locationId}`
        );
        console.log(res);
        dispatch("getLocations");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
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
  },
};
