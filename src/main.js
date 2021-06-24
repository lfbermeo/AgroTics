import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

//importamos vue-router
import VueRouter from 'vue-router';

//importamos nuestros componentes
import Inicio from './components/Inicio';
import ListarCultivo from './components/ListarCultivo';
import CrearCultivo from './components/CrearCultivo';
import EditarCultivo from './components/EditarCultivo';
import ListarInver from './components/ListarInver';
import CrearInver from './components/CrearInver';
import EditarInver from './components/EditarInver';
import Contacto from './components/Contacto';
import VistaAreas from './views/VistaAreas';
import VistaLocalizaciones from './views/VistaLocalizaciones';
import VistaParcela from './views/VistaParcela';
import VistaLugar from './views/VistaLugar';
import VistaCultivo from './views/VistaCultivo';
import VistaAreaCultivo from './views/VistaAreaCultivo';
//creamos nuestros componentes
Vue.component('Inicio', Inicio);
Vue.component('ListarCultivo', ListarCultivo);
Vue.component('CrearCultivo', CrearCultivo);
Vue.component('EditarCultivo', EditarCultivo);
Vue.component('ListarInver', ListarInver);
Vue.component('CrearInver', CrearInver);
Vue.component('EditarInver', EditarInver);
Vue.component('Contacto', Contacto);
Vue.component('VistaAreas', VistaAreas);
Vue.component('VistaLocalizaciones', VistaLocalizaciones);
Vue.component('VistaParcela', VistaParcela);
Vue.component('VistaLugar', VistaLugar);
Vue.component('VistaCultivo', VistaCultivo);
Vue.component('VistaAreaCultivo', VistaAreaCultivo);
//uso de vue-router
Vue.use(VueRouter);

//definimos las rutas
const routes = [
  {path:'/', component:Inicio},
  {path:'/inicio',component:Inicio},
  {path:'/cultivos', component:ListarCultivo},
  {path:'/crearcul', component:CrearCultivo, name:'CrearCultivo'},
  {path:'/editarcul/:id', component:EditarCultivo, name:'EditarCultivo'},
  {path:'/inver', component:ListarInver},
  {path:'/crearin', component:CrearInver, name:'CrearInver'},
  {path:'/editarin', component:EditarInver, name:'EditarInver'},
  {path:'/contacto',component:Contacto},
  {path:'/redes',component:Contacto},
  {path:'/lugar-cultivo/:idArea', component:VistaAreas, props:true},
  {path:'/localizaciones', component:VistaLocalizaciones},
  {path:'/tipoParcela', component:VistaParcela},
  {path:'/lugarPlantacion', component:VistaLugar},
  {path:'/cultivo', component:VistaCultivo},
  {path:'/vistaAreas', component:VistaAreaCultivo}

]

//crearmos el objeto router
const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

