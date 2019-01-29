<template>
  <div class="ma-3">
    <v-card class="light-blue darken-3">
      <h3 class="display-1 py-3 text-xs-center">Witaj na przykładowym teście z Technologii Sieci Web</h3>
      <v-divider></v-divider>
      <div>
        <h4 class="display-1 py-3 text-xs-center">Instrukcja</h4>
        <div>
          <ul class="browser-default headline px-5">
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
  name: "Instruction",
  data() {
    return {};
  }
};
</script>