<template>
  <div>
    <div class="mx-3">
      <h1 block large class="ma-3 text-center">Witaj {{email}}</h1>
      <v-container class="pa-1">
        <v-layout row wrap justify-space-between>
          <v-flex xs-12 md-6 class="mx-3">
            <v-btn block rounded color="green darken-3" router :to="{name: 'ChangeAdminPassword'}">
              <span>Zmień hasło</span>
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs-12 md-6 class="mx-3">
            <v-btn block rounded color="amber darken-2" @click="signOutUser()">
              <span>Wyloguj</span>
              <v-icon right>mdi-logout</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-divider></v-divider>
    <h1 block large class="ma-3 text-center">Panel administracyjny</h1>
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex
          xs-12
          class="mx-3"
          v-if="showQuestions === false"
          @click="showQuestions = !showQuestions"
        >
          <v-btn block rounded color="green darken-3">
            <span>Pokaż wszystkie pytania</span>
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3" v-else @click="showQuestions = !showQuestions">
          <v-btn block rounded color="green darken-3">
            <span>Ukryj pytania</span>
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3">
          <v-btn block rounded color="green darken-3" router :to="{name: 'AddQuestion'}">
            <span>Dodaj pytanie</span>
            <v-icon right>mdi-plus-circle</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <admin-questions v-if="showQuestions"></admin-questions>
    <goTop></goTop>
  </div>
</template>

<script>
/* eslint-disable no-console */
const AdminQuestions = () =>
  import(/* webpackChunkName: "AdminQuestions" */ "./AdminQuestions");
const goTop = () => import(/* webpackChunkName: "goTop" */ "../Tools/goTop");
export default {
  components: {
    AdminQuestions,
    goTop
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
      this.$store.dispatch("logout");
    }
  },
  computed: {
    email() {
      return this.$store.getters.user !== null ? this.$store.getters.user.email : "Loading...";
    }
  }
};
</script>