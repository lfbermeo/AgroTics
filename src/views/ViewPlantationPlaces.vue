<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Lugar plantación</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-1">
        <v-btn class="mx-2" fab dark color="indigo" @click="showModal('Nuevo')">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ accionModal }} lugar de plantación</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre"
                      required
                      v-model="plantingData.placeName"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6">
                    <v-select
                      :items="['Vacío', 'Sembrado', 'Completo']"
                      label="Área sembrado"
                      required
                      v-model="plantingData.plantingArea"
                    ></v-select>
                  </v-col> -->
                  <v-col cols="12" sm="6">
                    <v-text-field
                      label="Area"
                      required
                      v-model="plantingData.availableArea"
                      placeholder="0"
                      type="number"
                    >
                      <template slot="append">
                        m2
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="placeTypesOpts"
                      label="Tipo"
                      required
                      v-model="plantingData.plantingType"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Indica campos requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dismissModal">
                Cerrar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="editOrCreatePlantingPlace"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-simple-table fixed-header class="elevation-3">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">N°</th>
                <th class="text-center">Nombre</th>
                <th class="text-center">Área disponible</th>
                <th class="text-center">Ubicación</th>
                <th class="text-center">Tipo</th>
                <th class="text-center">Ult. Actualización</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="planting in plantings" :key="planting.plantingPlaceId">
                <td>{{ planting.plantingPlaceId }}</td>
                <td>{{ planting.placeName }}</td>
                <td>{{ planting.availableArea }}</td>
                <td>{{ planting.location.locationName }}</td>
                <td>{{ planting.placeType.placeTypeName }}</td>
                <td>{{ convertTime(planting.updatedAt) }}</td>
                <td>
                  <v-btn
                    @click="selectPlantingPLace(planting.plantingPlaceId)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = planting.placeTypeId"
                    fab
                    x-small
                    color="error"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <!-- ventana de diálogo para eliminar registros -->
    <v-dialog v-model="dialogEliminar" max-width="350">
      <v-card>
        <v-card-title class="headline"
          >¿Desea eliminar el registro?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogEliminar = false">Cancelar</v-btn>
          <v-btn @click="deleteCrop(idEliminar)" color="error">Aceptar</v-btn>
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
  </v-container>
</template>
<script>
import Axios from "axios";
import { DateTime } from "luxon";

export default {
  name: "ViewPlantationPlaces",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      placeTypes: [],
      placeTypesOpts: [],
      locations: [],
      locationsOpts: [],
      plantings: [],
      plantingData: {
        plantingPlaceId: 0,
        placeName: "",
        availableArea: 0,
        status: "empty",
        locationId: 0,
        placeTypeId: 0
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    // Desde aqui
    selectPlantingPLace: function(id) {
      const planting = this.plantings.find(
        planting => planting.plantingPlaceId == id
      );
      this.plantingData.plantingPlaceId = planting.plantingPlaceId;
      this.plantingData.placeName = planting.placeName;
      this.plantingData.availableArea = planting.availableArea;
      this.plantingData.status = planting.status;
      this.plantingData.locationId = planting.locationId;
      this.plantingData.placeTypeId = planting.placeTypeId;

      this.showModal("Editar");
    },
    showModal: function(action) {
      this.accionModal = action;
      this.dialog = true;
    },
    dismissModal: function() {
      this.dialog = false;
      this.resetData();
    },
    getPlantingPlaces: async function() {
      const response = await Axios.get(this.$API_URI + "plantingPlaces");
      console.log(response.data);

      this.plantings = response.data;
    },
    editOrCreatePlantingPlace: function() {
      if (this.accionModal === "Nuevo") {
        this.savePlantingPlace();
      } else {
        this.editPlantingPlace();
      }
    },
    savePlantingPlace: async function() {
      try {
        const response = await Axios.post(this.$API_URI + "plantingPlaces", {
          placeName: this.plantingData.placeName,
          availableArea: this.plantingData.availableArea,
          locationId: this.plantingData.locationId,
          placeTypeId: this.plantingData.placeTypeId
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getPlantingPlaces();
    },
    editPlantingPlace: async function() {
      const id = this.plantingData.plantingPlaceId;
      try {
        const response = await Axios.put(
          `${this.$API_URI}plantingPlaces/${id}`,
          {
            placeName: this.plantingData.placeName,
            availableArea: this.plantingData.availableArea,
            locationId: this.plantingData.locationId,
            placeTypeId: this.plantingData.placeTypeId
          }
        );
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getPlantingPlaces();
    },
    deletePlantingPlace: async function(id) {
      const response = await Axios.delete(
        `${this.$API_URI}plantingPlaces/${id}`
      );
      console.log(response);

      if (response.status === 200) {
        this.resetData();
        this.dialogEliminar = false;
        this.getPlantingPlaces();
      }
    },
    convertTime: function(isoDateTime) {
      const plantingDate = DateTime.fromISO(isoDateTime);
      return plantingDate.toRelative(DateTime.now());
    },
    resetData: function() {
      this.plantingData.plantingPlaceId = 0;
      this.plantingData.placeName = "";
      this.plantingData.availableArea = 0;
      this.plantingData.status = "empty";
      this.plantingData.locationId = 0;
      this.plantingData.placeTypeId = 0;
    },
    getPlaceTypes: async function() {
      const response = await Axios.get(this.$API_URI + "placeTypes");
      // console.log(response.data);

      this.placeTypes = response.data;
      console.log("PlaceTypes", this.placeTypes);
      this.placeTypesOpts = this.placeTypes.map(type => type.placeTypeName);
    },
    getLocations: async function() {
      const response = await Axios.get(this.$API_URI + "locations");
      // console.log(response.data);

      this.locations = response.data;
      console.log("Locations", this.locations);
      this.locationsOpts = this.locations.map(
        location => location.locationName
      );
    }
  },
  mounted() {
    this.getPlantingPlaces();
    this.getPlaceTypes();
    this.getLocations();
  }
};
</script>
