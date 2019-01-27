<template>
  <div class="mx-3">
    <div v-for="(Question, index) in Questions" :key="Question.Id">
      <v-card v-if="QuestionNumber-1 == index" class="light-grey darken-3 my-3">
        <v-card-title class="pa-3">
          <div>
            <h3 class="headline mb-0">Pytanie {{index+1}}/{{Questions.length}}</h3>
            <div>{{Questions[index].Question}}</div>
          </div>
        </v-card-title>
        <div class="ma-2">
          <div v-if="Questions[index].Textarea != ''" class="pa-2" style="border: 1px dashed;">
            <p
              class="ma-0 pa-0"
              v-for="(row, index2) in prepareTextArea(Questions[index].Textarea)"
              :key="index2"
            >{{row}}</p>
          </div>
          <div v-if="Questions[index].Image != ''">
            <img :src="Questions[index].Image">
          </div>
        </div>
        <v-divider></v-divider>
        <div class="px-3 pt-3 pb-0">
          <v-checkbox v-model="Answers[index].Ans1" color="green" class="ma-0 pa-0">
            <span slot="label" class="mb-0">Odpowiedź A: {{Questions[index].Ans1}}</span>
          </v-checkbox>
          <v-divider></v-divider>
          <v-checkbox v-model="Answers[index].Ans2" color="green" class="ma-0 pa-0">
            <span slot="label">Odpowiedź B: {{Questions[index].Ans2}}</span>
          </v-checkbox>
          <v-divider></v-divider>
          <v-checkbox v-model="Answers[index].Ans3" color="green" class="ma-0 pa-0">
            <span slot="label">Odpowiedź C: {{Questions[index].Ans3}}</span>
          </v-checkbox>
          <v-divider></v-divider>
          <v-checkbox v-model="Answers[index].Ans4" color="green" class="ma-0 pa-0">
            <span slot="label">Odpowiedź D: {{Questions[index].Ans4}}</span>
          </v-checkbox>
        </div>
        <div class="px-2 pb-1">
          <v-btn
            block
            round
            v-if="QuestionNumber < Questions.length"
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
      v-if="QuestionNumber == Questions.length"
      @click="finishTest()"
      color="green darken-3"
    >
      <span>Zakończ test!</span>
      <v-icon right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
import firebase from "../firebase/init";
var db = firebase.firestore();
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
      Answers: []
    };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    shuffleArray(array) {
      var ctr = array.length,
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
      var ctr = 4,
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
      var points = 0;
      for (let i = 0; i < this.Questions.length; i++) {
        if (
          this.Questions[i].GoodAns[0] == this.Answers[i].Ans1 &&
          this.Questions[i].GoodAns[1] == this.Answers[i].Ans2 &&
          this.Questions[i].GoodAns[2] == this.Answers[i].Ans3 &&
          this.Questions[i].GoodAns[3] == this.Answers[i].Ans4
        ) {
          points++;
        }
      }
    }
  },
  //make answer array reactable
  created() {
    for (var i = 0; i < 30; i++) {
      this.Answers.push({});
      this.$set(this.Answers[i], "Ans1", false);
      this.$set(this.Answers[i], "Ans2", false);
      this.$set(this.Answers[i], "Ans3", false);
      this.$set(this.Answers[i], "Ans4", false);
    }
    //fetch questions from firebase
    db.collection("Questions")
      .get()
      .then(snapshot => {
        this.Questions = [];
        snapshot.forEach(doc => {
          var Question = doc.data();
          Question.Id = doc.id;
          this.Questions.push(Question);
        });
        //shuffle questions, and answers
        this.Questions = this.shuffleArray(this.Questions);
        for (let i = 0; i < this.Questions.length; i++) {
          this.Questions[i] = this.shuffleAnswers(this.Questions[i]);
        }
      });
  }
};
</script>
