<template>
  <div>
    <transition enter-active-class="animated rotateIn" leave-active-class="animated rotateOut">
      <v-hover>
        <template v-slot="{ hover }">
          <v-btn
            fixed
            bottom
            :large="hover ? false : true"
            :x-large="hover ? true : false"
            :rounded="hover ? true : false"
            right
            :fab="hover ? false : true"
            :elevation="10"
            color="primary"
            v-if="scrollPos || hover"
            class="transition-swing"
            @click="$vuetify.goTo('#app')"
          >
            <span>{{hover ? 'Wróć na górę' : ''}}</span>
            <v-icon
              :large="hover ? true : false"
              :right="hover ? true : false"
            >mdi-arrow-collapse-up</v-icon>
          </v-btn>
        </template>
      </v-hover>
    </transition>
  </div>
</template>

<script>
export default {
    data() {
        return {
            scrollPos: 0
        }
    },
    mounted() {
    window.addEventListener("scroll", () => {
      var scrollPos = window.scrollY;
      var winHeight = window.innerHeight;
      var docHeight = document.documentElement.scrollHeight; // instead document.body.clientHeight
      var perc = (100 * scrollPos) / (docHeight - winHeight);
      this.scrollPos = perc;
    });
  }
}
</script>