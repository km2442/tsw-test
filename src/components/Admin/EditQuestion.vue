<template>
  <div class="mb-4 mx-3">
    <h1 block large class="ma-3 text-center">Edytuj pytanie {{$route.params.questionId}}</h1>
    <QuestionEditor :buttons="buttons" preload="yes" @acceptQuestion="editQuestion($event)"></QuestionEditor>
  </div>
</template>

<script>
import QuestionEditor from "./QuestionEditor";
import axios from "../../js/axiosData";
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
      axios
        .patch("Questions/" + this.$route.params.questionId, {
          fields: {
            Question: { stringValue: payload.Question },
            Ans1: { stringValue: payload.Ans1 },
            Ans2: { stringValue: payload.Ans2 },
            Ans3: { stringValue: payload.Ans3 },
            Ans4: { stringValue: payload.Ans4 },
            GoodAns: {
              arrayValue: {
                values: [
                { booleanValue: payload.GoodAns[0] },
                { booleanValue: payload.GoodAns[1] },
                { booleanValue: payload.GoodAns[2] },
                { booleanValue: payload.GoodAns[3] }
              ]
              }
            },
            Textarea: { stringValue: payload.Textarea },
            Image: { stringValue: payload.Image }
          }
        }, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.token
          }
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