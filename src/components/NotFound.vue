<template>
  <div class="error ma-3 text-xs-center">
    <h1 dark class="display-4">404</h1>
    <br>
    <h1 dark class="display-3">Strona nie istnieje!</h1>
    <v-btn large round class="warning" @click="goBack()">Powrót na poprzednią stronę</v-btn>
    <v-btn large round class="warning" router :to="{name: 'Index'}">Powrót na stronę główną</v-btn>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

