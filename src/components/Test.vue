<template>
  <div class="index container" style="margin-top: 20px; margin-bottom: 10px;">
    <div class="card blue-grey darken-1" v-for="(Question, index) in Questions" :key="index">
      <div class="card-content white-text" style="padding-bottom:0px">
        <span class="card-title">Pytanie {{index + 1}}</span>
        <p>{{Question.Question}}</p>
        <div class="textarea" v-if="Question.Textarea != ''">
          <p v-for="(row, index) in prepareTextArea(Question.Textarea)" :key="index">{{row}}</p>
        </div>
        <div v-if="Question.Image != ''">
          <img :src="Question.Image">
        </div>
      </div>
      <hr>
      <div class="Answers">
        <label>
          <input type="checkbox" class="filled-in">
          <span class="AnsT">Odpowiedź A: {{Question.Ans1}}</span>
        </label>
        <hr>
        <label>
          <input type="checkbox" class="filled-in">
          <span class="AnsT">Odpowiedź B: {{Question.Ans2}}</span>
        </label>
        <hr>
        <label>
          <input type="checkbox" class="filled-in">
          <span class="AnsT">Odpowiedź C: {{Question.Ans3}}</span>
        </label>
        <hr>
        <label>
          <input type="checkbox" class="filled-in">
          <span class="AnsT">Odpowiedź D: {{Question.Ans4}}</span>
        </label>
      </div>
    </div>
    <div>
      <button
        class="btn waves-effect waves-light disabled"
        type="submit"
        name="action"
        style="width: 100%"
      >
        Zakończ Test
        <i class="material-icons right">send</i>
      </button>
    </div>
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
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Answers {
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
}
</style>