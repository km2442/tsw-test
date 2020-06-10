<template>
  <div class="mb-4 mx-3">
    <h1 block large class="ma-3 text-center">Dodaj pytanie</h1>
    <QuestionEditor :buttons="buttons" preload="no" @acceptQuestion="addQuestion($event)"></QuestionEditor>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "../../js/axiosData";
const QuestionEditor = () =>
  import(/* webpackChunkName: "QuestionEditor" */ "./QuestionEditor");
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
      axios
        .post(
          "Questions",
          {
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
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.token
            }
          }
        )
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