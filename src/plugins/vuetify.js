// import "@fortawesome/fontawesome-free/css/all.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/lib/locale/es";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

// light: {
//   primary: "#007BFF",
//   secondary: "#424242",
//   accent: "#82B1FF",
//   error: "#FF5252",
//   info: "#2196F3",
//   success: "#4CAF50",
//   warning: "#FFC107",
// },

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.lightGreen.base,
        secondary: colors.deepOrange.base,
        accent: colors.teal.base,
        error: colors.orange.base,
        info: colors.amber.base,
        success: colors.lightBlue.base,
        warning: colors.green.base,
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
  icons: {
    // iconfont: "fa",
    iconfont: "mdi",
    // iconfont: "mdiSvg",
  },
});
