<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">Lugares de plantación</h2>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <!-- START Data Table -->
        <v-data-table
          :headers="headers"
          :items="plantingPlaces"
          :items-per-page="5"
          :loading="plantingPlaces.length === 0"
          loading-text="Cargando... Por favor espere"
          class="elevation-1"
        >
          <!-- START Slot Top -->
          <template slot="top">
            <v-toolbar flat>
              <v-toolbar-title
                >{{ countPlantingPlaces }} Lugares de
                plantación</v-toolbar-title
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

              <!-- START Delete Dialog Form -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">
                    <v-spacer></v-spacer>
                    ¿Desea eliminar esta lugar de plantación?
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

export default {
  name: "ViewPlantingPlaces",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        plantingPlaceId: 0,
        placeName: "",
        availableArea: 0,
        status: "empty",
        locationId: 0,
        placeTypeId: 0,
      },
      defaultItem: {
        plantingPlaceId: 0,
        placeName: "",
        availableArea: 0,
        status: "empty",
        locationId: 0,
        placeTypeId: 0,
      },
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: true,
          value: "plantingPlaceId",
        },
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "placeName",
        },
        {
          text: "Area disponible",
          align: "start",
          sortable: true,
          value: "availableArea",
        },
        {
          text: "Estado",
          align: "start",
          sortable: true,
          value: "status",
        },
        {
          text: "Ubicación",
          align: "start",
          sortable: true,
          value: "location.locationName",
        },
        {
          text: "Tipo",
          align: "start",
          sortable: true,
          value: "placeType.placeTypeName",
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
    plantingPlaces() {
      return this.$store.state.plantingPlaces.plantingPlaces;
    },
    placeTypes() {
      return this.$store.state.placeTypes.placeTypes;
    },
    locations() {
      return this.$store.state.locations.locations;
    },
    countPlantingPlaces() {
      return this.$store.getters["plantingPlaces/count"];
    },
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo lugar de plantación"
        : "Editar lugar de plantación";
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
      this.getPlantingPlaces();
      this.getPlaceTypes();
      this.getLocations();
    },
    editItem(item) {
      // Action Edit
      this.editedIndex = item.plantingPlaceId;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.plantingPlaceId;
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      // Action delete
      this.$store.dispatch(
        "plantingPlaces/deletePlantingPlace",
        this.editedItem
      );
      this.closeDelete();
    },
    save() {
      console.log(this.editedIndex);
      if (this.editedIndex > -1) {
        // Action Edit
        this.$store.dispatch(
          "plantingPlaces/editPlantingPlace",
          this.editedItem
        );
      } else {
        // Action save
        this.$store.dispatch(
          "plantingPlaces/savePlantingPlace",
          this.editedItem
        );
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
    getPlantingPlaces() {
      return this.$store.dispatch("plantingPlaces/getPlantingPlaces");
    },
    getPlaceTypes() {
      return this.$store.dispatch("placeTypes/getPlaceTypes");
    },
    getLocations() {
      return this.$store.dispatch("locations/getLocations");
    },
  },
  // methods: {
  //   // Desde aqui
  //   selectPlantingPLace: function (id) {
  //     const planting = this.plantings.find(
  //       (planting) => planting.plantingPlaceId == id
  //     );
  //     this.plantingData.plantingPlaceId = planting.plantingPlaceId;
  //     this.plantingData.placeName = planting.placeName;
  //     this.plantingData.availableArea = planting.availableArea;
  //     this.plantingData.status = planting.status;
  //     this.plantingData.locationId = planting.locationId;
  //     this.plantingData.placeTypeId = planting.placeTypeId;

  //     this.showModal("Editar");
  //   },
  //   showModal: function (action) {
  //     this.accionModal = action;
  //     this.dialog = true;
  //   },
  //   dismissModal: function () {
  //     this.dialog = false;
  //     this.resetData();
  //   },
  //   getPlantingPlaces: async function () {
  //     const response = await Axios.get(this.$API_URI + "plantingPlaces");
  //     console.log(response.data);

  //     this.plantings = response.data;
  //   },
  //   editOrCreatePlantingPlace: function () {
  //     if (this.accionModal === "Nuevo") {
  //       this.savePlantingPlace();
  //     } else {
  //       this.editPlantingPlace();
  //     }
  //   },
  //   savePlantingPlace: async function () {
  //     try {
  //       const response = await Axios.post(this.$API_URI + "plantingPlaces", {
  //         placeName: this.plantingData.placeName,
  //         availableArea: this.plantingData.availableArea,
  //         locationId: this.plantingData.locationId,
  //         placeTypeId: this.plantingData.placeTypeId,
  //       });
  //       console.log(response);
  //       if (response.status === 200) {
  //         this.dialog = false;
  //         this.resetData();
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     this.getPlantingPlaces();
  //   },
  //   editPlantingPlace: async function () {
  //     const id = this.plantingData.plantingPlaceId;
  //     try {
  //       const response = await Axios.put(
  //         `${this.$API_URI}plantingPlaces/${id}`,
  //         {
  //           placeName: this.plantingData.placeName,
  //           availableArea: this.plantingData.availableArea,
  //           locationId: this.plantingData.locationId,
  //           placeTypeId: this.plantingData.placeTypeId,
  //         }
  //       );
  //       console.log(response);
  //       if (response.status === 200) {
  //         this.dialog = false;
  //         this.resetData();
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //     this.getPlantingPlaces();
  //   },
  //   deletePlantingPlace: async function (id) {
  //     const response = await Axios.delete(
  //       `${this.$API_URI}plantingPlaces/${id}`
  //     );
  //     console.log(response);

  //     if (response.status === 200) {
  //       this.resetData();
  //       this.dialogEliminar = false;
  //       this.getPlantingPlaces();
  //     }
  //   },
  //   convertTime: function (isoDateTime) {
  //     const plantingDate = DateTime.fromISO(isoDateTime);
  //     return plantingDate.toRelative(DateTime.now());
  //   },
  //   resetData: function () {
  //     this.plantingData.plantingPlaceId = 0;
  //     this.plantingData.placeName = "";
  //     this.plantingData.availableArea = 0;
  //     this.plantingData.status = "empty";
  //     this.plantingData.locationId = 0;
  //     this.plantingData.placeTypeId = 0;
  //   },
  //   getPlaceTypes: async function () {
  //     const response = await Axios.get(this.$API_URI + "placeTypes");
  //     // console.log(response.data);

  //     this.placeTypes = response.data;
  //     console.log("PlaceTypes", this.placeTypes);
  //     this.placeTypesOpts = this.placeTypes.map((type) => type.placeTypeName);
  //   },
  //   getLocations: async function () {
  //     const response = await Axios.get(this.$API_URI + "locations");
  //     // console.log(response.data);

  //     this.locations = response.data;
  //     console.log("Locations", this.locations);
  //     this.locationsOpts = this.locations.map(
  //       (location) => location.locationName
  //     );
  //   },
  // },
  // mounted() {
  //   this.getPlantingPlaces();
  //   this.getPlaceTypes();
  //   this.getLocations();
  // },
};
</script>
