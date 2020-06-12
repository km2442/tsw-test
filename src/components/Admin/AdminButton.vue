<template>
  <div>
    <v-card class="mx-5 my-2 rounded-lg" v-ripple :color="color" style="cursor: pointer;">
      <v-container fill-height fluid>
        <v-row align="center" justify="center">
          <v-card-title>
            <v-icon large left>{{ icon }}</v-icon>
            <span
              class="text-h6 text-center text-uppercase font-weight-bold"
            >{{ text }}</span>
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