<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Ubicaciones</h2>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <!-- START Data Table -->
        <v-data-table
          :headers="headers"
          :items="locations"
          :items-per-page="5"
          :loading="locations.length === 0"
          loading-text="Cargando... Por favor espere"
          class="elevation-1"
        >
          <!-- START Slot Top -->
          <template slot="top">
            <v-toolbar flat>
              <v-toolbar-title
                >{{ countLocations }} Ubicaciones</v-toolbar-title
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
                            v-model="editedItem.locationName"
                          ></v-text-field>
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

              <!-- START Delete Dialog Form -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    <v-spacer></v-spacer>
                    ¿Desea eliminar esta ubicación?
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      x-large
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="red darken-1" text @click="deleteItemConfirm"
                      >Eliminar</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- END Delete Dialog Form -->
            </v-toolbar>
          </template>
          <!-- END Slot Top -->

          <!-- START Edit Cells -->
          // eslint-disable-next-line
          <template v-slot:item.updatedAt="{ item }">
            {{ convertTime(item.updatedAt) }}
          </template>

          // eslint-disable-next-line
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <!-- END Edit Cells -->
        </v-data-table>
        <!-- END Data Table -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DateTime } from "luxon";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("locations");

export default {
  name: "ViewLocations",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        locationId: 0,
        locationName: "",
      },
      defaultItem: {
        locationId: 0,
        locationName: "",
      },
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "locationId",
        },
        {
          text: "Ubicación",
          align: "start",
          sortable: true,
          value: "locationName",
        },
        {
          text: "Ult. Actualización",
          align: "start",
          sortable: true,
          value: "updatedAt",
        },
        {
          text: "Acciones",
          align: "start",
          sortable: false,
          value: "actions",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      locations: (state) => state.locations,
    }),
    countLocations() {
      return this.$store.getters["locations/count"];
    },
    formTitle() {
      return this.editedIndex === -1 ? "Nueva ubicación" : "Editar ubicación";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      // Init the data
      this.getLocations();
    },
    editItem(item) {
      // Action Edit
      this.editedIndex = item.locationId;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.locationId;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      // Action delete
      this.$store.dispatch("locations/deleteLocation", this.editedItem);
      this.closeDelete();
    },
    save() {
      console.log(this.editedIndex);
      if (this.editedIndex > -1) {
        // Action Edit
        this.$store.dispatch("locations/editLocation", this.editedItem);
      } else {
        // Action save
        this.$store.dispatch("locations/saveLocation", this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    convertTime(isoDateTime) {
      const locationDate = DateTime.fromISO(isoDateTime);
      return locationDate.toRelative(DateTime.now());
    },
    ...mapActions(["getLocations"]),
  },
};
</script>
