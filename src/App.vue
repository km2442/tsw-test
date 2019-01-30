<template>
  <v-app :dark="darkMode">
    <v-content>
      <Navbar @changeTheme="setTheme($event)"></Navbar>
      <router-view/>
      <Footer/>
    </v-content>
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
