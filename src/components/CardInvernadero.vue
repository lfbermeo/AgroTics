<template>
  <v-card class="mx-auto" max-width="374" min-height="200">
    <v-img height="200" :src="require('../assets/invernadero.png')"></v-img>

    <v-card-title>{{ nomInvernadero }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-progress-linear
          :value="areaOcupada"
          height="25"
          :color="colorPorcentaje(areaOcupada)"
          rounded
        >
          <strong>{{ Math.ceil(areaOcupada) }}%</strong>
        </v-progress-linear>
      </v-row>
      <div class="mt-4 text-subtitle-1">Area: {{ areaInvernadero }}m2</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

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
    idInvernadero: {
      type: Number,
      required: true,
    },
    nomInvernadero: {
      type: String,
      required: true,
    },
    areaInvernadero: {
      type: Number,
      required: true,
    },
    areaOcupada: {
      type: Number,
      required: true,
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
  },
};
</script>
