<template>
  <div>
    <!-- <v-parallax dark :src="require('../assets/fondo.jpg')" height="250px"> -->
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logotipo-1024.png')"
            class="my-4"
            contain
            max-height="150"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- </v-parallax> -->
    <v-row class="mt-2">
      <v-col
        v-for="inv in plantingPlaces"
        :key="inv.plantingPlaceId"
        :sm="12"
        :md="6"
        :lg="4"
      >
        <card-invernadero
          :plantingPlace="inv"
          :areaOcupada="percentOcuped(inv)"
        ></card-invernadero>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardInvernadero from "../components/CardInvernadero";

export default {
  name: "Home",

  components: {
    CardInvernadero,
  },
  data: () => ({
    invernadero: {
      plantingPlaceId: 1,
      placeName: "invernadero 1",
      availableArea: 375,
      status: "empty",
      createdAt: "2021-07-08T07:48:12.000Z",
      updatedAt: "2021-07-08T07:48:12.000Z",
      location: {
        locationId: 1,
        locationName: "utpl",
      },
    },
  }),
  computed: {
    plantingPlaces() {
      return this.$store.state.plantingPlaces.plantingPlaces;
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.getPlantingPlaces();
    },
    getPlantingPlaces() {
      return this.$store.dispatch(
        "plantingPlaces/getPlantingPlacesWithPlantedAreas"
      );
    },
    percentOcuped(plantingPlace) {
      if (!plantingPlace) return 0;

      const { availableArea, plantedAreas } = plantingPlace;

      if (!plantedAreas || plantedAreas.length === 0) return 0;

      const areaOcuped = plantedAreas.reduce(
        (prev, current) => prev + current.plantedArea
      );

      return (100 * areaOcuped) / availableArea;
    },
  },
};
</script>
