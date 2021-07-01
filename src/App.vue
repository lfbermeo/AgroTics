<template>
  <v-app>
    <!-- START Navigation Drawer -->
    <v-navigation-drawer class="deep-purple accent-4" v-model="drawer" dark app>
      <!-- START Navigation Drawer Title -->
      <v-list-item>
        <v-list-item-content>
          <v-img
            alt="Agrook brand"
            class="shrink mr-2"
            contain
            :src="require('./assets/logotipo-white.png')"
            transition="scale-transition"
          />
          <v-list-item-subtitle> UTPL </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- END Navigation Drawer Title -->

      <v-divider></v-divider>

      <!-- START Navigation Drawer Menu -->
      <v-list dense nav>
        <v-list-group
          v-for="route in routes"
          :key="route.title"
          :prepend-icon="route.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="route.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subroute in route.subroutes"
            :key="subroute.title"
            :to="{ path: subroute.path }"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subroute.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Cerrar sesión </v-btn>
        </div>
      </template>
      <!-- END Navigation Drawer Menu -->
    </v-navigation-drawer>
    <!-- END Navigation Drawer -->

    <!-- START App Bar -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true" class="white--text">
      </v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="Agrook Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo.png')"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title class="white--text"> AGROOK </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn href="/" text>
        <span class="mr-2">Inicio</span>
      </v-btn>
    </v-app-bar>
    <!-- END App Bar -->

    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: null,
    icons: ["home", "shopping", "email"],
    routes: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        subroutes: [{ title: "Dashboard", path: "/" }],
      },
      {
        title: "Índices",
        icon: "mdi-book-alphabet",
        subroutes: [
          {
            title: "Ubicaciones",
            path: "/locations",
          },
          {
            title: "Tipo de parcela",
            path: "/placeTypes",
          },
          {
            title: "Lugares de plantación",
            path: "/plantingPlaces",
          },
          {
            title: "Cultivos",
            path: "/crops",
          },
        ],
      },

      {
        title: "Generales",
        icon: "mdi-expand-all",
        subroutes: [
          {
            title: "Áreas cultivos",
            path: "/plantedAreas",
          },
          {
            title: "Muestreos",
            path: "/samplings",
          },
        ],
      },
      {
        title: "Otros",
        icon: "mdi-open-in-new",
        subroutes: [
          { title: "Account", path: "/me", icon: "mdi-account-box" },
          { title: "Admin", path: "/admin", icon: "mdi-gavel" },
        ],
      },
    ],
  }),
};
</script>
