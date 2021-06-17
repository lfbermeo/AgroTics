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
        <v-list-item :to="{ path: '/cultivos' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cultivos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/inver' }">
          <v-list-item-action>
            <v-icon></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Invernaderos/Parcelas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ path: '/contacto' }">
          <v-list-item-action>
            <v-icon>mdi-{{ icons[2] }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contacto</v-list-item-title>
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