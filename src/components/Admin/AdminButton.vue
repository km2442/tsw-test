<template>
  <div>
    <v-card class="mx-5 my-2" :color="color" style="cursor: pointer;">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-card-title>
            <v-icon large left>{{ icon }}</v-icon>
            <span class="title text-center font-weight-bold">{{ text.toUpperCase() }}</span>
          </v-card-title>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [ "color", "text", "icon" ]
};
</script>