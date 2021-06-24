<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Lugar plantación</h2>
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
              <span class="text-h5">{{ accionModal }} lugar plantación</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre"
                      required
                      v-model="plantingData.plantingName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['Vacío', 'Sembrado', 'Completo']"
                      label="Área sembrado"
                      required
                      v-model="plantingData.plantingArea"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['Parcela', 'Localización']"
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
              <v-btn color="blue darken-1" text @click="cerrarModal">
                Cerrar
              </v-btn>
              <v-btn color="blue darken-1" text @click="guardarPlanting">
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
                <th class="text-center">Tipo</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="planting in plantings" :key="planting.id">
                <td>{{ planting.id }}</td>
                <td>{{ planting.plantingName }}</td>
                <td>{{ planting.plantingArea }}</td>
                <td>{{ planting.plantingType }}</td>
                <td>
                  <v-btn
                    @click="editarRegistro(planting.id)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = planting.id"
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
  name: "vistaLugar",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      plantings: [
        {
          id: 1,
          plantingName: "Invernadero 1",
          plantingArea: "Vacío",
          plantingType: "Localización"
        }
      ],
      plantingData: {
        plantingName: "",
        plantingArea: "",
        plantingType: "",
        id: 0
      },
      snackbar: false,
      textsnack: ""
    };
  },
  methods: {
    guardarPlanting: function() {
      this.dialog = false;
      this.plantingData.id = this.plantings[this.plantings.length - 1].id + 1;
      this.plantings.push(Object.assign({}, this.plantingData));
      this.plantingData.plantingName = "";
      this.plantingData.plantingArea = "";
      this.plantingData.plantingType = "";
      this.plantingData.id = 0;
    },
    editarRegistro: function(id) {
      const planting = this.plantings.filter(planting => planting.id == id)[0];
      this.plantingData.id = planting.id;
      this.plantingData.plantingName = planting.plantingName;
      this.plantingData.plantingArea = planting.plantingArea;
      this.plantingData.plantingType = planting.plantingType;
      this.abrirModal("Editar");
    },
    abrirModal: function(accion) {
      this.accionModal = accion;
      this.dialog = true;
    },
    cerrarModal: function() {
      this.dialog = false;
      this.plantingData.id = 0;
      this.plantingData.plantingName = "";
      this.plantingData.plantingArea = "";
      this.plantingData.plantingType = "";
    },
    confirmarBorrado: function(id) {
      const plantings = this.plantings.filter(planting => planting.id !== id);
      this.plantings = plantings;
      this.dialogEliminar = false;
    }
  }
};
</script>
