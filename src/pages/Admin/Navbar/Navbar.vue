<template>
    <div>
        <v-app-bar prominent style="cursor: pointer;background-color: #e27e40;" height="80">
            <v-toolbar-title>
                Admin Dashboard
                <v-icon icon="mdi-monitor-dashboard"></v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-responsive class="mx-auto" max-width="344">
                <v-text-field label="Search" hide-details="auto" prepend-inner-icon="mdi-magnify"></v-text-field>
            </v-responsive>

            <!-- <v-menu v-model="menu_bell" :close-on-content-click="false" location="start">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" class="mx-auto" width="70">
                        <v-list-item-content style="font-size:35px">
                            <v-badge content="2" color="error" style="font-size:20px;">
                                <v-icon>mdi-bell-outline</v-icon>
                            </v-badge>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <v-card min-width="200">
                    <v-list>
                        <v-list-item :prepend-avatar="userInfo.avatar" :title="userInfo.name"
                            :subtitle="userInfo.email"></v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list density="compact">
                        <v-list-item prepend-icon="mdi-information" title="Thông tin tài khoản"
                            value="Thông tin tài khoản"></v-list-item>
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Đăng xuất"
                            @click="confirmLogout"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu> -->
            <!-- <v-menu v-model="menu" :close-on-content-click="false" location="end">
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
                        <v-list-item prepend-icon="mdi-information" :to="'/admin/user'" title="Thông tin tài khoản"
                            value="Thông tin tài khoản"></v-list-item>
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Đăng xuất"
                            @click="confirmLogout"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu> -->
            <v-menu v-model="menu" :close-on-content-click="false" location="end" open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-list-item icon v-bind="props"
                        :prepend-avatar="userInfo.Avatar !== '' ? userInfo.Avatar : 'https://localhost:7125/Images/673eb8c4-cc38-4d4b-8dde-730653c71ad5.jpg'"></v-list-item>
                </template>
                <v-card max-width="300" width="300">
                    <v-list>
                        <v-list-item
                            :prepend-avatar="userInfo.Avatar !== '' ? userInfo.Avatar : 'https://localhost:7125/Images/673eb8c4-cc38-4d4b-8dde-730653c71ad5.jpg'"
                            :title="userInfo.FullName" :subtitle="userInfo.Email"></v-list-item>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list density="compact">
                        <v-list-item prepend-icon="mdi-information" :to="'/admin/user'" title="Thông tin tài khoản"
                            value="Thông tin tài khoản"></v-list-item>
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Đăng xuất"
                            @click="confirm = true"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>
        <confirm :message="'Bạn có muốn đăng xuất ?'" :confirm="confirm" @remove="Logout()" @close="confirm = false" />
    </div>
</template>
    
<script>
import { mapGetters, mapActions } from 'vuex';
import userAPI from '../../../services/user';
import Confirm from '@/components/Confirm/Confirm.vue';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: "NarbarView",
    data() {
        return {
            userInfo: {
                // avatar: "https://firebasestorage.googleapis.com/v0/b/thitracnghiem-830f0.appspot.com/o/category/1695722799093?alt=media&token=96ae3867-23e5-4a52-86c9-8de03bd1ba53",
                // name: "Phạm Khắc Huy",
                // email: "Phamkhachuyaaaaaaaaaaaa240702@gmail.com"
            },
            menu: false,
            menu_bell: false,
            confirm: false,
        };
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
        ...mapActions('authStore', ['Login', 'ResetToken']),
        Logout() {
            this.ResetToken();
            toast.success('Đăng xuất thành công');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        },
        GetProfile() {
            userAPI._getById(this.getuserId).then(res => {
                this.userInfo = res.data;
            }).catch(error => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.GetProfile();
    },
    components: { Confirm }
};
</script>
<style scoped>
.v-list-item__content {
    width: 38px;
    font-size: 30px;
}
</style>
     