<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Cultivo</h2>
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
              <span class="text-h5">{{ accionModal }} cultivo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre"
                      required
                      v-model="cropData.cropName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre científico"
                      required
                      v-model="cropData.scientificName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Variedad"
                      required
                      v-model="cropData.variety"
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
              <v-btn color="blue darken-1" text @click="editOrCreateCrop">
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
                <th class="text-center">Nombre científico</th>
                <th class="text-center">Variedad</th>
                <th class="text-center">Ult. Actualización</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crop in crops" :key="crop.cropId">
                <td>{{ crop.cropId }}</td>
                <td>{{ crop.cropName }}</td>
                <td>{{ crop.scientificName }}</td>
                <td>{{ crop.variety }}</td>
                <td>{{ convertTime(crop.updatedAt) }}</td>
                <td>
                  <v-btn
                    @click="selectCrop(crop.cropId)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = crop.cropId"
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
  name: "ViewCrops",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      crops: [],
      cropData: {
        cropId: 0,
        cropName: "",
        scientificName: "",
        variety: ""
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    // Desde aqui
    selectCrop: function(id) {
      const crop = this.crops.find(crop => crop.cropId == id);
      this.cropData.cropId = crop.cropId;
      this.cropData.cropName = crop.cropName;

      this.cropData.scientificName = crop.scientificName;
      this.cropData.variety = crop.variety;
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
    getCrops: async function() {
      const response = await Axios.get(this.$API_URI + "crops");
      console.log(response.data);

      this.crops = response.data;
    },
    editOrCreateCrop: function() {
      if (this.accionModal === "Nuevo") {
        this.saveCrop();
      } else {
        this.editCrop();
      }
    },
    saveCrop: async function() {
      try {
        const response = await Axios.post(this.$API_URI + "crops", {
          cropName: this.cropData.cropName,
          scientificName: this.cropData.scientificName,
          variety: this.cropData.variety
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getCrops();
    },
    editCrop: async function() {
      const id = this.cropData.cropId;
      try {
        const response = await Axios.put(`${this.$API_URI}crops/${id}`, {
          cropName: this.cropData.cropName,
          scientificName: this.cropData.scientificName,
          variety: this.cropData.variety
        });
        console.log(response);
        if (response.status === 200) {
          this.dialog = false;
          this.resetData();
        }
      } catch (err) {
        console.error(err);
      }
      this.getCrops();
    },
    deleteCrop: async function(id) {
      const response = await Axios.delete(`${this.$API_URI}crops/${id}`);
      console.log(response);

      if (response.status === 200) {
        this.resetData();
        this.dialogEliminar = false;
        this.getCrops();
      }
    },
    convertTime: function(isoDateTime) {
      const cropDate = DateTime.fromISO(isoDateTime);
      return cropDate.toRelative(DateTime.now());
    },
    resetData: function() {
      this.cropData.cropId = 0;
      this.cropData.cropName = "";
      this.cropData.scientificName = "";
      this.cropData.variety = "";
    }
  },
  mounted() {
    this.getCrops();
  }
};
</script>
