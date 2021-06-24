<template>
  <v-container>
    <v-parallax dark src="../assets/fondo.jpg" width="1000px" height="500px">
      <v-container>
        <v-row class="text-center">
          <v-col cols="12">
            <v-img
              :src="require('../assets/logoUTPL.png')"
              class="my-3"
              contain
              height="150"
            />
          </v-col>
          <v-col class="mb-4">
            <v-toolbar-title
              class="black--text text-black font-weight-black text-h2"
            >
              AGROTICS
            </v-toolbar-title>
            <v-card-subtitle
              class="black--text text-black font-weight-medium text-h5"
            >
              Agro tics es un proyecto orientado al control y registro de las
              especies existentes en los invernaderos de UTPL
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
    <v-row class="mt-2">
      <v-col
        v-for="(inv, index) in invernaderos"
        :key="index"
        :sm="12"
        :md="6"
        :lg="4"
      >
        <card-invernadero
          :idInvernadero="inv.id"
          :areaInvernadero="inv.area"
          :areaOcupada="inv.porcentaje"
          :nomInvernadero="inv.name"
        ></card-invernadero>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardInvernadero from "../components/CardInvernadero.vue";
export default {
  components: { CardInvernadero },
  name: "inicio",
  data() {
    return {
      invernaderos: [
        {
          id: 1,
          name: "Invernadero 1",
          area: 800,
          porcentaje: 20
        },
        {
          id: 2,
          name: "Invernadero 2",
          area: 500,
          porcentaje: 80
        },
        {
          id: 3,
          name: "Invernadero 3",
          area: 700,
          porcentaje: 50
        },
        {
          id: 4,
          name: "Parcela 1",
          area: 200,
          porcentaje: 30
        }
      ]
    };
  }
};
</script>
