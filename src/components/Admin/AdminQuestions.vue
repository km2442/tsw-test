<template>
  <div class="mt-0 mx-2">
    <v-divider></v-divider>
    <h2
      v-if="getQuestionsError"
      block
      large
      class="ma-2 text-center"
      color="red"
    >Wystąpił bład w pobieraniu pytań z bazy danych! Spróbuj odświeżyć stronę.</h2>
    <h2 v-else block large class="ma-2 text-center">Ilość pytań w bazie: {{Questions.length}}</h2>
    <v-divider></v-divider>
    <div class="ma-0">
      <v-container fluid class="pa-1">
        <v-layout row wrap justify-space-around>
          <v-flex xs12 sm9 md10 class="pt-1 pb-0 px-2">
            <v-text-field
              solo-inverted
              flat
              clearable
              hide-details
              v-model="search"
              color="green"
              label="Wyszykaj pytania"
              prepend-inner-icon="mdi-file-document-box-search"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 md2 class="pt-1 pb-0 px-2">
            <v-select
              color="green"
              v-model="maxOnPage"
              :items="questionNumberOptions"
              label="Ile pytań wyświetlić naraz?"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-divider></v-divider>
    <v-container fluid class="py-1 px-0">
      <v-layout row wrap justify-space-around>
        <v-flex
          xs12
          md6
          lg4
          v-for="(Question, index) in filteredQuestions"
          :key="index"
          v-show="index >= (page-1)*maxOnPage && index < page*maxOnPage"
        >
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
            <div class="px-3 py-1">
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
                    <v-dialog
                      full-width
                      v-model="delQuestion[index].del"
                      persistent
                      max-width="600"
                    >
                      <v-btn block rounded color="red" slot="activator">
                        <span>Usuń pytanie</span>
                        <v-icon right>mdi-delete</v-icon>
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
                            outlined
                            @click="deleteQuestion(Question.Id, index)"
                          >
                            <span>Tak, usuń</span>
                            <v-icon right>mdi-delete</v-icon>
                          </v-btn>
                          <v-btn
                            color="green"
                            flat
                            outlined
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
    <div class="text-center">
      <v-btn rounded block @click="$vuetify.goTo('#app')" color="green darken-2" class="my-3">
        <span>Wróć na górę</span>
        <v-icon large right>mdi-arrow-collapse-up</v-icon>
      </v-btn>
    </div>
    <div class="text-center">
      <v-pagination
        color="green darken-2"
        v-model="page"
        :length="Math.ceil(Questions.length/maxOnPage)"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "../../firebase/init";
let db = firebase.firestore();
export default {
  name: "AdminQuestions",
  data() {
    return {
      Questions: [],
      delQuestion: [],
      search: "",
      getQuestionsError: false,
      questionNumberOptions: [6, 10, 15, 30, 60, 120],
      maxOnPage: 30,
      page: 1
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
  },
  computed: {
    filteredQuestions() {
      if (!this.search) return this.Questions;
      return this.Questions.filter(Question => {
        let temp =
          Question.Question +
          " " +
          Question.Ans1 +
          " " +
          Question.Ans2 +
          " " +
          Question.Ans3 +
          " " +
          Question.Ans4;
        return temp.match(this.search);
      });
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