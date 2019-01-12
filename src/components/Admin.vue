<template>
  <div>
    <div class="AdminView">
      <h3 class="title">Panel administracyjny</h3>
      <a
        class="waves-effect waves-light btn adminBtn"
        v-if="showQuestions == false"
        @click="toggleQuestionsVisibility()"
      >Wyświetl wszystkie pytania</a>
      <a
        class="waves-effect waves-light btn adminBtn"
        v-if="showQuestions"
        @click="toggleQuestionsVisibility()"
      >Ukryj pytania</a>
      <a class="waves-effect waves-light btn">Dodaj pytanie</a>
    </div>
    <div
      class="index container"
      v-if="showQuestions"
      style="margin-top: 10px; margin-bottom: 10px;"
    >
      <div class="card blue-grey darken-1" v-for="(Question, index) in Questions" :key="index">
        <div class="card-content white-text">
          <span class="card-title">Pytanie {{index + 1}}</span>
          <p>{{Question.Question}}</p>
          <div v-if="Question.Textarea != ''">
            <br>
            <p v-for="(row, index) in prepareTextArea(Question.Textarea)" :key="index">{{row}}</p>
          </div>
          <div v-if="Question.Image != ''">
            <br>
            <img :src="Question.Image">
          </div>
        </div>
        <hr>
        <div class="Answers">
          <p class="AnsT">Odpowiedź A: {{Question.Ans1}}</p>
          <hr>
          <p class="AnsT">Odpowiedź B: {{Question.Ans2}}</p>
          <hr>
          <p class="AnsT">Odpowiedź C: {{Question.Ans3}}</p>
          <hr>
          <p class="AnsT">Odpowiedź D: {{Question.Ans4}}</p>
        </div>
        <div style="text-align: center; padding-bottom: 5px;">
          <a class="waves-effect waves-light quesOpt btn">
            <i class="material-icons left">edit</i>Edytuj pytanie
          </a>
          <a class="waves-effect waves-light quesOpt btn">
            <i class="material-icons left">delete</i>Usuń pytanie
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebase/init";

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
    imageFromString(str) {
      var image = new Image();
      image.src = str;
      console.log(image);
      return image;
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
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AdminView {
  text-align: center;
  padding: 20px;
  padding-bottom: 5px;
}
.title {
  color: white;
  margin: 0px 0px 20px 0px;
}
.adminBtn {
  margin: 0px;
}
.card-content {
  padding-top: 10px;
  padding-bottom: 0px;
}
.Answers {
  padding: 1%;
}
.AnsT {
  color: white;
  margin: 1%;
}
.quesOpt {
  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>