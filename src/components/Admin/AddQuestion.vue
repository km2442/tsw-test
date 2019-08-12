<template>
  <div class="mb-4 mx-3">
    <h1 block large class="ma-3 text-center">Dodaj pytanie</h1>
    <QuestionEditor
      :buttons="buttons"
      :preloadedQuestion="{}"
      @acceptQuestion="addQuestion($event)"
    ></QuestionEditor>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "../../firebase/init";
import QuestionEditor from "./QuestionEditor";
let db = firebase.firestore();
export default {
  components: {
    QuestionEditor
  },
  data() {
    return {
      buttons: {
        acceptText: "Dodaj pytanie",
        acceptIcon: "mdi-database-plus",
        cancelText: "Anuluj dodawanie"
      }
    };
  },
  methods: {
    addQuestion(payload) {
      db.collection("Questions")
        .add({
          Question: payload.Question,
          Ans1: payload.Ans1,
          Ans2: payload.Ans2,
          Ans3: payload.Ans3,
          Ans4: payload.Ans4,
          GoodAns: payload.GoodAns,
          Textarea: payload.Textarea,
          Image: payload.Image
        })
        .then(() => {
          this.$store.dispatch("modifySnackbar", {
            state: true,
            msg: "Dodano pytanie",
            color: "success"
          });
          this.$router.push({ name: "Admin" });
        })
        .catch(err => {
          this.$store.dispatch("modifySnackbar", {
            state: true,
            msg: "Wystąpił błąd przy dodawaniu pytania",
            color: "error"
          });
          console.log(err);
        });
    }
  }
};
</script>