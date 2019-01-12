<template>
  <div class="ma-2">
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex xs12 md6 v-for="(Question, index) in Questions" :key="index">
          <v-card class="light-grey darken-3 ma-2">
            <v-card-title class="pa-3">
              <div>
                <h3 class="headline mb-0">Pytanie {{index + 1}}</h3>
                <div>{{Question.Question}}</div>
                <br>
                <div v-if="Question.Textarea != ''">
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
            </v-card-title>
            <v-divider dark></v-divider>
            <div class="pa-3">
              <v-checkbox :label="``" color="green" class="ma-0 pa-0">
                <span slot="label">Odpowiedź A: {{Question.Ans1}}</span>
              </v-checkbox>
              <v-checkbox :label="``" color="green" class="ma-0 pa-0">
                <span slot="label">Odpowiedź B: {{Question.Ans2}}</span>
              </v-checkbox>
              <v-checkbox :label="``" color="green" class="ma-0 pa-0">
                <span slot="label">Odpowiedź C: {{Question.Ans3}}</span>
              </v-checkbox>
              <v-checkbox :label="``" color="green" class="ma-0 pa-0">
                <span slot="label">Odpowiedź D: {{Question.Ans4}}</span>
              </v-checkbox>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn block disabled color="green darken-3 my-3" dark>
      <span>Zapisz wyniki testu</span>
      <v-icon dark right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
import db from "./firebase/init";

export default {
  name: "Test",
  data() {
    return {
      Questions: []
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .Answers {
  padding: 1%;
}
.card-content {
  padding-top: 5px;
}
.AnsT {
  color: white;
}
.textarea {
  border: 1px dashed;
  margin-top: 5px;
  padding: 3px;
} */
</style>