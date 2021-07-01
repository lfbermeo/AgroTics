<template>
  <v-card class="mx-auto mt-2" max-width="350" outlined>
    <v-card-text>
      <v-row class="">
        <v-col cols="12" class="pb-0">
          <v-card-subtitle class="text-overline pb-0">Especie</v-card-subtitle>
        </v-col>
      </v-row>
      <v-row class="">
        <v-col cols="8" class="pt-0">
          <v-card-title class="pt-0">{{ nameCultivo }}</v-card-title>
          <v-card-subtitle>{{ areaCultivo }} m2</v-card-subtitle>
        </v-col>
        <v-col cols="4" class="pt-0">
          <v-card-title class="pt-0">{{ totalCultivo }}</v-card-title>
          <v-card-subtitle>Cultivos</v-card-subtitle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "CardArea",
  props: { nameCultivo: String, areaCultivo: Number, totalCultivo: Number },
};
</script>
