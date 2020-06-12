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
              prepend-inner-icon="mdi-database-search"
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
    <div v-if="!loaded">
      <v-layout row wrap justify-space-between>
        <v-flex sm12 md4 v-for="(i, index) in 6" :key="index">
          <v-skeleton-loader type="card" class="pa-2"></v-skeleton-loader>
        </v-flex>
      </v-layout>
    </div>
    <v-container fluid class="py-1 px-0" v-else>
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
              :index="index + 1"
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
        :length="Math.ceil(filteredQuestions.length/maxOnPage)"
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
      page: 1,
      loaded: false
    };
  },
  components: { SingleQuestion },
  methods: {
    deleteQuestion(id) {
      axios
        .delete("Questions/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.token
          }
        })
        .then(() => {
          this.Questions = this.Questions.filter(Question => {
            return Question.Id != id;
            this.$store.dispatch("modifySnackbar", {
              state: true,
              msg: "Pytanie zostało usunięte",
              color: "success"
            });
          });
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("modifySnackbar", {
            state: true,
            msg: "Wystąpił błąd przy usuwaniu pytania",
            color: "error"
          });
        });
    },
    fetchDataFromFirestore() {
      axios
        .get("Questions?pageSize=100", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.token
          }
        })
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
              question.fields.GoodAns.arrayValue.values[3].booleanValue
            ],
            Textarea: question.fields.Textarea.stringValue,
            Image: question.fields.Image.stringValue
          }));
          this.loaded = true;
        })
        .catch(err => {
          this.$store.dispatch("modifySnackbar", {
            state: true,
            msg: "Wystąpił błąd przy pobieraniu pytań!",
            color: "error"
          });
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
          Question.Question.toLowerCase() +
          " " +
          Question.Ans1.toLowerCase() +
          " " +
          Question.Ans2.toLowerCase() +
          " " +
          Question.Ans3.toLowerCase() +
          " " +
          Question.Ans4.toLowerCase();
        return temp.match(this.search.toLowerCase());
      });
    }
  }
};
</script>