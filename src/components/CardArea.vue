<template>
  <v-card class="mx-auto mt-2" max-width="350" outlined>
    <v-card-text class="">
      <v-row>
        <v-col cols="12" class="pt-2 pb-0 px-0">
          <v-card-title class="pt-0">{{ cropFullName }}</v-card-title>
          <v-card-subtitle class="pb-0"
            >{{ plantedArea.plantedArea }} m2</v-card-subtitle
          >
        </v-col>
        <v-col cols="12" class="py-0 px-0">
          <v-row>
            <v-col cols="2">
              <v-card-title class="py-0">{{ totalCrops }}</v-card-title>
            </v-col>
            <v-col cols="10">
              <v-card-subtitle class="py-2">Cultivos</v-card-subtitle>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        x-small
        :to="{ path: `/new-sampling/${plantedArea.plantedAreaId}` }"
      >
        Muestrear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardArea",
  props: {
    plantedArea: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cropFullName() {
      return `${this.plantedArea.crop.cropName} ${this.plantedArea.crop.variety}`;
    },
    totalCrops() {
      return this.plantedArea.plantedCrops.length;
    },
  },
};
</script>
