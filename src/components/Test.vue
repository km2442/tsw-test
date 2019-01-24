<template>
  <div class="mx-3">
    <v-card class="light-grey darken-3 my-3">
      <v-card-title class="pa-3">
        <div>
          <h3 class="headline mb-0">Pytanie {{QuestionNumber}}/{{Questions.length}}</h3>
          <div>{{Questions[QuestionNumber-1].Question}}</div>
        </div>
      </v-card-title>
      <div class="ma-2">
        <div
          v-if="Questions[QuestionNumber-1].Textarea != ''"
          class="pa-2"
          style="border: 1px dashed;"
        >
          <p
            class="ma-0 pa-0"
            v-for="(row, index) in prepareTextArea(Questions[QuestionNumber-1].Textarea)"
            :key="index"
          >{{row}}</p>
        </div>
        <div v-if="Questions[QuestionNumber-1].Image != ''">
          <img :src="Questions[QuestionNumber-1].Image">
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-3 pt-3 pb-0">
        <v-checkbox v-model="Answers[QuestionNumber-1].Ans1" color="green" class="ma-0 pa-0">
          <span slot="label" class="mb-0">Odpowiedź A: {{Questions[QuestionNumber-1].Ans1}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox v-model="Answers[QuestionNumber-1].Ans2" color="green" class="ma-0 pa-0">
          <span slot="label">Odpowiedź B: {{Questions[QuestionNumber-1].Ans2}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox v-model="Answers[QuestionNumber-1].Ans3" color="green" class="ma-0 pa-0">
          <span slot="label">Odpowiedź C: {{Questions[QuestionNumber-1].Ans3}}</span>
        </v-checkbox>
        <v-divider></v-divider>
        <v-checkbox v-model="Answers[QuestionNumber-1].Ans4" color="green" class="ma-0 pa-0">
          <span slot="label">Odpowiedź D: {{Questions[QuestionNumber-1].Ans4}}</span>
        </v-checkbox>
      </div>
      <div class="px-2 pb-1">
        <v-btn
          block
          round
          :disabled="QuestionNumber < Questions.length ? false : true"
          color="green darken-3"
          @click="nextQuestion()"
        >
          <span>Następne pytanie</span>
          <v-icon right>fast_forward</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-btn
      block
      round
      class="mb-3"
      :disabled="QuestionNumber == Questions.length ? false : true"
      @click="chck()"
      color="green darken-3"
    >
      <span>Zakończ test (Not working)</span>
      <v-icon right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
import firebase from "./firebase/init";
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
      Answers: [{}]
    };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    imageFromString(str) {
      var image = new Image();
      image.src = str;
      //console.log(image);
      return image;
    },
    nextQuestion() {
      this.QuestionNumber++;
      this.Answers[this.QuestionNumber-1].Ans1 = false;
      this.Answers[this.QuestionNumber-1].Ans2 = false;
      this.Answers[this.QuestionNumber-1].Ans3 = false;
      this.Answers[this.QuestionNumber-1].Ans4 = false;
    },
    chck() {
      var str = "";
      for (let i = 0; i < 6; i++) {
        str += String(this.Answers[this.QuestionNumber-1].Ans1);
        str += " ";
      }
      alert(str);
    }
  },
  created() {
    this.Answers = [];
    var A = { Ans1: false, Ans2: false, Ans3: false, Ans4: false };
    for (var i = 0; i < 30; i++) {
      this.Answers.push(A);
    }
    db.collection("Questions")
      .get()
      .then(snapshot => {
        this.Questions = [];
        snapshot.forEach(doc => {
          var Question = doc.data();
          Question.Id = doc.id;
          this.Questions.push(Question);
        });
      });
  }
};
</script>
