<template>
  <div>
    <v-navigation-drawer app right disable-resize-watcher v-model="drawer">
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
      <!-- Menu -->
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
        <!-- Admin Menu -->
        <div v-if="$store.getters.user !== null && $store.getters.user !== undefined">
          <v-divider></v-divider>
          <h3 class="mt-2 mb-0 text-xs-center">{{$store.getters.user.user.email}}</h3>
          <v-list-tile router :to="{name: 'Admin'}" @click="drawer = !drawer">
            <v-list-tile-content>
              <v-list-tile-title>Panel administracyjny</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon large class="primary--text">account_box</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="signOutUser()">
            <v-list-tile-content>
              <v-list-tile-title>Wyloguj</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon large class="primary--text">logout</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </div>
        <!-- Settings -->
        <v-divider class="mt-3"></v-divider>
        <h3 class="mt-2 mb-0 text-xs-center">Ustawienia</h3>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Ciemny motyw</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch color="primary" v-model="darkMode"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
import VueCookies from "vue-cookies";
export default {
  name: "NavigationDrawer",
  data() {
    return {
      links: [
        { icon: "dashboard", text: "Strona główna", route: "/" },
        { icon: "ballot", text: "Instrukcja do testu", route: "/instruction" },
        { icon: "format_list_bulleted", text: "Test", route: "/test" }
      ]
    };
  },
  methods: {
    signOutUser() {
      this.drawer = !this.drawer;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Index" });
          this.$store.commit("changeUser", undefined);
        });
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