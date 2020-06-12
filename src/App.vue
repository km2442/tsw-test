<template>
  <v-app id="app">
    <Navbar></Navbar>
    <v-main id="content">
      <router-view />
    </v-main>
    <Footer />
    <!-- Wyskakujący komunikat -->
    <v-snackbar
      v-model="snackbar"
      :color="$store.getters.snackbarColor"
      multi-line
      :timeout="$store.getters.snackbarTimeout"
    >
      {{$store.getters.snackbarMsg}}
      <v-btn text outlined @click="snackbar = false">
        <span>Zamknij</span>
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
const Navbar = () => import(/* webpackChunkName: "Navigation" */ "./components/Navigation/Navbar");
const Footer = () => import(/* webpackChunkName: "Navigation" */ "./components/Navigation/Footer");

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters.snackbarState;
      },
      set(value) {
        this.$store.dispatch("setSnackbarState", value);
      }
    }
  },
  created() {
    this.$store.dispatch('tryAutoLogin');
  }
};
</script>