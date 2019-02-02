<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6 md5 lg4>
            <v-card class="elevation-12">
              <v-toolbar color="green darken-3">
                <v-toolbar-title>Logowanie</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login"
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    color="green"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    label="Hasło"
                    color="green"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-3">
                  <span>Zaloguj</span>
                  <v-icon right>vpn_key</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      login: null,
      password: null
    };
  }
};
</script>