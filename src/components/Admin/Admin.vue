<template>
  <div>
    <h1 block large class="ma-1 text-center">Witaj {{email}}</h1>
    <v-divider></v-divider>
    <div class="mx-3">
      <v-container class="pa-2">
        <v-layout row wrap justify-space-between>
          <v-flex sm12 md6>
            <admin-button
              :color="'primary'"
              :text="'Zmień hasło'"
              :icon="'mdi-pencil'"
              @click.native="$router.push({ name: 'ChangeAdminPassword' })"
            ></admin-button>
          </v-flex>
          <v-flex sm12 md6>
            <admin-button
              :color="'amber darken-2'"
              :text="'Wyloguj się'"
              :icon="'mdi-logout'"
              @click.native="signOutUser()"
            ></admin-button>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-divider></v-divider>
    <div>
      <h1 block large class="mx-3 mt-3 mb-0 text-center">Panel administracyjny</h1>
      <v-container class="pa-2">
        <v-layout row wrap justify-space-between>
          <v-flex sm12 md6 v-if="showQuestions === false">
            <admin-button
              :color="'primary'"
              :text="'Pokaż wszystkie pytania'"
              :icon="'mdi-view-list'"
              @click.native="showQuestions = !showQuestions"
            ></admin-button>
          </v-flex>
          <v-flex sm12 md6 v-else>
            <admin-button
              :color="'primary'"
              :text="'Ukryj pytania'"
              :icon="'mdi-eye-off'"
              @click.native="showQuestions = !showQuestions"
            ></admin-button>
          </v-flex>
          <v-flex sm12 md6>
            <admin-button
              :color="'primary'"
              :text="'Dodaj pytanie'"
              :icon="'mdi-plus-circle'"
              @click.native="$router.push({ name: 'AddQuestion' })"
            ></admin-button>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <admin-questions v-if="showQuestions"></admin-questions>
    <goTop></goTop>
  </div>
</template>

<script>
/* eslint-disable no-console */
const AdminQuestions = () =>
  import(/* webpackChunkName: "AdminQuestions" */ "./AdminQuestions");
const AdminButton = () =>
  import(/* webpackChunkName: "AdminQuestions" */ "./AdminButton");
const goTop = () => import(/* webpackChunkName: "goTop" */ "../Tools/goTop");
export default {
  components: {
    AdminQuestions,
    AdminButton,
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
      return this.$store.getters.user !== null
        ? this.$store.getters.user.email
        : "Loading...";
    }
  }
};
</script>