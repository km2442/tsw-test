<template>
  <div class="mx-3">
    <h1 block large class="ma-3 text-xs-center">QUIZ z Technologii Sieci Web</h1>
    <div v-for="(Question, index) in Questions" :key="Question.Id">
      <v-card v-if="QuestionNumber-1 === index" class="light-grey darken-3 my-3">
        <v-card-title class="pa-3">
          <div>
            <h3 class="headline mb-0">Pytanie {{index+1}}/30</h3>
            <div>{{Questions[index].Question}}</div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-container class="pa-0">
          <v-layout row wrap justify-space-around>
            <v-flex xs12 md6 v-if="Questions[index].Textarea">`
              <div class="pa-2" style="border: 1px dashed;">
                <p
                  class="ma-0 pa-0"
                  v-for="(row, index2) in prepareTextArea(Questions[index].Textarea)"
                  :key="index2"
                >{{row}}</p>
              </div>
            </v-flex>
            <v-flex xs12 md6 v-if="Questions[index].Image">
              <div>
                <img :src="Questions[index].Image">
              </div>
            </v-flex>
            <v-flex
              xs12
              :md6="(Questions[index].Image.length > 0 || Questions[index].Textarea.length > 0)"
            >
              <div class="px-3 pt-3 pb-0">
                <v-checkbox v-model="Answers[index].Ans1" color="green" class="ma-0 pa-0 dont-break-out"  style="word-wrap: break-word;">
                  <span slot="label" class="mb-0">Odpowiedź A: {{Questions[index].Ans1}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans2" color="green" class="ma-0 pa-0 dont-break-out" style="word-wrap: break-word;">
                  <span slot="label">Odpowiedź B: {{Questions[index].Ans2}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans3" color="green" class="ma-0 pa-0 dont-break-out">
                  <span slot="label">Odpowiedź C: {{Questions[index].Ans3}}</span>
                </v-checkbox>
                <v-divider></v-divider>
                <v-checkbox v-model="Answers[index].Ans4" color="green" class="ma-0 pa-0 dont-break-out">
                  <span slot="label">Odpowiedź D: {{Questions[index].Ans4}}</span>
                </v-checkbox>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <div class="ma-2"></div>

        <div class="px-2 pb-1">
          <v-btn
            block
            round
            v-if="QuestionNumber < 30"
            color="green darken-3"
            @click="nextQuestion()"
          >
            <span>Następne pytanie</span>
            <v-icon right>fast_forward</v-icon>
          </v-btn>
        </div>
      </v-card>
    </div>
    <v-btn
      block
      round
      class="mb-3"
      v-if="QuestionNumber === 30"
      @click="finishTest()"
      color="green darken-3"
    >
      <span>Zakończ test!</span>
      <v-icon right>send</v-icon>
    </v-btn>
    <div v-if="getQuestionsError">
      <h2
        block
        large
        class="ma-2 text-xs-center"
        color="red"
      >Wystąpił bład w pobieraniu pytań z bazy danych! Spróbuj odświeżyć stronę.</h2>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "../firebase/init";
let db = firebase.firestore();
export default {
  name: "Test",
  data() {
    return {
      QuestionNumber: 1,
      Questions: [
        {
          Question: "Loading data from database...",
          Ans1: "",
          Ans2: "",
          Ans3: "",
          Ans4: "",
          Image: "",
          Textarea: ""
        }
      ],
      Answers: [],
      getQuestionsError: false
    };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    shuffleArray(array) {
      let ctr = array.length,
        temp,
        index;

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
      }
      return array;
    },
    shuffleAnswers(Question) {
      let ctr = 4,
        temp,
        index,
        Ans = [Question.Ans1, Question.Ans2, Question.Ans3, Question.Ans4];

      // While there are elements in the array
      while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = Question.GoodAns[ctr];
        Question.GoodAns[ctr] = Question.GoodAns[index];
        Question.GoodAns[index] = temp;

        temp = Ans[ctr];
        Ans[ctr] = Ans[index];
        Ans[index] = temp;
      }
      Question.Ans1 = Ans[0];
      Question.Ans2 = Ans[1];
      Question.Ans3 = Ans[2];
      Question.Ans4 = Ans[3];
      return Question;
    },
    nextQuestion() {
      this.QuestionNumber++;
      window.location.href = "#";
    },
    finishTest() {
      let points = 0;
      for (let i = 0; i < this.Questions.length; i++) {
        if (
          this.Questions[i].GoodAns[0] === this.Answers[i].Ans1 &&
          this.Questions[i].GoodAns[1] === this.Answers[i].Ans2 &&
          this.Questions[i].GoodAns[2] === this.Answers[i].Ans3 &&
          this.Questions[i].GoodAns[3] === this.Answers[i].Ans4
        ) {
          points++;
        }
      }
      this.$router.push({ name: "Result", params: { points: points } });
    },
    async fetchDataFromFirestore() {
      const firestoreData = await db.collection("Questions").get();
      const foundQuestions = firestoreData.docs;

      if (!foundQuestions) {
        this.getQuestionsError = true;
        throw console.error("Cant fetch data from database!");
      }
      const unshuffledQuestions = foundQuestions.map(question => ({
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
      const shuffledQuestions = this.shuffleArray(unshuffledQuestions);
      this.Questions = shuffledQuestions.map(question =>
        this.shuffleAnswers(question)
      );
    }
  },

  async created() {
    //make answer array reactable
    for (let i = 0; i < 30; i++) {
      this.Answers.push({});
      this.$set(this.Answers[i], "Ans1", false);
      this.$set(this.Answers[i], "Ans2", false);
      this.$set(this.Answers[i], "Ans3", false);
      this.$set(this.Answers[i], "Ans4", false);
    }
    this.fetchDataFromFirestore();
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
