<template>
  <div>
    <h1 block large class="ma-1 text-center">Podgląd poprawności odpowiedzi</h1>
    <v-divider></v-divider>
    <v-container fluid class="py-1 px-0">
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm6 lg4 v-for="(Question, index) in Questions" :key="Question.Id">
          <div v-if="index < 30">
            <v-card class="light-grey darken-3 ma-2">
              <v-card-title class="pt-2 pb-0 px-3 dont-break-out">
                <div>
                  <h3 class="text-h5 mb-0">Pytanie {{index+1}}/30</h3>
                  <div>{{Question.Question}}</div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <div v-if="Question.Textarea" style="border: 1px dashed;" class="pa-1">
                <p
                  class="ma-0 pa-0"
                  v-for="(row, index2) in prepareTextArea(Question.Textarea)"
                  :key="index2"
                >{{row}}</p>
              </div>
              <div v-if="Question.Image" class="pa-1">
                <img :src="Question.Image" />
              </div>
              <div class="pa-2 font-weight-bold">
                <v-checkbox
                  v-model="Answers[index].Ans1"
                  disabled
                  :class="Question.GoodAns[0] ? 'ma-0 pa-0 dont-break-out green darken-1' : 'ma-0 pa-0 dont-break-out red darken-2'"
                >
                  <span slot="label">Odpowiedź A: {{Question.Ans1}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox
                  v-model="Answers[index].Ans2"
                  disabled
                  :class="Question.GoodAns[1] ? 'ma-0 pa-0 dont-break-out green darken-1' : 'ma-0 pa-0 dont-break-out red darken-2'"
                >
                  <span slot="label">Odpowiedź B: {{Question.Ans2}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox
                  v-model="Answers[index].Ans3"
                  disabled
                  :class="Question.GoodAns[2] ? 'ma-0 pa-0 dont-break-out green darken-1' : 'ma-0 pa-0 dont-break-out red darken-2'"
                >
                  <span slot="label">Odpowiedź C: {{Question.Ans3}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox
                  v-model="Answers[index].Ans4"
                  disabled
                  :class="Question.GoodAns[3] ? 'ma-0 pa-0 dont-break-out green darken-1' : 'ma-0 pa-0 dont-break-out red darken-2'"
                >
                  <span slot="label">Odpowiedź D: {{Question.Ans4}}</span>
                </v-checkbox>
              </div>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <goTop></goTop>
  </div>
</template>

<script>
const goTop = () => import(/* webpackChunkName: "goTop" */ "./Tools/goTop");
export default {
  props: ["Questions", "Answers"],
  components: {
    goTop
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    }
  }
};
</script>

<style>
.dont-break-out {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
.v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
  margin-bottom: 0px;
}
.v-messages {
  min-height: 0px;
}
</style>