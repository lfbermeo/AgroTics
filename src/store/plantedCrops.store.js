import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_PLANTED_CROPS: "plantedCrops",
    loading: true,
    plantedCrop: {
      plantedCropId: 0,
      plantedCrop: "",
      plantedDate: 0,
      active: "empty",
      plantingPlace: {},
      crop: {},
    },
    plantedCrops: [],
  }),
  mutations: {
    SET_PLANTED_CROPS(state, plantedCrops) {
      state.plantedCrops = plantedCrops;
    },
  },
  actions: {
    async getPlantedCrops({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLANTED_CROPS}`
        );
        console.log(res.data);
        commit("SET_PLANTED_CROPS", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getPlantedCropsForPlantedArea(
      { state, commit, rootState },
      plantedAreaId
    ) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLANTED_CROPS}/all/plantedArea/${plantedAreaId}`
        );
        console.log(res.data);
        commit("SET_PLANTED_CROPS", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async savePlantedCrop({ state, dispatch, rootState }, plantedCropObj) {
      const {
        plantedCrop,
        plantedDate,
        active,
        plantingPlace,
        crop,
        plantedCropsNum,
      } = plantedCropObj;
      const { plantingPlaceId } = plantingPlace;
      const { cropId } = crop;

      const plantedCropData = {
        plantedCrop,
        plantedDate,
        active,
        plantingPlaceId,
        cropId,
        plantedCropsNum,
      };

      try {
        // Create plantedCrop endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_PLANTED_CROPS}`,
          plantedCropData
        );
        console.log(res);
        dispatch("getPlantedCrops");
      } catch (err) {
        console.log(err);
      }
    },
    async deletePlantedCrop({ state, dispatch, rootState }, plantedCrop) {
      const { plantedCropId } = plantedCrop;
      try {
        // Delete plantedCrop endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_PLANTED_CROPS}/${plantedCropId}`
        );
        console.log(res);
        dispatch("getPlantedCrops");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    // Devuelve todos los plantedCrops
    allPlantedCrops: (state) => {
      return state.plantedCrops;
    },
    // Devuleve unicamente el plantedCrop coincidente
    selectPlantedCrop: (state) => (id) => {
      return state.plantedCrops.find(
        (plantedCrop) => plantedCrop.plantedCropId === id
      );
    },
    count: (state) => {
      return state.plantedCrops.length;
    },
  },
};
