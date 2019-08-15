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
        <v-layout row wrap justify-space-around class="ma-0">
          <v-flex xs12 sm9 md10 class="pt-1 pb-0 px-2">
            <v-text-field
              solo-inverted
              text
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
      <transition-group
        enter-active-class="animated zoomIn delay-1s"
        leave-active-class="animated zoomOut"
        appear
        tag="v-layout"
        class="row wrap justify-space-around"
      >
        <template v-for="(Question, index) in filteredQuestions">
          <v-flex
            xs12
            md6
            lg4
            :key="Question.Id"
            v-if="index >= (page-1)*maxOnPage && index < page*maxOnPage"
          >
            <SingleQuestion
              :index="Question.Id"
              :Question="Question"
              @deleteQuestion="deleteQuestion(Question.Id)"
            ></SingleQuestion>
          </v-flex>
        </template>
      </transition-group>
    </v-container>
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
const SingleQuestion = () =>
  import(/* webpackChunkName: "SingleQuestion" */ "./SingleQuestion");
export default {
  data() {
    return {
      Questions: [],
      search: "",
      getQuestionsError: false,
      questionNumberOptions: [6, 10, 15, 30, 60, 120],
      maxOnPage: 30,
      page: 1
    };
  },
  components: { SingleQuestion },
  methods: {
    deleteQuestion(id) {
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