<template>
  <nav>
    <v-toolbar dark app color="primary">
      <v-toolbar-side-icon v-if="!drawer" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-side-icon v-if="drawer" @click="drawer = !drawer">
        <v-icon>close</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title wrap class="white--text">Technologie sieci web</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app>
      <v-toolbar flat class="primary px-3">
        <v-list>
          <v-list-tile @click="drawer = !drawer">
            <v-list-tile-action>
              <v-icon large class="white--text">cancel</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">Zamknij</v-list-tile-title>
            </v-list-tile-content>
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
          <v-list-tile-action>
            <v-icon large class="primary--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Strona główna", route: "/" },
        { icon: "format_list_bulleted", text: "Test", route: "/test" },
        { icon: "account_box", text: "Panel administracyjny", route: "/admin" }
      ]
    };
  }
};
</script>
