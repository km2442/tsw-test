<template>
  <div>
    <div class="mx-3">
      <h1 block large class="ma-3 text-xs-center">Witaj {{$store.getters.user.user.email}}</h1>
      <v-btn block round color="amber darken-2" @click="signOutUser()">
        <span>Wyloguj</span>
        <v-icon right>logout</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <h1 block large class="ma-3 text-xs-center">Panel administracyjny</h1>
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex
          xs-12
          class="mx-3"
          v-if="showQuestions === false"
          @click="showQuestions = !showQuestions"
        >
          <v-btn block round color="green darken-3">
            <span>Pokaż wszystkie pytania</span>
            <v-icon right>edit</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3" v-if="showQuestions" @click="showQuestions = !showQuestions">
          <v-btn block round color="green darken-3">
            <span>Ukryj pytania</span>
            <v-icon right>edit</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3">
          <v-btn block round color="green darken-3" router :to="{name: 'AddQuestion'}">
            <span>Dodaj pytanie</span>
            <v-icon right>add_circle</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <admin-questions v-if="showQuestions"></admin-questions>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "firebase";
const AdminQuestions = () =>
  import(/* webpackChunkName: "AdminQuestions" */ "./AdminQuestions");
export default {
  name: "Admin",
  components: {
    AdminQuestions
  },
  data() {
    return {
      showQuestions: false
    };
  },
  methods: {
    toggleQuestionsVisibility() {
      if (this.showQuestions) {
        this.showQuestions = false;
      } else {
        this.showQuestions = true;
      }
    },
    signOutUser() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Index" });
          this.$store.commit("changeUser", undefined);
        });
    }
  }
};
</script>