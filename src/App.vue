<template>
  <v-app id="app" :dark="$store.getters.darkMode">
    <Navbar></Navbar>
    <v-content>
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
      <v-btn flat outline @click="snackbar = false">
        <span>Zamknij</span>
        <v-icon right>close</v-icon>
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

<style>
.dont-break-out {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin-bottom: 0px;
}
.v-messages {
  min-height: 0px;
}
</style>