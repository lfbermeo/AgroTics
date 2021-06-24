<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">AGROTIC</div>
        <v-list-item-title class="text-h5 mb-1">
          {{ nomInvernadero }}
        </v-list-item-title>
        <v-list-item-subtitle
          >Area: {{ areaInvernadero }}m2
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="green lighten-3"
        ><v-icon large color="green darkend-2"
          >mdi-domain</v-icon
        ></v-list-item-avatar
      >
    </v-list-item>

    <v-progress-linear
      v-model="areaOcupadaNew"
      height="25"
      :color="colorPorcentaje(areaOcupada)"
    >
      <strong>{{ Math.ceil(areaOcupada) }}%</strong>
    </v-progress-linear>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        :to="{ path: `/lugar-cultivo/${idInvernadero}` }"
      >
        Ver más
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CardInvernadero",
  props: {
    idInvernadero: Number,
    nomInvernadero: String,
    areaInvernadero: Number,
    areaOcupada: Number
  },
  data() {
    return {
      areaOcupadaNew: this.areaOcupada
    };
  },
  methods: {
    colorPorcentaje: function(porcentaje) {
      let color = "green darkend-1";
      if (porcentaje >= 80) {
        color = "red darkend-1";
      } else if (porcentaje >= 30) {
        color = "amber darkend-1";
      }
      return color;
    }
  }
};
</script>
