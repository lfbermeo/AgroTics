<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Tipo de parcela</h2>
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
              <span class="text-h5">{{ accionModal }} tipo de parcela</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre lugar o lote"
                      required
                      v-model="placeData.placeTypeName"
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
              <v-btn color="blue darken-1" text @click="editOrCreatePlaceType">
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
                <th class="text-center">Nombre parcela</th>
                <th class="text-center">Ult. Actualización</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="place in places" :key="place.placeTypeId">
                <td>{{ place.placeTypeId }}</td>
                <td>{{ place.placeTypeName }}</td>
                <td>{{ convertTime(place.updatedAt) }}</td>
                <td>
                  <v-btn
                    @click="selectPlaceType(place.placeTypeId)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = place.placeTypeId"
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
          <v-btn @click="deletePlaceType(idEliminar)" color="error"
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
  name: "ViewPlaceTypes",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      places: [],
      placeData: {
        placeTypeId: 0,
        placeTypeName: ""
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    // Desde aqui
    selectPlaceType: function(id) {
      const placeType = this.places.find(place => place.placeTypeId == id);
      this.placeData.placeTypeId = placeType.placeTypeId;
      this.placeData.placeTypeName = placeType.placeTypeName;
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
    getPlaceTypes: async function() {
      const response = await Axios.get(this.$API_URI + "placeTypes");
      console.log(response.data);

      this.places = response.data;
    },
    editOrCreatePlaceType: function() {
      if (this.accionModal === "Nuevo") {
        this.savePlaceType();
      } else {
        this.editPlaceType();
      }
    },
    savePlaceType: async function() {
      try {
        const response = await Axios.post(this.$API_URI + "placeTypes", {
          placeTypeName: this.placeData.placeTypeName
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getPlaceTypes();
    },
    editPlaceType: async function() {
      const id = this.placeData.placeTypeId;
      try {
        const response = await Axios.put(`${this.$API_URI}placeTypes/${id}`, {
          placeTypeName: this.placeData.placeTypeName
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getPlaceTypes();
    },
    deletePlaceType: async function(id) {
      const response = await Axios.delete(`${this.$API_URI}placeTypes/${id}`);
      console.log(response);

      if (response.status === 200) {
        this.resetData();
        this.dialogEliminar = false;
        this.getPlaceTypes();
      }
    },
    convertTime: function(isoDateTime) {
      const placeDate = DateTime.fromISO(isoDateTime);
      return placeDate.toRelative(DateTime.now());
    },
    resetData: function() {
      this.placeData.placeTypeId = 0;
      this.placeData.placeTypeName = "";
    }
  },
  mounted() {
    this.getPlaceTypes();
  }
};
</script>
