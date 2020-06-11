<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 md6 lg4>
            <v-card class="elevation-12">
              <v-toolbar color="green darken-3">
                <v-toolbar-title>Logowanie</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="inputValidated" @submit.prevent>
                  <v-text-field
                    v-model="email"
                    prepend-icon="mdi-account"
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    color="green"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    prepend-icon="mdi-lock"
                    label="Hasło"
                    :rules="[rules.required, rules.counter]"
                    :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPass = !showPass"
                    color="green"
                    type="password"
                  ></v-text-field>
                </v-form>
                <div v-if="feedback">
                  <p class="error text-center mb-0">{{ feedback }}</p>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!inputValidated || !email.length > 3 || !password.length > 7"
                  color="green darken-3"
                  @click="login()"
                >
                  <span>Zaloguj</span>
                  <v-icon right>mdi-key</v-icon>
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
      if (this.email && this.password) {
        this.feedback = null;
        this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
      } else {
        this.feedback = "E-mail, oraz hasło muszą zostać wypełnione!";
      }
    }
  }
};
</script>