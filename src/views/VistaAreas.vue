<template>
  <div>
    <v-row class="mb-6">
      <v-col md="4">
        <v-toolbar-title class="text-left font-weight-black text-h4"
          >{{ invernadero.name }}|{{idArea}}
        </v-toolbar-title>
      </v-col>
      <v-col md="4" offset-md="4">
        <v-progress-linear
          v-model="invernadero.porcentaje"
          height="30"
          :color="colorPorcentaje(invernadero.porcentaje)"
        >
          <strong>{{ Math.ceil(invernadero.porcentaje) }}%</strong>
        </v-progress-linear>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col
        v-for="(cul, index) in cultivos"
        :key="index"
        :sm="12"
        :md="6"
        :lg="4"
      >
        <card-area
          :nameCultivo="cul.nameCultivo"
          :areaCultivo="cul.areaCultivo"
          :totalCultivo="cul.totalCultivo"
        >
        </card-area>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CardArea from "./../components/CardArea.vue";
export default {
  components: { CardArea },
  name: "vistaAreas",
  props: {
    idArea: String,
  },
  computed: {
    numEspecies: function () {
      let num = 0;
      this.cultivos.forEach((cultivo) => {
        num += cultivo.totalCultivo;
      });
      return num;
    },
  },
  data() {
    return {
      invernadero: {
        name: "Invernadero 1",
        area: 1200,
        porcentaje: 20,
      },
      cultivos: [
        {
          nameCultivo: "Lechuga",
          areaCultivo: 800,
          totalCultivo: 20,
        },
        {
          nameCultivo: "Col",
          areaCultivo: 500,
          totalCultivo: 80,
        },
        {
          nameCultivo: "Coliflor",
          areaCultivo: 700,
          totalCultivo: 50,
        },
      ],
    };
  },
  methods: {
    colorPorcentaje: function (porcentaje) {
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
