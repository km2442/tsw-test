<template>
  <div>
    <div class="AdminView">
      <h3 class="title">Panel administracyjny</h3>
      <a class="waves-effect waves-light btn" @click="toggleQuestionsVisibility()">Wyświetl wszystkie pytania</a>
      <a class="waves-effect waves-light btn">Dodaj pytanie</a>
    </div>
    <div v-if="showQuestions" style="margin-top: 20px; margin-bottom: 10px;">
        <div class="card blue-grey darken-1" v-for="(Question, index) in Questions" :key="index">
        <div class="card-content white-text" style="padding-bottom:0px">
          <span class="card-title">Pytanie {{index + 1}}</span>
          <p>{{Question.Question}}</p>
          <div v-if="Question.Textarea != ''">
            <br>
            <p v-for="(row, index) in prepareTextArea(Question.Textarea)" :key="index">{{row}}</p>
          </div>
          <div v-if="Question.Image != ''">
            <br>
            <img :src="Question.Image" />
          </div>
        </div>
        <hr>
        <div class="Answers">
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź A: {{Question.Ans1}}</span>
          </label>
          <hr class="customhr">
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź B: {{Question.Ans2}}</span>
          </label>
          <hr class="customhr">
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź C: {{Question.Ans3}}</span>
          </label>
          <hr class="customhr">
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź D: {{Question.Ans4}}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from './firebase/init'

export default {
  name: 'Admin',
  data () {
    return {
        Questions: [],
        showQuestions: false
    }
  },
  methods: {
      toggleQuestionsVisibility(){
          this.showQuestions = true;
    },
    prepareTextArea(text){
      return text.split("\\n");
    },
    imageFromString(str){
      var image = new Image();
      image.src = str;
      console.log(image);
      return image;
    }
  },
  created(){
    db.collection('Questions').get()
      .then((snapshot) => {
      snapshot.forEach((doc) => {
        var Question = doc.data();
        Question.Id = doc.id;
        this.Questions.push(Question);
    });
  })
    .catch((err) => {
    console.log('Error getting documents', err);
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AdminView {
    text-align: center;
    padding: 20px;
}
.title {
    color: white;
    margin: 0px 0px 20px 0px;
}
.btn {
    margin: 10px
}
.Answers {
  padding: 2.5%
}
span .AnsT {
  color: white;
}
hr.customhr {
  border-top: 2px dashed whitesmoke;
}
</style>