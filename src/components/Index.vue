<template>
  <div class="ma-3">
    <div class="mb-3">
      <v-carousel>
    <v-carousel-item
      v-for="(img, i) in imgs"
      :key="i"
      :src="img.src"
    >
    <p class="green darken-4 headline text-xs-center main-carousel" style="position: absolute; bottom:10%; width:80%; border-radius: 25px; border: 2px solid; left: 10%;">{{img.text}}</p>
    </v-carousel-item>
    
  </v-carousel>
    </div>
    <v-card class="light-blue darken-3">
      <h3 class="headline py-3 text-xs-center">Witaj na przykładowym teście z Technologii Sieci Web</h3>
      <v-divider></v-divider>
      <div>
        <h4 class="headline py-3 text-xs-center">Instrukcja</h4>
        <div>
          <ul class="browser-default px-5">
            <li>Ns test przeznaczone jest 60 minut</li>
            <li>Test składa się z 30 pytań, za każde możesz otrzymać 1 punkt</li>
            <li>Test jest w formie pytań ABCD wielokrotnego wyboru - każde pytanie może mieć zero, jedną, wiele lub wszystkie poprawne odpowiedzi</li>
            <li>Zaznacz symbolem ☑ tylko poprawne odpowiedzi</li>
            <li>Punktacja: 18 – 19pkt 3.0, 20 – 22pkt 3.5, 23 - 25pkt 4.0, 26 - 28pkt 4.5, 29 - 30pkt 5.0</li>
          </ul>
        </div>
        <v-divider></v-divider>
        <h4 class="headline py-3 text-xs-center">Powodzenia!</h4>
      </div>
    </v-card>
    <v-btn block round color="green darken-3 my-3" router :to="{ name: 'Test'}">Rozpocznij test!</v-btn>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      imgs: [
        {src: 'imgs/carousel-1.jpg', text: "Technologie sieci web 1"},
        {src: 'imgs/carousel-2.jpg', text: "Technologie sieci web 2"},
        {src: 'imgs/carousel-3.jpg', text: "Technologie sieci web 3"}
      ]
    };
  }
};
</script>
