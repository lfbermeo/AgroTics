import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_PLACE_TYPES: "placeTypes",
    loading: true,
    placeType: {
      placeTypeId: 0,
      placeTypeName: "",
    },
    placeTypes: [],
  }),
  mutations: {
    SET_PLACE_TYPES(state, placeTypes) {
      state.placeTypes = placeTypes;
    },
  },
  actions: {
    async getPlaceTypes({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLACE_TYPES}`
        );
        console.log(res.data);
        commit("SET_PLACE_TYPES", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async savePlaceType({ state, dispatch, rootState }, placeType) {
      const { placeTypeName } = placeType;

      const placeTypeData = { placeTypeName };

      try {
        // Create placeType endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_PLACE_TYPES}`,
          placeTypeData
        );
        console.log(res);
        dispatch("getPlaceTypes");
      } catch (err) {
        console.log(err);
      }
    },
    async editPlaceType({ state, dispatch, rootState }, placeType) {
      const { placeTypeId, placeTypeName } = placeType;

      const placeTypeData = { placeTypeName };
      try {
        // Edit placeType endpoint
        const res = await Axios.put(
          `${rootState.API_URI}${state.EP_PLACE_TYPES}/${placeTypeId}`,
          placeTypeData
        );
        console.log(res);
        dispatch("getPlaceTypes");
      } catch (err) {
        console.log(err);
      }
    },
    async deletePlaceType({ state, dispatch, rootState }, placeType) {
      const { placeTypeId } = placeType;
      try {
        // Delete placeType endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_PLACE_TYPES}/${placeTypeId}`
        );
        console.log(res);
        dispatch("getPlaceTypes");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    // Devuelve todos los placeTypes
    allPlaceTypes: (state) => {
      return state.placeTypes;
    },
    // Devuleve unicamente el placeType coincidente
    selectPlaceType: (state) => (id) => {
      return state.placeTypes.find((placeType) => placeType.placeTypeId === id);
    },
    count: (state) => {
      return state.placeTypes.length;
    },
  },
};
