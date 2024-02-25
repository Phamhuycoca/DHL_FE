<template>
    <v-navigation-drawer app style="background-color: #e9e6e6; ">
        <v-list>
            <v-list-subheader>DANH MỤC</v-list-subheader>
            <v-list-item v-for="(item, i) in links" :key="i" :value="item" color="black" :to="item.link">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <!-- eslint-disable -->
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script>
export default {
    name: 'SideBar',
    data() {
        return {
            links: [
                { icon: 'mdi-chart-bar', text: 'Trang chủ', link: '/admin/dashboard' },
                { icon: 'mdi-chart-bar', text: 'Quản lý khoa', link: '/admin/department' },
                { icon: 'mdi-note-text-outline', text: 'Quản lý tin tức', link: '/admin/news' },
                // { icon: 'mdi-note-text-outline', text: 'Quản lý bài viết', link: '/admin/post' },    
            ]
        }
    }
}
</script>
  
<style></style>