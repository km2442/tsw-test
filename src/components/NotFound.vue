<template>
  <div class="red pa-3 text-center" style="height: 100%">
    <h1 class="text-h1 font-weight-black">404</h1>
    <h1 class="text-h2 font-weight-bold">Strona nie istnieje!</h1>
    <v-container class="pa-1">
      <v-layout row wrap justify-space-between>
        <v-flex xs12 :md6="$router.history.length > 0" class="mx-2">
          <v-btn large block rounded class="amber darken-2" router :to="{name: 'Index'}">
            <span>Powrót na stronę główną</span>
            <v-icon large right>mdi-home</v-icon>
          </v-btn>
        </v-flex>
        <v-flex v-if="$router.history.length > 0" xs12 md6 class="mx-2">
          <v-btn large block rounded class="amber darken-2" @click="$router.go(-1);">
            <span>Powrót na poprzednią stronę</span>
            <v-icon large right>mdi-keyboard-return</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>