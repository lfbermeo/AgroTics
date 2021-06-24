<template>
  <v-stepper
  
    v-model="e6"
    vertical
    
  >
  <v-row class="text-center">      
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Nuevo Muestreo
        </h2>       
      </v-col>        
    </v-row> 
    <v-stepper-step
      :complete="e6 > 1"
      step="1"
    >
      Datos Muestreo
      <small>Formulario Muestreo</small>
    </v-stepper-step>

    <v-stepper-content step="1">
       <v-text-field label="Fecha del Muestreo" type="date"  required></v-text-field>
       <v-text-field label="Observaciones del Muestreo" type="string" required></v-text-field>
       <v-text-field label="Area Plantada m2" type="number" requerided></v-text-field>
      <v-btn
        color="primary"
        @click="e6 = 2"
      >
        Continue
      </v-btn>
      <v-btn color="secondary">
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2"
    >
      Datos análisis de Suelo
      <small>Formulario Datos Suelo</small>
    </v-stepper-step>

    <v-stepper-content step="2">

        <v-text-field label="PH del suelo" type="number" required></v-text-field>
        <v-text-field label="% de MO del suelo" type="number" required></v-text-field>
        <v-text-field label="% de N del suelo " type="number" required></v-text-field>
        <v-text-field label="% de N del suelo " type="number" required></v-text-field>
        <v-text-field label="Fosforo mg/hg " type="number" required></v-text-field>
        <v-text-field label="Potasio Cmol/Kg " type="number" required></v-text-field>
        <v-text-field label="Otros Elementos " type="string" required></v-text-field>
      <v-btn
        color="primary"
        @click="e6 = 3"
      >
        Continue
      </v-btn>
      <v-btn color="secondary">
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 3"
      step="3"
    >
      Datos Climáticos
      <small>Formulario Datos Suelo</small>
    </v-stepper-step>

    <v-stepper-content step="3">

        <v-text-field label="Temperatura °C" type="number" required></v-text-field>
        <v-text-field label="% de Humedad Relativa" type="number" required></v-text-field>
        <v-text-field label="Riego / Lluvia (ml/Planta) " type="number" required></v-text-field>
      
      <v-btn
        color="primary"
        @click="e6 = 4"
      >
        Continue
      </v-btn>
      <v-btn color="secondary">
        Cancel
      </v-btn>
    </v-stepper-content>
        
    <v-stepper-step 
        :complete="e6 > 4"
        step="4"
    >
      Datos aplicación de productos control plagas y enfermedades 
      <small>Formulario de control ded plagas y enfermedades</small>
    </v-stepper-step>
    <v-stepper-content step="4">

        <v-text-field label="Nombre del Producto" type="number" required></v-text-field>
        <v-text-field label="Cantidad" type="number" required></v-text-field>
        <v-text-field label="Fecha Aplicación " type="date" required></v-text-field>
        

      <v-btn
        color="primary"
        @click="e6 = 5"
      >
        Continue
      </v-btn>
      <v-btn 
      color="secondary"
      >
        Cancel
      </v-btn>
    </v-stepper-content>
    <v-stepper-step step="5">
      Listado de Muestreos 
    </v-stepper-step>
    <v-stepper-content step="5">

      <v-row class="text-center">
      <v-col cols="12">
        <v-simple-table fixed-header class="elevation-3">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-center">Id</th>
            <th class="text-center">Nombre Cutivo</th>
            <th class="text-center">Nombre Completo</th>
            <th class="text-center">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="articulo in articulos" :key="articulo.id">
                <td>{{articulo.id}}</td>
                <td>{{articulo.descripcion}}</td>
                <td>{{articulo.precio}}</td>
                <td>{{articulo.stock}}</td>
                <td>
                    <v-btn :to="{name:'EditarCultivo', params:{id:articulo.id}}" fab small color="primary"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn @click.stop="dialog=true" @click="id=articulo.id" fab small color="error"><v-icon>mdi-delete</v-icon></v-btn>
                </td>
            </tr>
         </tbody>   
        </template>
        </v-simple-table>
    </v-col>
    </v-row>
    <!-- ventana de diálogo para eliminar registros -->
    <v-dialog v-model="dialog" max-width="350">
        <v-card>
            <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
            <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn @click="dialog = false">Cancelar</v-btn>
                <v-btn @click="confirmarBorrado(id)" color="error">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- componente snackbar para mostrar mensaje de eliminación -->
    <v-snackbar v-model="snackbar" color="success"> {{textsnack}}
        <template v-slot:action="{attrs}">
            <v-btn text v-bind="attrs" @click="snackbar = false">Cerrar</v-btn>
        </template>
    </v-snackbar>
        

      <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>

      <v-btn
      color="error"
      >
        Guardar
      </v-btn>
        
      <v-btn 
       color="secondary"
      >
        Cancel
      </v-btn>
      
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import axios from 'axios';
export default {
  
    data () {
      return {
        e6: 1,
         dialog:false,
         articulos:null,
         id:null,
         snackbar:false,
        textsnack:'¡Registro Eliminado!'
      }
    },
    methods:{
        obtenerArticulos(){
            axios.get('http://127.0.0.1/apirest/articulos.php')
            .then(r => {
                this.articulos = r.data;
                console.log(this.articulos);
            })
            .catch(function(error){
                console.log(error);
            })

        },
        confirmarBorrado(id){            
            axios.delete('http://127.0.0.1/apirest/articulos.php?id='+id)
            .then(()=>{
                    this.obtenerArticulos();
                    this.dialog = false;
                    this.snackbar = true
            })
            .catch(function(error){
                console.log(error);
            });    
        }
    }
}
  
  
</script>
