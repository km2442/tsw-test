<template>
  <v-app :dark="darkMode">
    <v-content>
      <Navbar @changeTheme="setTheme($event)"></Navbar>
      <router-view/>
    </v-content>
    <Footer/>
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
  data() {
    return {
      darkMode: false
    };
  },
  methods: {
    setTheme(e) {
      this.darkMode = e;
    }
  }
};
</script>
