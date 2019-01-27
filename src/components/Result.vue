<template>
  <div class="ma-3">
    <v-card class="light-blue darken-3">
      <h3 class="display-2 py-3 text-xs-center text-uppercase">Wynik testu</h3>
      <v-divider></v-divider>
      <div class="px-4">
        <p class="headline text-xs-center">
          Udało Ci się uzyskać
          <b>{{points}} punkt(ów)</b> z testu.
        </p>
        <p :class="color">
            Gdyby to był egzamin, otrzymał byś ocenę 
            <span>{{mark}}</span>
        </p> 
      </div>
      <v-divider></v-divider>
      <div>
        <v-container class="pa-1">
          <v-layout row wrap justify-space-between>
            <v-flex xs-12 md-6 class="mx-3">
              <v-btn
                large
                block
                round
                class="green"
                router
                :to="{name: 'Index'}"
              >Powrót na stronę główną</v-btn>
            </v-flex>
            <v-flex xs-12 md-6 class="mx-3">
              <v-btn
                large
                block
                round
                class="green"
                router
                :to="{name: 'Test'}"
              >Rozpocznij kolejny Test</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["points"],
  data() {
      return {
          mark: null,
          color: null
      }
  },
  methods: {
    getMark(points) {
        if (points < 18) {return {mark: "2.0", color: "red"}}
        else if(points < 20) {return {mark: "3.0", color: "orange"}}
        else if(points < 23) {return {mark: "3.5", color: "amber"}}
        else if(points < 26) {return {mark: "4.0", color: "yellow"}}
        else if(points < 29) {return {mark: "4.5", color: "light-green"}}
        else{return {mark: "5.0", color: "green"}}
    }
  },
  mounted() {
      var res = this.getMark(this.points);
      this.mark = res.mark;
      this.color = res.color + " headline text-xs-center";
  }
};
</script>