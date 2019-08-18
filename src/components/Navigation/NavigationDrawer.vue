<template>
  <div>
    <v-navigation-drawer app right disable-resize-watcher v-model="drawer" width="300px">
      <v-toolbar text dark class="px-3 blue-grey darken-2" height="64px">
        <v-list class="py-0">
          <v-list-item @click="drawer = !drawer">
            <v-list-item-content>
              <v-list-item-title>Zamknij</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large>mdi-close</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-toolbar>
      <!-- Menu -->
      <v-list class="pa-3">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          @click="drawer = !drawer"
        >
          <v-list-item-content>
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon large class="primary--text">{{link.icon}}</v-icon>
          </v-list-item-action>
        </v-list-item>
        <!-- Admin Menu -->
        <div v-if="auth">
          <v-divider></v-divider>
          <h3 class="mt-2 mb-0 text-center">{{$store.getters.user.email}}</h3>
          <v-list-item router :to="{name: 'Admin'}" @click="drawer = !drawer">
            <v-list-item-content>
              <v-list-item-title>Panel administracyjny</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large class="primary--text">mdi-account</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-list-item @click="signOutUser()">
            <v-list-item-content>
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon large class="primary--text">mdi-logout</v-icon>
            </v-list-item-action>
          </v-list-item>
        </div>
        <!-- Settings -->
        <v-divider class="mt-3"></v-divider>
        <h3 class="mt-2 mb-0 text-center">Ustawienia</h3>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ciemny motyw</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch color="primary" v-model="darkMode"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      links: [
        { icon: "mdi-view-dashboard", text: "Strona główna", route: "/" },
        {
          icon: "mdi-ballot",
          text: "Instrukcja do testu",
          route: "/instruction"
        },
        {
          icon: "mdi-format-list-bulleted-square",
          text: "Test",
          route: "/test"
        }
      ]
    };
  },
  methods: {
    signOutUser() {
      this.drawer = !this.drawer;
      this.$store.dispatch("logout");
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.navDrawer;
      },
      set(value) {
        this.$store.dispatch("setNavDrawerState", value);
      }
    },
    darkMode: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        VueCookies.set("Theme", value);
      }
    },
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>