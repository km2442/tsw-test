<template>
  <div class="ma-3">
    <div>
      <v-card class="elevation-12 pb-1">
        <v-toolbar color="green darken-3">
          <v-spacer></v-spacer>
          <v-toolbar-title wrap>Zmień hasło dla {{$store.getters.user.email}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-form v-model="inputValidated" @submit.prevent="changePassword()">
            <v-divider></v-divider>
            <v-text-field
              v-model="newPasswd"
              prepend-icon="mdi-lock"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              label="Nowe hasło"
              :rules="[rules.required, rules.counter]"
              color="green"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="repeatPasswd"
              prepend-icon="mdi-lock"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
              label="Powtórz nowe hasło"
              :rules="[rules.required, rules.counter, rules.samePasswd]"
              color="green"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <div v-if="feedback" class="mx-3">
          <p class="error text-center">{{ feedback }}</p>
        </div>
      </v-card>
    </div>
    <div>
      <v-container class="pa-1">
        <v-layout row wrap justify-space-between>
          <v-flex xs12 md6 class="my-2 px-2" @click="changePassword()">
            <v-btn
              block
              :disabled="!inputValidated || !newPasswd.length > 7 || !repeatPasswd.length > 7"
              rounded
              color="green darken-3"
            >
              <span>Zmień hasło</span>
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 md6 class="my-2 px-2">
            <v-btn block rounded color="red" router :to="{name: 'Admin'}">
              <span>Anuluj zmianę hasła</span>
              <v-icon right>mdi-cancel</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValidated: null,
      newPasswd: "",
      repeatPasswd: "",
      show1: false,
      show2: false,
      feedback: null,
      rules: {
        required: value => !!value || "Pole wymagane.",
        counter: value => value.length >= 8 || "Minimum 8 znaków",
        samePasswd: value =>
          value == this.newPasswd || "Hasła nie są identyczne"
      }
    };
  },
  methods: {
    changePassword() {
      this.feedback = null;
      this.$store.dispatch('changeUserPassword', this.newPasswd);
    }
  }
};
</script>
