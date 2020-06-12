import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import pl from 'vuetify/es5/locale/pl';
import en from 'vuetify/es5/locale/en';

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { pl, en },
    current: 'pl',
  },
  theme: {
    options: { variations: false }
  }
});
