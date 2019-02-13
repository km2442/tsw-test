<template>
  <nav>
    <v-toolbar app class="white--text blue-grey darken-2" height="56px">
      <v-img
        src="logo.png"
        max-height="90%"
        max-width="125px"
        @click="$router.push('/')"
        style="cursor: pointer;"
      ></v-img>
      <v-toolbar-title
        class="display-1 text-uppercase font-weight-black"
        @click="$router.push('/')"
        style="cursor: pointer;"
      >Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="white--text" right v-if="!drawer" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-side-icon class="white--text" right v-if="drawer" @click="drawer = !drawer">
        <v-icon>close</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <NavDrawer/>
  </nav>
</template>

<script>
import VueCookies from "vue-cookies";
import firebase from "firebase";
const NavDrawer = () =>
  import(/* webpackChunkName: "NavigationDrawer" */ "./NavigationDrawer");
export default {
  name: "Navbar",
  components: {
    NavDrawer
  },
  created() {
    VueCookies.config("30d");
    if (VueCookies.isKey("Theme")) {
      this.darkMode = VueCookies.get("Theme") === "true";
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.navDrawer;
      },
      set(value) {
        this.$store.commit("setNavDrawerState", value);
      }
    },
    darkMode: {
      get() {
        return this.$store.getters.darkMode;
      },
      set(value) {
        this.$store.commit("setDarkTheme", value);
        VueCookies.set("Theme", value);
      }
    }
  }
};
</script>