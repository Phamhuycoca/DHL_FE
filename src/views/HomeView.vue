<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '@/pages/Web/Navbar/Navbar.vue';
import Footer from '../pages/Web/Footer/Footer.vue'
export default {
  name: 'HomeView',
  components: { Navbar, Footer }
}
</script>

<style></style>