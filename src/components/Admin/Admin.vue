<template>
  <div>
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
/* eslint-disable */
const AdminQuestions = () => import(/* webpackChunkName: "AdminQuestions" */ './AdminQuestions');
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
  }
};
</script>