import VueRouter from "vue-router";

// Importar los componentes
// import ListarCultivo from "./components/ListarCultivo";
// import CrearCultivo from "./components/CrearCultivo";
// import EditarCultivo from "./components/EditarCultivo";
// import ListarInver from "./components/ListarInver";
// import CrearInver from "./components/CrearInver";
// import EditarInver from "./components/EditarInver";
// import Contacto from "./components/Contacto";
// import VistaAreas from "./views/VistaAreas";

import Inicio from "./views/Inicio";

import ViewLocations from "./views/ViewLocations";
import ViewPlaceTypes from "./views/ViewPlaceTypes";
import ViewPlantationPlaces from "./views/ViewPlantationPlaces";
import ViewCrops from "./views/ViewCrops";
import VistaAreaCultivo from "./views/VistaAreaCultivo";

import Nuevo_Muestreo from "./views/Nuevo_Muestreo";

const routes = [
  { path: "/", name: "home", component: Inicio },

  { path: "/locations", name: "locations", component: ViewLocations },
  { path: "/placeTypes", name: "placeTypes", component: ViewPlaceTypes },
  {
    path: "/plantationPlaces",
    name: "plantationPlaces",
    component: ViewPlantationPlaces
  },
  { path: "/crops", name: "crops", component: ViewCrops },

  { path: "/plantedAreas", name: "plantedAreas", component: VistaAreaCultivo },
  { path: "/samplings", name: "samplings", component: Nuevo_Muestreo }

  // { path: "/cultivos", component: ListarCultivo },
  // { path: "/crearcul", component: CrearCultivo, name: "CrearCultivo" },
  // { path: "/editarcul/:id", component: EditarCultivo, name: "EditarCultivo" },
  // { path: "/inver", component: ListarInver },
  // { path: "/crearin", component: CrearInver, name: "CrearInver" },
  // { path: "/editarin", component: EditarInver, name: "EditarInver" },
  // { path: "/contacto", component: Contacto },
  // { path: "/redes", component: Contacto },
  // { path: "/lugar-cultivo/:idArea", component: VistaAreas, props: true },

  // { path: "/localizaciones", component: VistaLocalizaciones },
  // { path: "/tipoParcela", component: VistaParcela },
  // { path: "/lugarPlantacion", component: VistaLugar },
  // { path: "/cultivo", component: VistaCultivo },
  // { path: "/vistaAreas", component: VistaAreaCultivo },

  // { path: "/muestreo", component: Nuevo_Muestreo }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
