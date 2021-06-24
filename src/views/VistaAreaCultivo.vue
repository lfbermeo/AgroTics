<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Área cultivo</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-1">
        <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="abrirModal('Nuevo')"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ accionModal }} área cultivo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Lugar"
                      required
                      v-model="cropAreaData.cropAreaPlace"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Área plantada"
                      required
                      v-model="cropAreaData.cropAreaPlanting"
                      >m2</v-text-field
                    >
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Número de especies"
                      required
                      v-model="cropAreaData.cropAreaNum"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Indica campos requeridos</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cerrarModal">
                Cerrar
              </v-btn>
              <v-btn color="blue darken-1" text @click="guardarCropArea">
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
                <th class="text-center">Lugar</th>
                <th class="text-center">Área plantada</th>
                <th class="text-center">Número de especies</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cropArea in cropsArea" :key="cropArea.id">
                <td>{{ cropArea.id }}</td>
                <td>{{ cropArea.cropAreaPlace }}</td>
                <td>{{ cropArea.cropAreaPlanting }}</td>
                <td>{{ cropArea.cropAreaNum }}</td>
                <td>
                  <v-btn
                    @click="editarRegistro(cropArea.id)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = cropArea.id"
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
          <v-btn @click="confirmarBorrado(idEliminar)" color="error"
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
export default {
  name: "vistaAreaCultivo",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      cropsArea: [
        {
          id: 1,
          cropAreaPlace: "Parcela 1",
          cropAreaPlanting: 200,
          cropAreaNum: 20
        }
      ],
      cropAreaData: {
        cropAreaPlace: "",
        cropAreaPlanting: 0,
        cropAreaNum: 0,
        id: 0
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    guardarCropArea: function() {
      this.dialog = false;
      this.cropAreaData.id = this.cropsArea[this.cropsArea.length - 1].id + 1;
      this.cropsArea.push(Object.assign({}, this.cropAreaData));
      this.cropAreaData.cropAreaPlace = "";
      this.cropAreaPlanting = 0;
      this.cropAreaNum = 0;
      this.cropAreaData.id = 0;
    },
    editarRegistro: function(id) {
      const cropArea = this.cropsArea.filter(cropArea => cropArea.id == id)[0];
      this.cropAreaData.id = cropArea.id;
      this.cropAreaData.cropAreaPlace = cropArea.cropAreaPlace;
      this.cropAreaData.cropAreaPlanting = cropArea.cropAreaPlanting;
      this.cropAreaData.cropAreaNum = cropArea.cropAreaNum;
      this.abrirModal("Editar");
    },
    abrirModal: function(accion) {
      this.accionModal = accion;
      this.dialog = true;
    },
    cerrarModal: function() {
      this.dialog = false;
      this.cropAreaData.id = 0;
      this.cropAreaData.cropAreaPlace = "";
      this.cropAreaData.cropAreaPlanting = 0;
      this.cropAreaData.cropAreaNum = 0;
    },
    confirmarBorrado: function(id) {
      const cropAreas = this.cropsArea.filter(cropArea => cropArea.id !== id);
      this.cropsArea = cropAreas;
      this.dialogEliminar = false;
    }
  }
};
</script>
