<template>
  <v-app id="app">
    <Navbar></Navbar>
    <v-content id="content">
      <router-view/>
    </v-content>
    <Footer/>
    <!-- Wyskakujący komunikat -->
    <v-snackbar
      v-model="snackbar"
      :color="$store.getters.snackbarColor"
      multi-line
      :timeout="$store.getters.snackbarTimeout"
    >
      {{$store.getters.snackbarMsg}}
      <v-btn flat outlined @click="snackbar = false">
        <span>Zamknij</span>
        <v-icon right>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";

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
        this.$store.commit("setSnackbarState", value);
      }
    }
  }
};
</script>