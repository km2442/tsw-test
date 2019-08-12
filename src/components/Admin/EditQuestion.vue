<template>
  <div class="mb-4 mx-3">
    <h1 block large class="ma-3 text-center">Edytuj pytanie {{$route.params.questionId}}</h1>
    <QuestionEditor
      :buttons="buttons"
      :preloadedQuestion="Question"
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
      Question: {},
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
        .doc(payload.Id)
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
  },
  created() {
    let ref = db.collection("Questions").doc(this.$route.params.questionId);
    ref.get().then(doc => {
      this.Question.Question = doc.data().Question;
      this.Question.Ans1 = doc.data().Ans1;
      this.Question.Ans2 = doc.data().Ans2;
      this.Question.Ans3 = doc.data().Ans3;
      this.Question.Ans4 = doc.data().Ans4;
      this.Question.GoodAns = doc.data().GoodAns;
      this.Question.Textarea = doc.data().Textarea;
      this.Question.Image = doc.data().Image;
      this.Question.Id = doc.id;
    });
  }
};
</script>