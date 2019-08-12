<template>
  <div class="mx-3">
    <h1 block large class="ma-3 text-center">QUIZ z Technologii Sieci Web</h1>
    <transition
      enter-active-class="animated zoomInLeft fast"
      leave-active-class="animated zoomOutRight fast"
      mode="out-in"
    >
      <template v-for="(Question, index) in Questions">
        <v-card
          v-if="QuestionNumber-1 === index"
          class="light-grey darken-3 my-3"
          :key="Question.Id"
        >
          <v-card-title class="pt-2 pb-0 px-3">
            <div>
              <h3 class="headline mb-0">Pytanie {{index+1}}/30</h3>
              <div>{{Questions[index].Question}}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-container fluid class="pa-0">
            <v-layout row wrap justify-space-around class="ma-0">
              <v-flex xs12 md6 v-if="Questions[index].Textarea" class="py-1 px-5">
                <div class="pa-2" style="border: 1px dashed;">
                  <p
                    class="ma-0 pa-0"
                    v-for="(row, index2) in prepareTextArea(Questions[index].Textarea)"
                    :key="index2"
                  >{{row}}</p>
                </div>
              </v-flex>
              <v-flex xs12 md6 v-if="Questions[index].Image" class="pa-0">
                <div class="text-center">
                  <img :src="Questions[index].Image" />
                </div>
              </v-flex>
              <v-flex
                xs12
                :md6="(Questions[index].Image.length > 0 || Questions[index].Textarea.length > 0)"
              >
                <div class="py-2 px-5">
                  <v-checkbox
                    v-model="Answers[index].Ans1"
                    color="green"
                    class="ma-0 pa-0 dont-break-out"
                  >
                    <span slot="label">Odpowiedź A: {{Questions[index].Ans1}}</span>
                  </v-checkbox>
                  <v-divider class="my-2"></v-divider>
                  <v-checkbox
                    v-model="Answers[index].Ans2"
                    color="green"
                    class="ma-0 pa-0 dont-break-out"
                  >
                    <span slot="label">Odpowiedź B: {{Questions[index].Ans2}}</span>
                  </v-checkbox>
                  <v-divider class="my-2"></v-divider>
                  <v-checkbox
                    v-model="Answers[index].Ans3"
                    color="green"
                    class="ma-0 pa-0 dont-break-out"
                  >
                    <span slot="label">Odpowiedź C: {{Questions[index].Ans3}}</span>
                  </v-checkbox>
                  <v-divider class="my-2"></v-divider>
                  <v-checkbox
                    v-model="Answers[index].Ans4"
                    color="green"
                    class="ma-0 pa-0 dont-break-out"
                  >
                    <span slot="label">Odpowiedź D: {{Questions[index].Ans4}}</span>
                  </v-checkbox>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </template>
    </transition>

    <v-btn
      block
      rounded
      dark
      color="green darken-3"
      class="mb-3"
      v-if="QuestionNumber < 30"
      :class="{'animated shake slow': animatedBtn}"
      @animationend="animatedBtn = false"
      @click="nextQuestion(); animatedBtn = true;"
    >
      <span>Następne pytanie</span>
      <v-icon right large>mdi-step-forward</v-icon>
    </v-btn>
    <v-btn
      block
      rounded
      dark
      class="mb-3"
      v-else
      v-long-press="750"
      @long-press-start="onLongPressStart"
      @long-press-stop="onLongPressStop"
      color="amber darken-2"
    >
      <span>Zakończ test (Przytrzymaj)</span>
      <v-icon right large>mdi-send</v-icon>
    </v-btn>
    <div v-if="getQuestionsError">
      <h2
        block
        large
        class="ma-2 text-center"
        color="red"
      >Wystąpił bład w pobieraniu pytań z bazy danych! Spróbuj odświeżyć stronę.</h2>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "../firebase/init";
import LongPress from "vue-directive-long-press";
let db = firebase.firestore();
export default {
  directives: {
    "long-press": LongPress
  },
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
          Textarea: "",
          EndCounter: null
        }
      ],
      Answers: [],
      getQuestionsError: false,
      animatedBtn: false
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
      for (let i = 0; i < 30; i++) {
        if (
          this.Questions[i].GoodAns[0] === this.Answers[i].Ans1 &&
          this.Questions[i].GoodAns[1] === this.Answers[i].Ans2 &&
          this.Questions[i].GoodAns[2] === this.Answers[i].Ans3 &&
          this.Questions[i].GoodAns[3] === this.Answers[i].Ans4
        ) {
          points++;
        }
      }
      this.$router.push({
        name: "Result",
        params: {
          points: points,
          Questions: this.Questions,
          Answers: this.Answers
        }
      });
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
    },
    onLongPressStart() {
      let vm = this;
      this.EndCounter = setInterval(() => {
        clearInterval(this.EndCounter);
        vm.finishTest();
      });
    },
    onLongPressStop() {
      clearInterval(this.EndCounter);
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