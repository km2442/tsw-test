<template>
  <div class="index container" style="margin-top: 20px; margin-bottom: 10px;">
    <div class="card blue-grey darken-1" v-for="(Question, index) in Questions" :key="index">
        <div class="card-content white-text">
          <span class="card-title">Pytanie {{index + 1}}</span>
          <p>{{Question.Question}}</p>
        </div>
        <hr>
        <div class="Answers">
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź A: {{Question.Ans1}}</span>
          </label>
          <br>
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź B: {{Question.Ans2}}</span>
          </label>
          <br>
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź C: {{Question.Ans3}}</span>
          </label>
          <br>
          <label>
            <input type="checkbox" class="filled-in" />
            <span class="AnsT">Odpowiedź D: {{Question.Ans4}}</span>
          </label>
        </div>
      </div>
      <div>
        <button class="btn waves-effect waves-light disabled" type="submit" name="action" style="width: 100%">Zakończ Test
          <i class="material-icons right">send</i>
        </button>
      </div>
  </div>
</template>

<script>
  import db from './firebase/init'

export default {
  name: 'Test',
  data () {
    return {
        Questions: []
    }
  },
  created(){
    db.collection('Questions').get()
      .then((snapshot) => {
      snapshot.forEach((doc) => {
      this.Questions.push(doc.data());
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
.Answers {
  padding: 2.5%
}
span .AnsT {
  color: white;
}
</style>