<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Ubicaciones</h2>
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
              <span class="text-h5">{{ accionModal }} Ubicación</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre localización"
                      required
                      v-model="locationData.locationName"
                    ></v-text-field>
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
              <v-btn color="blue darken-1" text @click="editOrCreateLocation">
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
                <th class="text-center">Ubicación</th>
                <th class="text-center">Ult. Actualización</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="location in locations" :key="location.locationId">
                <td>{{ location.locationId }}</td>
                <td>{{ location.locationName.toUpperCase() }}</td>
                <td>{{ convertTime(location.updatedAt) }}</td>
                <td>
                  <v-btn
                    @click="selectLocation(location.locationId)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = location.locationId"
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
          <v-btn @click="deleteLocation(idEliminar)" color="error"
            >Aceptar</v-btn
          >
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
  name: "ViewLocations",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      locations: [],
      locationData: {
        locationName: "",
        locationId: 0
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    selectLocation: function(id) {
      const location = this.locations.find(
        location => location.locationId == id
      );
      this.locationData.locationId = location.locationId;
      this.locationData.locationName = location.locationName;
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
    getLocations: async function() {
      const response = await Axios.get(this.$API_URI + "locations");
      console.log(response.data);

      this.locations = response.data;
    },
    editOrCreateLocation: function() {
      if (this.accionModal === "Nuevo") {
        this.saveLocation();
      } else {
        this.editLocation();
      }
    },
    saveLocation: async function() {
      try {
        const response = await Axios.post(this.$API_URI + "locations", {
          locationName: this.locationData.locationName
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getLocations();
    },
    editLocation: async function() {
      const id = this.locationData.locationId;
      try {
        const response = await Axios.put(`${this.$API_URI}locations/${id}`, {
          locationName: this.locationData.locationName
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getLocations();
    },
    deleteLocation: async function(id) {
      const response = await Axios.delete(`${this.$API_URI}locations/${id}`);
      console.log(response);

      if (response.status === 200) {
        this.resetData();
        this.dialogEliminar = false;
        this.getLocations();
      }
    },
    convertTime: function(isoDateTime) {
      const locationDate = DateTime.fromISO(isoDateTime);
      return locationDate.toRelative(DateTime.now());
    },
    resetData: function() {
      this.locationData.locationId = 0;
      this.locationData.locationName = "";
    }
  },
  mounted() {
    this.getLocations();
  }
};
</script>
