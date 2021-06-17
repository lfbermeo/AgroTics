<template>
  <v-card class="mx-auto mt-2" max-width="350" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row class="mb-6">
          <v-col sm="5" md="6">
            <div class="text-overline mb-4">Especie</div>
            <v-list-item-title class="text-h5 mb-1">
              {{ nameCultivo }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ areaCultivo }}m2 </v-list-item-subtitle>
          </v-col>
          <v-col sm="5" offset-sm="2" md="6" offset-md="0" class="mt-12">
            <v-list-item-title class="text-h5">
              {{ totalCultivo }}
            </v-list-item-title>
            <v-list-item-subtitle> Total especies </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn outlined rounded text> Ver más </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardArea",
  props: { nameCultivo: String, areaCultivo: Number, totalCultivo: Number },
};
</script>
