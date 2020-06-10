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
        enter-active-class="animated flipInY delay-1s"
        leave-active-class="animated flipOutY"
        appear
        name="v-layout"
        class="row wrap justify-space-around"
      >
        <template v-for="(Question, index) in filteredQuestions">
          <v-flex
            xs12
            md6
            lg4
            :key="Question.Id"
            v-show="index >= (page-1)*maxOnPage && index < page*maxOnPage"
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
import axios from "../../js/axiosData";
const SingleQuestion = () =>
  import(/* webpackChunkName: "AdminQuestions" */ "./SingleQuestion");
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
    fetchDataFromFirestore() {
      axios
        .get(
          "Questions?pageSize=100",
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.token
            }
          }
        )
        .then(data => {
          const foundQuestions = data.data.documents;
          if (!foundQuestions) {
            this.getQuestionsError = true;
            throw console.error("Cant fetch data from database!");
          }
          this.Questions = foundQuestions.map(question => ({
            Id: question.name.match(/(\b[0-z]*\b)$/g)[0],
            Question: question.fields.Question.stringValue,
            Ans1: question.fields.Ans1.stringValue,
            Ans2: question.fields.Ans2.stringValue,
            Ans3: question.fields.Ans3.stringValue,
            Ans4: question.fields.Ans4.stringValue,
            GoodAns: [
              question.fields.GoodAns.arrayValue.values[0].booleanValue,
              question.fields.GoodAns.arrayValue.values[1].booleanValue,
              question.fields.GoodAns.arrayValue.values[2].booleanValue,
              question.fields.GoodAns.arrayValue.values[3].booleanValue,
            ],
            Textarea: question.fields.Textarea.stringValue,
            Image: question.fields.Image.stringValue
          }));
        });
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