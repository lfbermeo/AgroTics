<template>
<v-container>
     <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Formulario de EDICIÓN de cultivo</h1>       
      </v-col>     
    </v-row>
    <v-row>
    <v-col>
        <v-row justify="center">
             <v-col cols="12" sm="10" md="8" lg="6">
                    <form v-on:submit.prevent="guardarArticulo()">
                        <v-subheader>Datos cultivo</v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Planta/especie"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Nombre científico"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Variedad"
                                outlined
                                required        
                        ></v-text-field>
                        <v-subheader>Datos fenológicos del cultivo</v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Germinación/Prendimiento"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Altura(cm)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Díametro"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Número de racimos"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Número flores/racimo"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Número flores totales planta"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Número frutos/racimo"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Número frutos totales planta"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Longitud fruto (cm)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Diametro fruto (cm)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Peso del fruto (g)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Producción/planta (kg)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-subheader>Datos de análisis del suelo</v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="pH Suelo"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="MO"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Nitrógeno (%)"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Fósforo (mg/hg)"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Potasio (Cmol/kg)"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Otros elementos"
                                outlined
                                required        
                        ></v-text-field>
                        <v-subheader>Datos climáticos</v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Temperatura (°C)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Humedad relativa (%)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Riego/lluvia (mL/planta)"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-subheader>Datos de aplicación de fertilizante </v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Fertilización/fertilizante/abono"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Cantidad"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Fechas de aplicación de fertilizante"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                         <v-subheader>Datos aplicación de productos control plagas y enfermedades </v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Control de plagas y enfermedades/poducto"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Cantidad"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Fechas de aplicación"
                                type="number"
                                outlined
                                required        
                        ></v-text-field>
                            <v-card-actions>
                                <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>      
                            </v-card-actions>
                    </form>
             </v-col>
        </v-row>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name:'editarArticulo',
    mounted(){
      this.id = this.$route.params.id;
      console.log(this.$route);
      axios.get('http://127.0.0.1/apirest/articulos.php?id='+this.id)
      .then(r =>{
        this.articulo = r.data;
      })
      .catch(function(error){
        console.log(error);
      });
    },
    data(){
      return{
        id:null,
        articulo:{
          descripcion:'',
          precio:'',
          stock:''
        }
      }
    },
    methods:{
      guardarArticulo(){
         var router =  this.$router;
        axios.put('http://127.0.0.1/apirest/articulos.php?id='+this.id+'&descripcion='+this.articulo.descripcion+'&precio='+this.articulo.precio+'&stock='+this.articulo.stock)
        .then(function(){
           router.push('/articulos'); 
        })
        .catch(function(error){
        console.log(error);
        });
      }
    }
}
</script>