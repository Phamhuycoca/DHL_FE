<template>
  <div>
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
    <loading />
  </div>
</template>

<script>
import Loading from './components/Loading/Loading.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: { Loading },
  methods: {
    ...mapActions('authStore', ['Login', 'Refresh'])
  },
  mounted() {
    this.Refresh();
  }
}
</script>
