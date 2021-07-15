<template>
  <div>
    <v-row>
      <v-col cols="12" class="mb-0">
        <h2 class="display-2 font-weight-bold mb-3">Nuevo Muestreo</h2>
      </v-col>
      <v-col cols="12" md="4" class="my-0">
        <h2 class="display-1 mb-0">Area: {{ plantedAreaId }}</h2>
      </v-col>
      <v-col cols="12" md="8" class="my-0">
        <h2 class="display-1 text-capitalize mb-3 mt-0">
          {{ plantedArea.plantingPlace.placeName }}
        </h2>
      </v-col>
    </v-row>
    <v-stepper v-model="stepNumber" vertical non-linear @change="cambio">
      <v-stepper-step
        :rules="samplingDataRules"
        :complete="samplingDataCorrect"
        editable
        step="1"
      >
        Datos Muestreo
        <small>Formulario Muestreo</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-text-field
          v-model="samplingData.samplingDate"
          label="Fecha del Muestreo"
          type="date"
          required
        ></v-text-field>
        <v-text-field
          v-model="samplingData.observations"
          label="Observaciones del Muestreo"
          type="string"
          required
        ></v-text-field>
        <v-text-field
          v-model="plantedArea.plantedArea"
          label="Area Plantada m2"
          type="number"
          readonly
          requerided
        ></v-text-field>
        <!-- <v-btn color="primary" @click="stepNumber = 2">Siguiente</v-btn> -->
        <!-- <v-btn color="secondary" @click="stepNumber = 1">Volver</v-btn> -->
      </v-stepper-content>

      <v-stepper-step
        :rules="soilDataRules"
        :complete="soilDataCorrect"
        editable
        step="2"
      >
        Datos análisis de Suelo
        <small>Formulario Datos Suelo</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-text-field
          v-model="soilData.ph"
          label="PH del suelo"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="soilData.mo"
          label="% de MO del suelo"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="soilData.nitrogen"
          label="% de Nitrogeno del suelo"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="soilData.phosfor"
          label="Fosforo mg/hg"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="soilData.potasium"
          label="Potasio Cmol/Kg"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="soilData.others"
          label="Otros Elementos"
          type="string"
          required
        ></v-text-field>
        <!-- <v-btn color="primary" @click="stepNumber = 3">Siguiente</v-btn>
      <v-btn color="secondary" @click="stepNumber = 2">Volver</v-btn> -->
      </v-stepper-content>

      <v-stepper-step
        :rules="weatherDataRules"
        :complete="weatherDataCorrect"
        editable
        step="3"
      >
        Datos Climáticos
        <small>Formulario Datos Suelo</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-text-field
          v-model="weatherData.temperature"
          label="Temperatura °C"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="weatherData.humidity"
          label="% de Humedad Relativa"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="weatherData.irrigation"
          label="Riego / Lluvia (ml/Planta) "
          type="number"
          required
        ></v-text-field>

        <!-- <v-btn color="primary" @click="stepNumber = 4">Siguiente</v-btn>
      <v-btn color="secondary" @click="stepNumber = 3">Volver</v-btn> -->
      </v-stepper-content>

      <v-stepper-step
        :rules="plagueDataRules"
        :complete="plagueDataCorrect"
        editable
        step="4"
      >
        Datos aplicación de productos control plagas y enfermedades
        <small>Formulario de control ded plagas y enfermedades</small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-text-field
          v-model="plagueData.plagueProduct"
          label="*Nombre del Producto"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="plagueData.amount"
          label="*Cantidad"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="plagueData.applicationDate"
          label="*Fecha Aplicación"
          type="date"
          required
        ></v-text-field>

        <!-- <v-btn color="primary" @click="stepNumber = 5">Siguiente</v-btn>
      <v-btn color="secondary" @click="stepNumber = 4">Volver</v-btn> -->
      </v-stepper-content>
      <v-stepper-step step="5" editable> Listado de Muestreos </v-stepper-step>
      <v-stepper-content step="5">
        <v-row class="text-center">
          <v-col cols="12">
            <v-data-table
              mobile-breakpoint="0"
              :headers="headers"
              :items="plantedArea.plantedCrops"
              :items-per-page="10"
              :loading="plantedArea.plantedCrops.length === 0"
              loading-text="Cargando... Por favor espere"
              class="elevation-1"
            >
              <!-- START Slot Top -->
              <template slot="top">
                <v-toolbar flat>
                  <v-toolbar-title
                    >{{ plantedArea.plantedCrops.length }} especies a
                    muestrear</v-toolbar-title
                  >
                  <v-spacer></v-spacer>

                  <!-- START Dialog Form -->
                  <v-dialog v-model="dialog" persistent max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="indigo"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <!-- START Form -->
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Nombre"
                                required
                                v-model="editedItem.placeName"
                              ></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="['Vacío', 'Sembrado', 'Completo']"
                            label="Área sembrado"
                            required
                            v-model="editedItem.plantingArea"
                          ></v-select>
                        </v-col> -->
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                label="Area"
                                required
                                v-model="editedItem.availableArea"
                                placeholder="0"
                                type="number"
                              >
                                <template slot="append"> m2 </template>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                :items="locations"
                                item-text="locationName"
                                item-value="locationId"
                                label="Ubicación"
                                return-object
                                required
                                v-model="editedItem.location"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select
                                :items="placeTypes"
                                item-text="placeTypeName"
                                item-value="placeTypeId"
                                label="Tipo de lugar"
                                return-object
                                required
                                v-model="editedItem.placeType"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*Indica campos requeridos</small>
                      </v-card-text>
                      <!-- END Form -->

                      <!-- START Form Buttons -->
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cerrar
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Guardar
                        </v-btn>
                      </v-card-actions>
                      <!-- END Form Buttons -->
                    </v-card>
                  </v-dialog>
                  <!-- END Dialog Form -->
                </v-toolbar>
              </template>
              <!-- END Slot Top -->
            </v-data-table>
          </v-col>
        </v-row>
        <!-- ventana de diálogo para eliminar registros -->
        <v-dialog v-model="dialog" max-width="350">
          <v-card>
            <v-card-title class="headline"
              >¿Desea eliminar el registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">Cancelar</v-btn>
              <v-btn @click="confirmarBorrado(id)" color="error">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- componente snackbar para mostrar mensaje de eliminación -->
        <v-snackbar v-model="snackbar" color="success">
          {{ textsnack }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
          </template>
        </v-snackbar>
      </v-stepper-content>
    </v-stepper>

    <v-btn color="primary">Guardar</v-btn>
    <v-btn color="secondary">Cancelar</v-btn>
  </div>
</template>

<script>
import { formatDate } from "../libs/time.utils";

export default {
  name: "newSampling",
  props: ["plantedAreaId"],
  data() {
    return {
      dialog: null,
      articulos: null,
      snackbar: false,
      textsnack: "Faltan completar datos.",

      samplingData: {
        samplingDate: formatDate(new Date()),
        observations: "",
        plantedAreaId: undefined,
      },
      soilData: {
        ph: undefined,
        mo: undefined,
        nitrogen: undefined,
        phosfor: undefined,
        potasium: undefined,
        others: "",
      },
      weatherData: {
        temperature: undefined,
        humidity: undefined,
        irrigation: undefined,
      },
      plagueData: {
        plagueProduct: "",
        amount: "",
        applicationDate: formatDate(new Date()),
      },

      samplingDataCorrect: false,
      samplingDataRules: [
        () => this.samplingData.samplingDate !== "",
        () => this.samplingData.plantedAreaId >= 0,
      ],
      soilDataCorrect: false,
      soilDataRules: [
        () => this.soilData.ph >= 0,
        () => this.soilData.mo >= 0,
        () => this.soilData.nitrogen >= 0,
        () => this.soilData.phosfor >= 0,
        () => this.soilData.potasium >= 0,
      ],
      weatherDataCorrect: false,
      weatherDataRules: [
        () => this.weatherData.temperature >= 0,
        () => this.weatherData.humidity >= 0,
        () => this.weatherData.irrigation >= 0,
      ],
      plagueDataCorrect: false,
      plagueDataRules: [
        () => this.plagueData.plagueProduct !== "",
        () => this.plagueData.amount !== "",
        () => this.plagueData.applicationDate !== "",
      ],

      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "plantedCropId",
        },
        {
          text: "Cultivo",
          align: "start",
          sortable: true,
          value: "cropName",
        },
        {
          text: "Muestreado",
          align: "start",
          sortable: true,
          value: "isSampled",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],

      editedItem: {
        plantedCropId: -1,
        plantationDate: "",
        active: true,
        fenologicData: {},
      },
    };
  },
  created() {
    this.initializate();
  },
  methods: {
    initializate() {
      this.loadPlantedArea();
      this.samplingData.plantedAreaId = this.plantedArea.plantedAreaId;
    },
    confirmarBorrado() {
      this.dialog = false;
      this.snackbar = true;
    },
    cambio(value) {
      console.log(value);
    },
    loadPlantedArea() {
      this.$store.dispatch("newSampling/loadPlantedArea", this.plantedAreaId);
    },
  },
  computed: {
    plantedArea() {
      return this.$store.getters["newSampling/getPlantedArea"];
    },
  },
};
</script>
