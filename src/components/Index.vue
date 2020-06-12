<template>
  <div>
    <div class="mb-3">
      <v-carousel :cycle="!$vuetify.breakpoint.smAndDown">
        <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src">
          <v-card
            class="rounded-pill pa-3"
            color="rgba(3, 169, 244, 0.75)"
            width="80%"
            style="position: absolute; bottom:10%; left: 10%;"
          >
            <p class="text-h5 text-center mb-0">{{img.text}}</p>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="hidden-sm-and-down">
      <v-parallax :src="require('../assets/imgs/paralax.jpg')">
        <v-layout align-center column justify-center>
          <v-card class="dark rounded-xl pa-6" color="rgba(0, 0, 0, 0.5)">
            <p class="text-h3 text-center text-uppercase font-weight-thin mb-3">Quiz</p>
            <p class="subheading text-center">Z Technologii Sieci WEB</p>
          </v-card>
        </v-layout>
      </v-parallax>
    </div>
    <div class="ma-3">
      <v-card class="light-blue darken-3">
        <h3 class="text-h3 py-3 text-center text-uppercase">O witrynie</h3>
        <v-divider></v-divider>
        <div class="px-4">
          <p class="text-h5 pb-4">
            Witryna
            <b>Quiz PRO</b> stanowi serwis przedmiotu "
            <b>Technologie Sieci WEB</b>" prowadzonego na Wydziale Elektrotechniki i Informatyki Politechniki Rzeszowskiej (WEiI PRz).
            <br />Wykładowcą przedmiotu "Technologie Sieci WEB" na WEiI PRz jest
            <b>Dr hab. inż. Jan PROKOP, prof. PRz</b>.
            <br />Zawartość serwisu przeznaczona jest głównie dla studentów kierunku Informatyka WEiI PRz uczestniczących w zajęciach, a także dla wszystkich pasjonatów Technologii Sieci Web.
          </p>
        </div>
      </v-card>
    </div>
    <div class="ma-3">
      <v-btn
        block
        rounded
        color="green darken-3"
        router
        :to="{ name: 'Instruction'}"
      >Przejdź do instrukcji wykonania testu</v-btn>
    </div>
    <goTop></goTop>
  </div>
</template>

<script>
const goTop = () => import(/* webpackChunkName: "goTop" */ "./Tools/goTop");
export default {
  components: {
    goTop
  },
  data() {
    return {
      imgs: [
        {
          src: require("../assets/imgs/carousel-1.jpg"),
          text: "Technologie Sieci Web"
        },
        {
          src: require("../assets/imgs/carousel-2.jpg"),
          text: "HTML i CSS"
        },
        {
          src: require("../assets/imgs/carousel-3.jpeg"),
          text: "Język Javascript"
        },
        {
          src: require("../assets/imgs/carousel-4.png"),
          text: "Język PHP"
        },
        {
          src: require("../assets/imgs/carousel-5.jpg"),
          text: "Responsywność"
        },
        {
          src: require("../assets/imgs/carousel-6.jpg"),
          text: "Strony przystosowane dla urządzeń mobilnych"
        },
        {
          src: require("../assets/imgs/carousel-7.jpg"),
          text: "Semantyczna Sieć Web"
        },
        {
          src: require("../assets/imgs/carousel-8.jpg"),
          text: "Technologie przyjazne dla użytkownika"
        }
      ]
    };
  }
};
</script>