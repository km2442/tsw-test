<template>
  <div>
    <footer class="page-footer">
      <div class="container up">
        <a class="grey-text text-lighten-3 browser-default" href="#" style="text-decoration: underline">Powrót na górę strony</a>
        <br>
        <router-link class="grey-text text-lighten-3 browser-default" :to="{name: 'Index'}" v-if="this.$route !== 'Index'" style="text-decoration: underline">Powrót na stronę główną</router-link>
      </div>
      <div class="footer-copyright">
        <div class="container">
        <p>Copyright © 2019 Politechnika Rzeszowska Autor: Kamil Klecha</p>
        </div>
      </div>
    </footer>
  </div>
    
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
.page-footer {
  background-color: green;
  padding-top: 0px;
}
.up {
  padding: 1%;
  text-align: center;
}
</style>