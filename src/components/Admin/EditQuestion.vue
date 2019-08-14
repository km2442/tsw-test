<template>
  <div class="mb-4 mx-3">
    <h1 block large class="ma-3 text-center">Edytuj pytanie {{$route.params.questionId}}</h1>
    <QuestionEditor
      :buttons="buttons"
      preload="yes"
      @acceptQuestion="editQuestion($event)"
    ></QuestionEditor>
  </div>
</template>

<script>
/* eslint-disable no-console */
import firebase from "../../firebase/init";
let db = firebase.firestore();
import QuestionEditor from "./QuestionEditor";
export default {
  components: {
    QuestionEditor
  },
  data() {
    return {
      buttons: {
        acceptText: "Edytuj pytanie",
        acceptIcon: "mdi-pencil",
        cancelText: "Anuluj edycję"
      }
    };
  },
  methods: {
    editQuestion(payload) {
      db.collection("Questions")
        .doc(this.$route.params.questionId)
        .update({
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
            msg: "Pytanie zostało zaktualizowane",
            color: "success"
          });
          this.$router.push({ name: "Admin" });
        })
        .catch(err => {
          this.$store.dispatch("modifySnackbar", {
            state: true,
            msg: "Wystąpił błąd przy edycji pytania",
            color: "error"
          });
          console.log(err);
        });
    }
  }
};
</script>