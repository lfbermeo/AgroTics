import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_PLANTED_AREAS: "plantedAreas",
    loading: true,
    plantedArea: {
      plantedAreaId: 0,
      plantedArea: "",
      plantedDate: 0,
      active: "empty",
      plantingPlace: {},
      crop: {},
    },
    plantedAreas: [],
  }),
  mutations: {
    SET_PLANTED_AREAS(state, plantedAreas) {
      state.plantedAreas = plantedAreas;
    },
  },
  actions: {
    async getPlantedAreas({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLANTED_AREAS}`
        );
        console.log(res.data);
        commit("SET_PLANTED_AREAS", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async savePlantedArea({ state, dispatch, rootState }, plantedAreaObj) {
      const {
        plantedArea,
        plantedDate,
        active,
        plantingPlace,
        crop,
        plantedCropsNum,
      } = plantedAreaObj;
      const { plantingPlaceId } = plantingPlace;
      const { cropId } = crop;

      const plantedAreaData = {
        plantedArea,
        plantedDate,
        active,
        plantingPlaceId,
        cropId,
        plantedCropsNum,
      };

      try {
        // Create plantedArea endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_PLANTED_AREAS}`,
          plantedAreaData
        );
        console.log(res);
        dispatch("getPlantedAreas");
      } catch (err) {
        console.log(err);
      }
    },
    async deletePlantedArea({ state, dispatch, rootState }, plantedArea) {
      const { plantedAreaId } = plantedArea;
      try {
        // Delete plantedArea endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_PLANTED_AREAS}/${plantedAreaId}`
        );
        console.log(res);
        dispatch("getPlantedAreas");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    // Devuelve todos los plantedAreas
    allPlantedAreas: (state) => {
      return state.plantedAreas;
    },
    // Devuleve unicamente el plantedArea coincidente
    selectPlantedArea: (state) => (id) => {
      return state.plantedAreas.find(
        (plantedArea) => plantedArea.plantedAreaId === id
      );
    },
    count: (state) => {
      return state.plantedAreas.length;
    },
  },
};
