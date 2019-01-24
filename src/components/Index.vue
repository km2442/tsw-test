<template>
  <div>
    <div class="mb-3">
      <v-carousel>
        <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src">
          <p
            class="light-blue darken-3 headline text-xs-center main-carousel"
            style="position: absolute; bottom:10%; width:80%; border-radius: 25px; border: 2px solid; left: 10%;"
          >{{img.text}}</p>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div>
      <v-parallax src="imgs/carousel-1.jpg">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">Quiz</h1>
          <h4 class="subheading">Z Technologii Sieci WEB</h4>
        </v-layout>
      </v-parallax>
    </div>
    <div class="mx-3">
      <v-btn
        block
        round
        color="green darken-3 my-3"
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