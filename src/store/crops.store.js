import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_CROPS: "crops",
    loading: true,
    crop: {
      cropId: 0,
      cropName: "",
      scientificName: "",
      variety: "",
    },
    crops: [],
  }),
  mutations: {
    SET_CROPS(state, crops) {
      state.crops = crops;
    },
  },
  actions: {
    async getCrops({ state, commit, rootState }) {
      try {
        const res = await Axios.get(`${rootState.API_URI}${state.EP_CROPS}`);
        console.log(res.data);
        commit("SET_CROPS", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async saveCrop({ state, dispatch, rootState }, crop) {
      const { cropName, scientificName, variety } = crop;

      const cropData = { cropName, scientificName, variety };

      try {
        // Create crop endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_CROPS}`,
          cropData
        );
        console.log(res);
        dispatch("getCrops");
      } catch (err) {
        console.log(err);
      }
    },
    async editCrop({ state, dispatch, rootState }, crop) {
      const { cropId, cropName, scientificName, variety } = crop;

      const cropData = { cropName, scientificName, variety };
      try {
        // Edit crop endpoint
        const res = await Axios.put(
          `${rootState.API_URI}${state.EP_CROPS}/${cropId}`,
          cropData
        );
        console.log(res);
        dispatch("getCrops");
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCrop({ state, dispatch, rootState }, crop) {
      const { cropId } = crop;
      try {
        // Delete crop endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_CROPS}/${cropId}`
        );
        console.log(res);
        dispatch("getCrops");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    // Devuelve todos los crops
    allCrops: (state) => {
      return state.crops;
    },
    // Devuleve unicamente el crop coincidente
    selectCrop: (state) => (id) => {
      return state.crops.find((crop) => crop.cropId === id);
    },
    count: (state) => {
      return state.crops.length;
    },
  },
};
