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
                <v-form @submit.prevent="login()">
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    label="Email"
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
                <div v-if="feedback">
                  <p class="error text-xs-center mb-0">{{ feedback }}</p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-3" @click="login()">
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
/* eslint-disable no-console */
import firebase from "../../firebase/init";
export default {
  name: "AdminLogin",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.feedback = null;
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.commit('changeUser', user)
            this.$router.push({ name: "Admin" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "E-mail, oraz hasło muszą zostać wypełnione!";
      }
    }
  }
};
</script>