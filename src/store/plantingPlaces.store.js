import Axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    EP_PLANTING_PLACES: "plantingPlaces",
    loading: true,
    plantingPlace: {
      plantingPlaceId: 0,
      placeName: "",
      availableArea: 0,
      status: "empty",
      locationId: 0,
      placeTypeId: 0,
    },
    plantingPlaces: [],
  }),
  mutations: {
    SET_PLANTING_PLACES(state, plantingPlaces) {
      state.plantingPlaces = plantingPlaces;
    },
  },
  actions: {
    async getPlantingPlaces({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLANTING_PLACES}`
        );
        console.log(res.data);
        commit("SET_PLANTING_PLACES", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getPlantingPlacesWithPlantedAreas({ state, commit, rootState }) {
      try {
        const res = await Axios.get(
          `${rootState.API_URI}${state.EP_PLANTING_PLACES}/with/plantedAreas`
        );
        console.log(res.data);
        commit("SET_PLANTING_PLACES", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async savePlantingPlace({ state, dispatch, rootState }, plantingPlace) {
      const { placeName, availableArea, location, placeType } = plantingPlace;
      const { locationId } = location;
      const { placeTypeId } = placeType;

      const plantingPlaceData = {
        placeName,
        availableArea,
        locationId,
        placeTypeId,
      };

      try {
        // Create plantingPlace endpoint
        const res = await Axios.post(
          `${rootState.API_URI}${state.EP_PLANTING_PLACES}`,
          plantingPlaceData
        );
        console.log(res);
        dispatch("getPlantingPlaces");
      } catch (err) {
        console.log(err);
      }
    },
    async editPlantingPlace({ state, dispatch, rootState }, plantingPlace) {
      const { plantingPlaceId, placeName, availableArea, location, placeType } =
        plantingPlace;
      const { locationId } = location;
      const { placeTypeId } = placeType;

      const plantingPlaceData = {
        placeName,
        availableArea,
        locationId,
        placeTypeId,
      };
      try {
        // Edit plantingPlace endpoint
        const res = await Axios.put(
          `${rootState.API_URI}${state.EP_PLANTING_PLACES}/${plantingPlaceId}`,
          plantingPlaceData
        );
        console.log(res);
        dispatch("getPlantingPlaces");
      } catch (err) {
        console.log(err);
      }
    },
    async deletePlantingPlace({ state, dispatch, rootState }, plantingPlace) {
      const { plantingPlaceId } = plantingPlace;
      try {
        // Delete plantingPlace endpoint
        const res = await Axios.delete(
          `${rootState.API_URI}${state.EP_PLANTING_PLACES}/${plantingPlaceId}`
        );
        console.log(res);
        dispatch("getPlantingPlaces");
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {
    // Devuelve todos los plantingPlaces
    allPlantingPlaces: (state) => {
      return state.plantingPlaces;
    },
    // Devuleve unicamente el plantingPlace coincidente
    selectPlantingPlace: (state) => (id) => {
      return state.plantingPlaces.find(
        (plantingPlace) => plantingPlace.plantingPlaceId === id
      );
    },
    count: (state) => {
      return state.plantingPlaces.length;
    },
  },
};
