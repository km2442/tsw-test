<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 lg6 xl4>
            <v-card class="elevation-12">
              <v-toolbar color="green darken-3">
                <v-toolbar-title class="font-weight-bold">Zaloguj się</v-toolbar-title>
              </v-toolbar>
              <v-form v-model="inputValidated" @submit.prevent="login()">
                <v-card-text class="pb-0">
                  <v-text-field
                    outlined
                    v-model="email"
                    prepend-icon="mdi-account"
                    label="E-mail"
                    :rules="[rules.required, rules.email]"
                    color="green"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    label="Hasło"
                    :rules="[rules.required, rules.counter]"
                    color="green"
                    :type="showPass ? 'text' : 'password'"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    x-large
                    :disabled="!inputValidated || !email.length >= 5 || !password.length >= 8"
                    color="green darken-3"
                    type="submit"
                  >
                    <span class="pr-2 text-h5">Zaloguj</span>
                    <v-icon large>mdi-key</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { constants } from "fs";
/* eslint-disable no-console */
export default {
  data() {
    return {
      inputValidated: false,
      email: "",
      password: "",
      feedback: null,
      showPass: false,
      rules: {
        required: value => !!value || "Pole wymagane",
        counter: value => value.length >= 8 || "Minimum 8 znaków",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Niepoprawny e-mail";
        }
      }
    };
  },
  methods: {
    login() {
      this.feedback = null;
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>