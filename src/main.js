import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

loadFonts()

createApp(App)
  .use(router)
  .use(Toast, {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
  })
  .use(store)
  .use(vuetify)
  .mount('#app')
