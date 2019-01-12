<template>
  <div>
    <div class="Welcome">
      <div class="card-panel light-blue darken-4" style="margin: 2%; padding: 3%;">
        <div class="card-content white-text">
          <span class="card-title" style="text-align: center">
            <h4>Witaj na przykładowym teście z Technologii Sieci Web</h4>
          </span>
          <hr>
          <h5 style="text-align: center">Instrukcja</h5>
          <div>
            <ul class="browser-default">
              <li>Test powinieneś wykonać w ciągu 60 minut</li>
              <li>Test składa się z 30 pytań, każde po 1 punkt</li>
              <li>
                Test jest w formie pytań ABCD wielokrotnego wyboru - każde pytanie może mieć zero,
                jedną, wiele lub wszystkie poprawne odpowiedzi
              </li>
              <li>Zaznacz symbolem ☑ tylko poprawne odpowiedzi</li>
              <li>Punktacja: 18 – 19pkt 3.0, 20 – 22pkt 3.5, 23 - 25pkt 4.0, 26 - 28pkt 4.5, 29 - 30pkt 5.0</li>
            </ul>
          </div>
          <hr>
          <h5 style="text-align: center">Powodzenia!</h5>
        </div>
      </div>
    </div>
    <div class="Test">
      <router-link style="color: white" :to="{ name: 'Test'}">
        <button class="waves-effect waves-light btn">Rozpocznij test</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      Questions: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Test {
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 5%;
}
.btn {
  width: 100%;
}
</style>
