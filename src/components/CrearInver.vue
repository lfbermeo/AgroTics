<template>
    <v-container>
     <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Ingresar Nuevo Invernadero/Parcela</h1>       
      </v-col>     
    </v-row>
    <v-row>
    <v-col>
        <v-row justify="center">
             <v-col cols="12" sm="10" md="8" lg="6">
                    <form v-on:submit.prevent="guardarArticulo()">
                        <v-text-field v-model="articulo.descripcion"
                                label="Ubicación"
                                outlined
                                required   
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Fecha de muestreo"
                                outlined
                                required        
                        ></v-text-field>
                        <v-subheader>Datos Ubicación</v-subheader>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Lugar/Lote"
                                outlined
                                required        
                        ></v-text-field>
                        <v-text-field
                                v-model="articulo.precio"        
                                label="Área sembrada"
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
    name:'CrearInver',
    data(){
        return{
            articulo:{
                descripcion:'',
                precio:'',
                stock:''
            }
        };
    },
    methods:{
        guardarArticulo(){
            var router = this.$router;
           const formData = new FormData();
           formData.append('descripcion',this.articulo.descripcion);
           formData.append('precio',this.articulo.precio);
           formData.append('stock',this.articulo.stock);
           axios.post('http://127.0.0.1/apirest/articulos.php',formData)
           .then(()=>{
               router.push('/inver');
           })
           .catch(function(error){
        console.log(error);
            });
        }
    }
}
</script>