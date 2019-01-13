<template>
  <div class="mb-4 mx-3">
    <h1 block dark large class="ma-3 text-xs-center">Dodaj pytanie</h1>
    <v-card class="light-grey darken-3 mb-2">
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
    </v-card>
    <h2 block dark large class="ma-3 text-xs-center">Podgląd</h2>
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
    <v-btn block disabled color="green darken-3 mb-2" dark>
      <span>Dodaj pytanie</span>
      <v-icon dark right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
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
      Image: ""
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
  }
};
</script>
