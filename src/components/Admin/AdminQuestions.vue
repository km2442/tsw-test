<template>
  <div class="mt-0 mx-2">
    <v-divider></v-divider>
    <h2
      v-if="getQuestionsError"
      block
      large
      class="ma-2 text-xs-center"
      color="red"
    >Wystąpił bład w pobieraniu pytań z bazy danych! Spróbuj odświeżyć stronę.</h2>
    <h2 v-else block large class="ma-2 text-xs-center">Ilość pytań w bazie: {{Questions.length}}</h2>
    <v-divider></v-divider>
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex xs12 md6 v-for="(Question, index) in Questions" :key="index">
          <v-card class="light-grey darken-3 ma-2">
            <v-card-title class="pa-3">
              <div>
                <h3 class="headline mb-0">Pytanie {{index + 1}}</h3>
                <div>{{Question.Question}}</div>
              </div>
            </v-card-title>
            <div class="ma-2">
              <div v-if="Question.Textarea != ''" class="pa-2" style="border: 1px dashed;">
                <p
                  class="ma-0 pa-0"
                  v-for="(row, index) in prepareTextArea(Question.Textarea)"
                  :key="index"
                >{{row}}</p>
              </div>
              <div v-if="Question.Image != ''">
                <img :src="Question.Image">
              </div>
            </div>
            <v-divider></v-divider>
            <div class="px-3">
              <v-checkbox disabled :label="``" v-model="Question.GoodAns[0]" class="ma-0 pa-0">
                <span slot="label" class="mb-0">Odpowiedź A: {{Question.Ans1}}</span>
              </v-checkbox>
              <v-divider></v-divider>
              <v-checkbox disabled :label="``" v-model="Question.GoodAns[1]" class="ma-0 pa-0">
                <span slot="label">Odpowiedź B: {{Question.Ans2}}</span>
              </v-checkbox>
              <v-divider></v-divider>
              <v-checkbox disabled :label="``" v-model="Question.GoodAns[2]" class="ma-0 pa-0">
                <span slot="label">Odpowiedź C: {{Question.Ans3}}</span>
              </v-checkbox>
              <v-divider></v-divider>
              <v-checkbox disabled :label="``" v-model="Question.GoodAns[3]" class="ma-0 pa-0">
                <span slot="label">Odpowiedź D: {{Question.Ans4}}</span>
              </v-checkbox>
            </div>
            <div>
              <v-container class="pa-0">
                <v-layout row wrap justify-space-between>
                  <v-flex xs-12 md-6 class="mx-3">
                    <v-btn
                      block
                      round
                      color="green darken-3"
                      router
                      :to="{ name: 'EditQuestion', params: {questionId: Question.Id}}"
                    >
                      <span>Edytuj pytanie</span>
                      <v-icon right>edit</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs-12 md-6 class="mx-3">
                    <v-dialog v-model="delQuestion[index].del" persistent max-width="600">
                      <v-btn block round color="red" slot="activator">
                        <span>Usuń pytanie</span>
                        <v-icon right>delete</v-icon>
                      </v-btn>
                      <v-card>
                        <v-card-title
                          class="headline"
                        >Czy na pewno chcesz usunąć pytanie {{Question.Id}}? Ta operacja jest nieodwracalna!</v-card-title>
                        <v-card-text>Pytanie: {{Question.Question}}</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red"
                            flat
                            outline
                            @click="deleteQuestion(Question.Id, index)"
                          >
                            <span>Tak, usuń</span>
                            <v-icon right>delete</v-icon>
                          </v-btn>
                          <v-btn
                            color="green"
                            flat
                            outline
                            @click="delQuestion[index].del = false"
                          >Nie usuwaj!</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "../../firebase/init";
let db = firebase.firestore();
export default {
  name: "AdminQuestions",
  data() {
    return {
      Questions: [],
      delQuestion: [],
      getQuestionsError: false
    };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    deleteQuestion(id, index) {
      this.delQuestion[index].del = false;
      // delete doc from firestore
      db.collection("Questions")
        .doc(id)
        .delete()
        .then(() => {
          this.Questions = this.Questions.filter(Question => {
            return Question.Id != id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchDataFromFirestore() {
      const firestoreData = await db.collection("Questions").get();
      const foundQuestions = firestoreData.docs;

      if (!foundQuestions) {
        this.getQuestionsError = true;
        throw console.error("Cant fetch data from database!");
      }
      this.Questions = foundQuestions.map(question => ({
        Id: question.id,
        Question: question.data().Question,
        Ans1: question.data().Ans1,
        Ans2: question.data().Ans2,
        Ans3: question.data().Ans3,
        Ans4: question.data().Ans4,
        GoodAns: question.data().GoodAns,
        Textarea: question.data().Textarea,
        Image: question.data().Image
      }));
      for (let i = 0; i < this.Questions.length; i++) {
        this.delQuestion.push({});
        this.$set(this.delQuestion[i], "del", false);
      }
    }
  },
  created() {
    this.fetchDataFromFirestore();
  }
};
</script>