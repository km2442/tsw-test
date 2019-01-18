<template>
  <div class="mb-4 mx-3">
    <h1 block dark large class="ma-3 text-xs-center">Dodaj pytanie</h1>
    <v-card class="light-grey darken-3 pa-2">
      <div class="px-5">
        <v-text-field clearable dark label="Pytanie" v-model="Question"></v-text-field>
        <v-text-field
          clearable
          dark
          label="Pole z kodem (opcjonalne)"
          hint="Zwiń kod do jednej linii i zamień znaki końca linii na \n"
          v-model="Textarea"
        ></v-text-field>
        <v-divider></v-divider>
        <h3 block dark large class="ma-2 text-xs-center grey--text">(Opcjonalne) Dodaj obrazek</h3>
        <div>
          <v-container class="pa-0">
            <v-layout row wrap justify-space-between>
              <v-flex xs-12 md-6 class="mx-3">
                <input
                  style="display: none"
                  type="file"
                  accept="image/*"
                  @change="onFileSelected"
                  ref="fileInput"
                >
                <v-btn block round dark color="green" @click="$refs.fileInput.click()">
                  <span>Wybierz obrazek</span>
                  <v-icon dark right>add_circle</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs-12 md-6 class="mx-3">
                <v-btn
                  block
                  round
                  dark
                  color="green"
                  @click="uploadImage"
                  :disabled="selectedFile == ''"
                >
                  <span>Wgraj plik</span>
                  <v-icon dark right>cloud_upload</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-text-field readonly dark label="Plik" v-model="selectedFile.name"></v-text-field>
          <v-progress-linear color="success" v-model="uploadState"></v-progress-linear>
        </div>
        <v-divider></v-divider>
        <h2 block dark large class="mt-3 text-xs-center">Zaznacz, które odpowiedzi są prawidłowe</h2>
        <div class="pa-0">
          <v-container class="pa-0">
            <v-flex xs12>
              <v-layout>
                <v-flex class="mr-3" xs1>
                  <v-checkbox color="green" v-model="GoodAns[0]"></v-checkbox>
                </v-flex>
                <v-flex xs11>
                  <v-text-field clearable dark label="Odpowiedź A" v-model="Ans1"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-flex class="mr-3" xs1>
                  <v-checkbox color="green" v-model="GoodAns[1]"></v-checkbox>
                </v-flex>
                <v-flex xs11>
                  <v-text-field clearable dark label="Odpowiedź B" v-model="Ans2"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-flex class="mr-3" xs1>
                  <v-checkbox color="green" v-model="GoodAns[2]"></v-checkbox>
                </v-flex>
                <v-flex xs11>
                  <v-text-field clearable dark label="Odpowiedź C" v-model="Ans3"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout>
                <v-flex class="mr-3" xs1>
                  <v-checkbox color="green" v-model="GoodAns[3]"></v-checkbox>
                </v-flex>
                <v-flex xs11>
                  <v-text-field clearable dark label="Odpowiedź D" v-model="Ans4"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-container>
        </div>
      </div>
      <v-btn block dark round color="error" @click="clearAddForm()">
        <span>Wyczyść formularz</span>
        <v-icon dark right>delete</v-icon>
      </v-btn>
    </v-card>
    <h2 block dark large class="ma-3 text-xs-center">Podgląd</h2>
    <!-- Podgląd pytania -->
    <div class="mb-4">
      <v-card class="light-grey darken-3 mb-2">
        <v-card-title class="pa-3">
          <div>
            <h3 class="headline mb-0">Pytanie [numer]</h3>
            <div>{{Question}}</div>
          </div>
        </v-card-title>
        <div class="ma-2">
          <div v-if="Textarea != ''" class="pa-2" style="border: 1px dashed;">
            <p
              class="ma-0 pa-0"
              v-for="(row, index) in prepareTextArea(Textarea)"
              :key="index"
            >{{row}}</p>
          </div>
          <div v-if="Image != ''">
            <img :src="Image">
          </div>
        </div>
        <v-divider dark></v-divider>
        <div class="pa-3">
          <v-label>Odpowiedź A: {{Ans1}}</v-label>
          <v-divider dark></v-divider>
          <v-label>Odpowiedź B: {{Ans2}}</v-label>
          <v-divider dark></v-divider>
          <v-label>Odpowiedź C: {{Ans3}}</v-label>
          <v-divider dark></v-divider>
          <v-label>Odpowiedź D: {{Ans4}}</v-label>
        </div>
      </v-card>
    </div>
    <v-btn block dark color="green darken-3" @click="addQuestion()">
      <span>Dodaj pytanie</span>
      <v-icon dark right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from "./firebase/init";
var db = firebase.firestore();
export default {
  name: "AddQuestion",
  data() {
    return {
      Question: "",
      Ans1: "",
      Ans2: "",
      Ans3: "",
      Ans4: "",
      GoodAns: [false, false, false, false],
      Textarea: "",
      Image: "",
      selectedFile: "",
      uploadState: 0
    };
  },
  methods: {
    prepareTextArea(text) {
      return text.split("\\n");
    },
    addQuestion() {
      db.collection("Questions")
        .add({
          Question: this.Question,
          Ans1: this.Ans1,
          Ans2: this.Ans2,
          Ans3: this.Ans3,
          Ans4: this.Ans4,
          GoodAns: this.GoodAns,
          Textarea: this.Textarea,
          Image: this.Image
        })
        .then(() => {
          this.$router.push({ name: "Admin" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearAddForm() {
      (this.Question = ""),
        (this.Ans1 = ""),
        (this.Ans2 = ""),
        (this.Ans3 = ""),
        (this.Ans4 = ""),
        (this.GoodAns = [false, false, false, false]),
        (this.Textarea = ""),
        (this.Image = ""),
        (this.selectedFile = ""),
        (this.uploadState = 0);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage() {
      var storage = firebase.storage();
      var img = String(Date.now()) + "_" + this.selectedFile.name;
      var task = storage.ref("images/" + img).put(this.selectedFile);
      var vm = this;
      task.on(
        "state_changed",
        function(snapshot) {
          var precentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          vm.uploadState = precentage;
        },
        function error(e) {},
        function() {
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            vm.Image = downloadURL;
          });
        }
      );
    }
  }
};
</script>
