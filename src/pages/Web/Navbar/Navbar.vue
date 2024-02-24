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
            <v-menu v-model="menu_bell" :close-on-content-click="false" location="start" open-on-hover v-if="getuserId">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" class="mx-auto" width="70">
                        <v-list-item-content style="font-size:35px">
                            <v-badge :content="totlals" color="error" style="font-size:20px;">
                                <v-icon>mdi-bell-outline</v-icon>
                            </v-badge>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <!-- <v-card min-width="420">
                    a
                </v-card> -->
                <v-card class="rounded-lg" min-width="500">
                    <v-card-title class="ma-2">Thông báo</v-card-title>
                    <v-list class="mb-2" style="max-height: 400px;overflow-y: auto;">
                        <v-list-item v-for="(item, index) in GetNotificationById(getuserId)" :key="index"
                            @click="ChangeComemt(item)">
                            <v-list-item-title>
                                <v-avatar class="mr-4">
                                    <v-img :src="item.Avatar" alt="John"></v-img>
                                </v-avatar>
                                {{ item.FullName }}
                            </v-list-item-title>
                            <v-list-item v-if="item.NewsId !== null">Đã bình luận tin tức</v-list-item>
                            <v-list-item v-if="item.PostId !== null">Đã bình luận bài
                                viết
                                của bạn</v-list-item>
                        </v-list-item>
                    </v-list>
                    <!-- <v-list v-else>
                        <p class="text-center">Không có bình luận nào</p>
                    </v-list> -->
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="SeenNoti()">Đọc tất cả</v-btn>
                    </v-card-actions>
                </v-card>
            </v-menu>
            <v-menu v-model="menu" :close-on-content-click="false" location="end" open-on-hover v-if="getuserId">
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
                        <v-list-item prepend-icon="mdi-information" :to="'/account'" title="Thông tin tài khoản"
                            value="Thông tin tài khoản"></v-list-item>
                        <v-list-item prepend-icon="mdi-post" :to="'/post-view'" title="Danh sách bài viết"
                            value="Danh sách bài viết"></v-list-item>
                        <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" value="Đăng xuất"
                            @click="confirm = true"></v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-icon v-else class="mr-4" @click="Login()">mdi-account</v-icon>
        </v-app-bar>
        <confirm :message="'Bạn có muốn đăng xuất ?'" :confirm="confirm" @remove="Logout()" @close="confirm = false" />
    </div>
</template>
    
<script>
import Confirm from '@/components/Confirm/Confirm.vue';
import departmentAPI from '../../../services/department';
import { mapGetters, mapActions } from 'vuex';
import { useToast } from 'vue-toastification'
import noticationAPI from '../../../services/notication';
import userAPI from '../../../services/user';
const toast = useToast()
export default {
    name: "NarbarView",
    data() {
        return {
            departments: [],
            userInfo: {
                // avatar: "https://firebasestorage.googleapis.com/v0/b/thitracnghiem-830f0.appspot.com/o/category/1695722799093?alt=media&token=96ae3867-23e5-4a52-86c9-8de03bd1ba53",
                // name: "Phạm Khắc Huy",
                // email: "Phamkhachuyaaaaaaaaaaaa240702@gmail.com"
            },
            menu: false,
            menu_bell: false,
            confirm: false,
            notis: [],
            totlals: 0
        };
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
        ...mapActions('authStore', ['Login', 'ResetToken']),
        Login() {
            this.ResetToken();
            window.location.href = '/login';
        },
        Logout() {
            this.ResetToken();
            toast.success('Đăng xuất thành công');
            setTimeout(() => {
                window.location.href = '/';

            }, 1000)
        },
        GetDepartments() {
            departmentAPI._getAll().then(res => {
                this.departments = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        GetNoti() {
            noticationAPI._getAlls().then(res => {
                this.notis = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        GetNotificationById(id) {
            const data = this.notis.filter(x => x.UserId == id);
            this.totlals = data.length;
            return data;
        },
        SeenNoti() {
            noticationAPI._seenNoti(this.getuserId).then(res => {
                this.GetNoti();
            }).catch(err => {
                console.log(err);
            })
        },
        ChangeComemt(item) {
            if (item.NewsId !== null) {
                noticationAPI._update(item.NotificationId, item).then(res => {
                    this.GetNotificationById(item.UserId);
                    this.GetNoti();
                }).catch(error => { console.log(error); });
                window.location.href = '/news-detail/' + item.NewsId;
            }
            if (item.PostId !== null) {
                noticationAPI._update(item.NotificationId, item).then(res => {
                    this.GetNoti();
                    this.GetNotificationById(item.UserId);
                }).catch(error => { console.log(error); });
                window.location.href = '/post-detail/' + item.PostId;
            }
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
        this.GetDepartments();
        this.GetNoti();
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
     