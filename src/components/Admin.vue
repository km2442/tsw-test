<template>
  <div class="mb-4">
    <h1 block dark large class="ma-3 text-xs-center">Panel administracyjny</h1>
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex
          xs-12
          class="mx-3"
          v-if="showQuestions == false"
          @click="showQuestions = !showQuestions"
        >
          <v-btn block color="green darken-3" dark>
            <span>Pokaż wszystkie pytania</span>
            <v-icon dark right>edit</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3" v-if="showQuestions" @click="showQuestions = !showQuestions">
          <v-btn block color="green darken-3" dark>
            <span>Ukryj pytania</span>
            <v-icon dark right>edit</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs-12 class="mx-3">
          <v-btn block color="green darken-3" dark router :to="{name: 'AddQuestion'}">
            <span>Dodaj pytanie</span>
            <v-icon dark right>add_circle</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="mt-0 mb-2 mx-2" v-if="showQuestions == true">
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
              <v-divider dark></v-divider>
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
                      <v-btn block round disabled color="green darken-3" dark>
                        <span>Edytuj pytanie</span>
                        <v-icon dark right>edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex xs-12 md-6 class="mx-3">
                      <v-btn block round color="green darken-3" dark @click="deleteQuestion(Question.Id)">
                        <span>Usuń pytanie</span>
                        <v-icon dark right>delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "./firebase/init";
var db = firebase.firestore();
export default {
  name: "Admin",
  data() {
    return {
      Questions: [],
      showQuestions: false
    };
  },
  methods: {
    toggleQuestionsVisibility() {
      if (this.showQuestions) {
        this.showQuestions = false;
      } else {
        this.showQuestions = true;
      }
    },
    prepareTextArea(text) {
      return text.split("\\n");
    },
    deleteQuestion(id){
      // delete doc from firestore
      db.collection('Questions').doc(id).delete()
      .then(() => {
        this.Questions = this.Questions.filter(Question => {
          return Question.Id != id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    db.collection("Questions")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var Question = doc.data();
          Question.Id = doc.id;
          this.Questions.push(Question);
        });
      });
  }
};
</script>