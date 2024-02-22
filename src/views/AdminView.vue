<template>
    <v-app>
        <NavbarVue />
        <SidebarVue />
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import NavbarVue from '../pages/Admin/Navbar/Navbar.vue'
import SidebarVue from '../pages/Admin/Sidebar/Sidebar.vue'
export default {
    name: 'AdminView',
    components: {
        NavbarVue,
        SidebarVue
    },
    methods: {

    },
    mounted() {
        // setInterval(() => {
        // userId._getUserId()
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         if (err.response && err.response.status === 401) {
        //             setTimeout(() => {
        //                 window.location.href = '/login';
        //             }, 3000);
        //         }
        //     });
        // }, 10 * 60 * 1000);



    }
}
</script>

<style></style>