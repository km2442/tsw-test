<template>
  <div>
    <div class="mb-3">
      <v-carousel :cycle="!$vuetify.breakpoint.smAndDown">
        <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src">
          <p
            class="light-blue darken-3 headline text-xs-center main-carousel"
            style="position: absolute; bottom:10%; width:80%; border-radius: 25px; border: 2px solid; left: 10%;"
          >{{img.text}}</p>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="hidden-sm-and-down">
      <v-parallax :src="require('../assets/imgs/paralax.jpg')">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3 black">Quiz</h1>
          <h4 class="subheading black">Z Technologii Sieci WEB</h4>
        </v-layout>
      </v-parallax>
    </div>
    <div class="ma-3">
      <v-card class="light-blue darken-3">
        <h3 class="display-2 py-3 text-xs-center text-uppercase">O witrynie</h3>
        <v-divider></v-divider>
        <div class="px-4">
          <p class="headline pb-4">Witryna <b>Quiz PRO</b> stanowi serwis przedmiotu "<b>Technologie Sieci WEB</b>" prowadzonego na Wydziale Elektrotechniki i Informatyki Politechniki Rzeszowskiej (WEiI PRz).<br>
          Wykładowcą przedmiotu "Technologie Sieci WEB" na WEiI PRz jest <b>Dr hab. inż. Jan PROKOP, prof. PRz</b>.<br>
          Zawartość serwisu przeznaczona jest głównie dla studentów kierunku Informatyka WEiI PRz uczestniczących w zajęciach, a także dla wszystkich pasjonatów Technologii Sieci Web.
          </p>
        </div>
      </v-card>
    </div>
    <div class="ma-3">
      <v-btn
        block
        round
        color="green darken-3"
        router
        :to="{ name: 'Instruction'}"
      >Przejdź do instrukcji wykonania testu</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      imgs: [
        { src: "imgs/carousel-1.jpg", text: "Technologie sieci web 1" },
        { src: "imgs/carousel-2.jpg", text: "Technologie sieci web 2" },
        { src: "imgs/carousel-3.jpg", text: "Technologie sieci web 3" }
      ]
    };
  }
};
</script>