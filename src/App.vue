<template>
  <v-app dark>
    <v-content>
      <Navbar/>
      <router-view/>
      <Footer/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style scoped>
body {
  background-color: #424242;
}
</style>

