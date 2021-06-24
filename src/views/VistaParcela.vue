<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Tipo Parcela</h2>
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
              <span class="text-h5">{{ accionModal }} tipo parcela</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre lugar o lote"
                      required
                      v-model="placeData.placeName"
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
              <v-btn color="blue darken-1" text @click="guardarPlace">
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
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="place in places" :key="place.id">
                <td>{{ place.id }}</td>
                <td>{{ place.placeName }}</td>
                <td>
                  <v-btn
                    @click="editarRegistro(place.id)"
                    fab
                    x-small
                    color="info"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="dialogEliminar = true"
                    @click="idEliminar = place.id"
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
  name: "vistaParcela",
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      accionModal: "Nuevo",
      idEliminar: 0,
      places: [
        {
          id: 1,
          placeName: "Invernadero 1",
        },
      ],
      placeData: {
        placeName: "",
        id: 0,
      },
      snackbar: false,
      textsnack: "",
    };
  },
  methods: {
    guardarPlace: function () {
      this.dialog = false;
      this.placeData.id = this.places[this.places.length - 1].id + 1;
      this.places.push(Object.assign({}, this.placeData));
      this.placeData.placeName = "";
      this.placeData.id = 0;
    },
    editarRegistro: function (id) {
      const place = this.places.filter(
        (place) => place.id == id
      )[0];
      this.placeData.id = place.id;
      this.placeData.placeName = place.placeName;
      this.abrirModal("Editar");
    },
    abrirModal: function (accion) {
      this.accionModal = accion;
      this.dialog = true;
    },
    cerrarModal: function () {
      this.dialog = false;
      this.plantingData.id = 0;
      this.plantingData.placeName = "";
    },
    confirmarBorrado: function (id) {
      const places = this.places.filter((place) => place.id !== id);
      this.places = places;
      this.dialogEliminar = false;
    },
  },
};
</script>