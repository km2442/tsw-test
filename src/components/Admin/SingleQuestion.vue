<template>
  <div>
    <v-card class="light-grey darken-3 ma-2">
      <v-card-title class="pt-2 pb-0 px-3">
        <div>
          <h3 class="headline mb-0">Pytanie {{index + 1}}</h3>
          <div>{{Question.Question}}</div>
        </div>
      </v-card-title>
      <div class="ma-2">
        <div v-if="Question.Textarea" style="border: 1px dashed;" class="pa-1">
          <p
            class="ma-0 pa-0"
            v-for="(row, index) in prepareTextArea(Question.Textarea)"
            :key="index"
          >{{row}}</p>
        </div>
        <div v-if="Question.Image" class="pa-1">
          <img :src="Question.Image" />
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-3">
        <v-checkbox
          disabled
          :label="``"
          v-model="Question.GoodAns[0]"
          class="ma-0 pa-0 dont-break-out"
        >
          <span slot="label" class="mb-0">Odpowiedź A: {{Question.Ans1}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox
          disabled
          :label="``"
          v-model="Question.GoodAns[1]"
          class="ma-0 pa-0 dont-break-out"
        >
          <span slot="label">Odpowiedź B: {{Question.Ans2}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox
          disabled
          :label="``"
          v-model="Question.GoodAns[2]"
          class="ma-0 pa-0 dont-break-out"
        >
          <span slot="label">Odpowiedź C: {{Question.Ans3}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox
          disabled
          :label="``"
          v-model="Question.GoodAns[3]"
          class="ma-0 pa-0 dont-break-out"
        >
          <span slot="label">Odpowiedź D: {{Question.Ans4}}</span>
        </v-checkbox>
      </div>
      <v-divider></v-divider>
      <div class="px-3">
        <v-container class="pa-0">
          <v-layout row wrap justify-space-between>
            <v-flex xs-12 md-6 class="mx-2">
              <v-btn
                block
                rounded
                color="green darken-3"
                router
                :to="{ name: 'EditQuestion', params: {questionId: Question.Id}}"
              >
                <span>Edytuj pytanie</span>
                <v-icon right>mdi-pencil</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs-12 md-6 class="mx-2">
              <v-btn block rounded color="red" @click="dialog = true">
                <span>Usuń pytanie</span>
                <v-icon right>mdi-delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-card>
    <v-dialog persistent max-width="600" v-model="dialog">
      <v-card>
        <v-card-title
          class="headline"
        >Czy na pewno chcesz usunąć pytanie {{Question.Id}}? Ta operacja jest nieodwracalna!</v-card-title>
        <v-card-text>Pytanie: {{Question.Question}}</v-card-text>
        <v-card-actions>
          <v-container>
            <v-layout row wrap justify-space-between>
              <v-flex xs-12 md-6 class="mx-2">
                <v-btn color="red" block outlined @click="deleteQuestion(); dialog = false;">
                  <span>Tak, usuń</span>
                  <v-icon right>mdi-delete</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs-12 md-6 class="mx-2">
                <v-btn color="green" block outlined @click="dialog = false">
                  <span>Nie usuwaj!</span>
                  <v-icon right>mdi-cancel</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["index", "Question"],
  data() {
    return { dialog: false };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    deleteQuestion() {
      this.$emit("deleteQuestion");
    }
  }
};
</script>