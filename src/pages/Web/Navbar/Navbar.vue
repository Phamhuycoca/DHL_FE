<template>
    <div>
        <v-app-bar prominent style="cursor: pointer;" height="80" scroll-behavior="inverted elevate collapse"
            scroll-threshold="0">
            <div class="d-flex">
                <v-toolbar-title>
                    <router-link to="/">
                        <v-img height="100" style="margin: 5px;border-radius: 2px;background-color: white;" :width="200"
                            aspect-ratio="16/9"
                            src="https://dainam.edu.vn/admin/upload/logo/8tedlgbzwga59lkxpcq120200504091307_thump.png"></v-img>
                    </router-link>
                </v-toolbar-title>
                <router-link class="ml-4 text-subtitle-1 font-weight-regular" style="margin-top:42px;text-decoration: none;"
                    to="/post-list">
                    Bài viết
                </router-link>
                <v-menu transition="slide-y-transition" open-on-hover>
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" style="margin-top:42px;" class="ml-4 text-subtitle-1 font-weight-regular">
                            Tin tức
                        </div>
                    </template>
                    <v-list style="margin-top:-40px;">
                        <v-list-item v-for="(item, i) in departments" :key="i" style="cursor: pointer;">
                            <v-list-item-title>{{ item.DepartmentName }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
            <v-menu v-model="menu_bell" :close-on-content-click="false" location="start" open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" class="mx-auto" width="70">
                        <v-list-item-content style="font-size:35px">
                            <v-badge content="2" color="error" style="font-size:20px;">
                                <v-icon>mdi-bell-outline</v-icon>
                            </v-badge>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-card min-width="420">
                    a
                </v-card>
            </v-menu>
            <v-menu v-model="menu" :close-on-content-click="false" location="end" open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-list-item icon v-bind="props" :prepend-avatar="userInfo.avatar"></v-list-item>
                </template>
                <v-card min-width="200">
                    <v-list>
                        <v-list-item :prepend-avatar="userInfo.avatar" :title="userInfo.name"
                            :subtitle="userInfo.email"></v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list density="compact">
                        <v-list-item prepend-icon="mdi-information" :to="'/account'" title="Thông tin tài khoản"
                            value="Thông tin tài khoản"></v-list-item>
                        <v-list-item prepend-icon="mdi-post" :to="'/post-view'" title="Danh sách bài viết"
                            value="Danh sách bài viết"></v-list-item>
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Đăng xuất"
                            @click="confirmLogout"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
    </div>
</template>
    
<script>
import departmentAPI from '../../../services/department';
export default {
    name: "NarbarView",
    data() {
        return {
            departments: [],
            userInfo: {
                avatar:
                    "https://firebasestorage.googleapis.com/v0/b/thitracnghiem-830f0.appspot.com/o/category%2F1695722799093?alt=media&token=96ae3867-23e5-4a52-86c9-8de03bd1ba53",
                name: "Phạm Khắc Huy",
                email: "Phamkhachuy240702@gmail.com"
            },
            menu: false,
            menu_bell: false,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
            ],
        };
    },
    methods: {
        Logout() {
            this.$store.dispatch('Logout')
            this.$router.push('/')
        },
        logout() {
            this.$router.push("/");
        },
        confirmLogout() {
            this.$refs.dialog.openDialog();
        },
        GetDepartments() {
            departmentAPI._getAll().then(res => {
                this.departments = res.data
            }).catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.GetDepartments();
    }

};
</script>
<style scoped>
.v-list-item__content {
    width: 38px;
    font-size: 30px;
}
</style>
     