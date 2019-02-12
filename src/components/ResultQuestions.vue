<template>
  <div>
    <h1 block large class="ma-1 text-xs-center">Podgląd poprawności odpowiedzi</h1>
    <v-divider></v-divider>
    <v-container class="py-1 px-0">
      <v-layout row wrap justify-space-around>
        <v-flex xs12 sm6 lg4 v-for="(Question, index) in Questions" :key="Question.Id">
          <div v-if="index < 30">
            <v-card class="light-grey darken-3 ma-2">
              <v-card-title class="pa-3">
                <div>
                  <h3 class="headline mb-0">Pytanie {{index+1}}/30</h3>
                  <div>{{Question.Question}}</div>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <div v-if="Question.Textarea" class="pa-2" style="border: 1px dashed;">
                <p
                  class="ma-0 pa-0"
                  v-for="(row, index2) in prepareTextArea(Question.Textarea)"
                  :key="index2"
                >{{row}}</p>
              </div>
              <div v-if="Question.Image">
                <img :src="Question.Image">
              </div>
              <div class="px-3 pt-3 pb-0">
                <v-checkbox v-model="Answers[index].Ans1" disabled class="ma-0 pa-0 dont-break-out">
                  <span
                    slot="label"
                    :class="Question.GoodAns[0] ? 'green darken-1' : 'red darken-2'"
                  >Odpowiedź A: {{Question.Ans1}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans2" disabled class="ma-0 pa-0 dont-break-out">
                  <span
                    slot="label"
                    :class="Question.GoodAns[1] ? 'green darken-1' : 'red darken-2'"
                  >Odpowiedź B: {{Question.Ans2}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans3" disabled class="ma-0 pa-0 dont-break-out">
                  <span
                    slot="label"
                    :class="Question.GoodAns[2] ? 'green darken-1' : 'red darken-2'"
                  >Odpowiedź C: {{Question.Ans3}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans4" disabled class="ma-0 pa-0 dont-break-out">
                  <span
                    slot="label"
                    :class="Question.GoodAns[3] ? 'green darken-1' : 'red darken-2'"
                  >Odpowiedź D: {{Question.Ans4}}</span>
                </v-checkbox>
              </div>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ResultQuestions",
  props: ["Questions", "Answers"],
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    }
  }
};
</script>

<style scoped>
.dont-break-out {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}
</style>
