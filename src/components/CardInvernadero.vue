<template>
  <v-card class="mx-auto" max-width="400" min-height="200">
    <v-img height="200" :src="require('../assets/invernadero.png')"></v-img>

    <v-card-title>{{ plantingPlace.placeName }}</v-card-title>

    <v-tabs vertical>
      <v-tab> <v-icon left>mdi-information</v-icon>Info</v-tab>
      <!-- <v-tab @click="loadPlantedAreas(plantingPlace.plantingPlaceId)"> -->
      <v-tab> <v-icon left>mdi-square</v-icon>Areas</v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-progress-linear
                :value="percentArea"
                height="25"
                :color="colorPorcentaje(percentArea)"
                rounded
              >
                <strong>{{ Math.ceil(percentArea) }}%</strong>
              </v-progress-linear>
            </v-row>
            <div class="mt-4 text-subtitle-1">
              Area: {{ plantingPlace.availableArea }}m2
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="text-center" v-if="plantedCrops.length === 0">
              <!-- <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular> -->
            </div>
            <card-area
              v-for="plantedArea in plantingPlace.plantedAreas"
              :key="plantedArea.plantedAreaId"
              :plantedArea="plantedArea"
            ></card-area>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :to="{ path: `/lugar-cultivo/${plantingPlace.plantingPlaceId}` }"
      >
        Nueva area
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import Axios from "axios";
import CardArea from "./CardArea.vue";

export default {
  components: { CardArea },
  name: "CardInvernadero",
  props: {
    plantingPlace: {
      type: Object,
      required: true,
    },
    areaOcupada: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    plantedCrops: [],
  }),
  computed: {
    percentArea() {
      const { availableArea, plantedAreas } = this.plantingPlace;

      if (!plantedAreas || plantedAreas.length === 0) return 0;

      console.log(plantedAreas);

      let areaOcuped = 0;

      plantedAreas.forEach((plantedArea) => {
        areaOcuped += plantedArea.plantedArea;
      });

      return (100 * areaOcuped) / availableArea;
    },
  },
  methods: {
    colorPorcentaje: (porcentaje) => {
      let color = "green darkend-1";
      if (porcentaje >= 80) {
        color = "red darkend-1";
      } else if (porcentaje >= 30) {
        color = "amber darkend-1";
      }
      return color;
    },
    // loadPlantedAreas(msg) {
    //   // Llamar al store y cargar las planted areas del plantingplace correspondiente
    //   console.log(msg);
    //   this.getPlantedCrops(msg);
    // },
    // async getPlantedCrops(plantedAreaId) {
    //   try {
    //     const res = await Axios.get(
    //       `${this.$store.state.API_URI}plantedAreas/${plantedAreaId}/with/plantedCrops/`
    //     );
    //     console.log(res.data);
    //     this.plantedCrops = res.data.plantedCrops;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};
</script>
