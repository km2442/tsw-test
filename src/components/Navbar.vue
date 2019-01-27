<template>
  <nav>
    <v-toolbar app class="white--text blue-grey darken-2" height="56px">
      <v-img src="logo.png" max-height="90%" max-width="125px"></v-img>
      <v-toolbar-title class="display-1 text-uppercase font-weight-black">Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon class="white--text" right v-if="!drawer" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-side-icon class="white--text" right v-if="drawer" @click="drawer = !drawer">
        <v-icon>close</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer app right v-model="drawer">
      <v-toolbar flat class="px-3 blue-grey darken-2" height="56px">
        <v-list class="py-0">
          <v-list-tile class="white--text" @click="drawer = !drawer">
            <v-list-tile-content>
              <v-list-tile-title>Zamknij</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon class="white--text" large>cancel</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pa-3">
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          @click="drawer = !drawer"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon large class="primary--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider class="mt-3"></v-divider>
        <h3 class="mt-2 mb-0 text-xs-center">Ustawienia</h3>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Ciemny motyw</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch color="primary" v-model="darkMode" @change="changeTheme()"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      darkMode: false,
      links: [
        { icon: "dashboard", text: "Strona główna", route: "/" },
        { icon: "ballot", text: "Instrukcja do testu", route: "/instruction" },
        { icon: "format_list_bulleted", text: "Test", route: "/test" }
      ]
    };
  },
  methods: {
    changeTheme() {
      this.$emit("changeTheme", this.darkMode);
      this.setThemeCookie();
    },
    setThemeCookie() {
      VueCookies.set("Theme", this.darkMode);
    }
  },
  created() {
    VueCookies.config("30d");
    if (VueCookies.isKey("Theme")) {
      this.darkMode = VueCookies.get("Theme") == "true";
      this.changeTheme();
    }
  }
};
</script>