<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app clipped>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> AGROTICS </v-list-item-title>
          <v-list-item-subtitle> UTPL </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item :to="{ path: '/' }">
          <v-list-item-action>
            <v-icon>mdi-{{ icons[0] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Índices </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/localizaciones' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Localizaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item :to="{ path: '/tipoParcela' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tipo parcela</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item :to="{ path: '/lugarPlantacion' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Lugares plantación</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-item :to="{ path: '/cultivo' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cultivo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Cultivos </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/vistaAreas' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Áreas cultivos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Muestreos </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/muestreos' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Muestreos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar color="primary">
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="white--text"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="white--text"> AGROTICS </v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-main>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    icons: ["home", "shopping", "email"],
  }),
};
</script>