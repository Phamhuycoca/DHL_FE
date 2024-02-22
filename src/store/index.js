import { createStore } from 'vuex'
import loadingStore from './modules/loadingStore';
import authStore from './modules/authStore';

export default createStore({
  state() {
    return {}
  },
  modules: {
    loadingStore:loadingStore,
    authStore:authStore
  }
})
