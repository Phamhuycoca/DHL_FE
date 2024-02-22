<template>
    <div class="px-10 ma-10">
        <v-row class="mt-3">
            <h3 class="ml-10">Danh sách bài viết</h3>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="dialog = true, currentData = ''">
                Tạo mới
            </v-btn>
        </v-row>
        <v-row class="mt-8">
            <v-col lg="12" v-for="(item, index) in posts" :key="index">
                <p class="ml-10">Bài viết thứ {{ index+=1 }}</p>
                <v-card class="ma-10" :class="{ 'custom-background-color': !item.IsStatus }">
                    <v-card-title>
                        {{ item.PostTittle }}
                    </v-card-title>
                    <v-card-item>
                        <v-row v-show="GetImagePostById(item.PostId).length > 0" class="mx-auto">
                            <v-col lg="6" md="6" sm="3" v-for="(image, index) in GetImagePostById(item.PostId)" :key="index"
                                class="text-center mx-auto">
                                <v-img :src="image.UrlApi + image.ImagePostUrl" height="250" cover></v-img>
                                <p class="text-center ma-4">Hình {{ index +=1 }}</p>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <v-card-text style="font-size: 18px;line-height: 1.8;">
                        {{ item.PostContent }}
                    </v-card-text>
                    <v-row class="ma-4">
                        <v-card-actions class="mx-auto">
                            <v-btn color="primary" @click="dialog = true, currentData = item">Chỉnh sửa nội
                                dung</v-btn>
                            <v-btn color="red" @click="confirm = true, remove = item.PostId">Xóa nội
                                dung</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <PostDialog :dialog="dialog" @updateData="GetPosts()" :currentData="currentData" @close="dialog = false" />
        <Confirm :message="'Bạn có muốn xóa thông tin ?'" :confirm="confirm" @remove="Remove" @close="confirm = false" />

    </div>
</template>

<script>
import PostDialog from '../../Web/Post/PostDialog.vue'
import postAPI from '../../../services/post'
import { mapGetters, mapActions } from 'vuex'
import imagepostAPI from '../../../services/imagepost'
import Confirm from '@/components/Confirm/Confirm.vue'
export default {
    name: 'PostView',
    components: {
        PostDialog,
        Confirm
    },
    data() {
        return {
            posts: [],
            dialog: false,
            currentData: '',
            remove: '',
            confirm: false,
            imagepost: []
        }
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetPosts() {
            console.log(this.getuserId)
            this.openLoading();
            postAPI._getAll(this.getuserId).then(res => {
                this.posts = res.data
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.GetImagePost();
                this.closeLoading();
            })
        },
        GetImagePost() {
            imagepostAPI._getAll().then(res => {
                this.imagepost = res.data;
            }).catch(err => {
                console.log(err.data);
            });
        },
        GetImagePostById(id) {
            const res = this.imagepost.filter(x => x.PostId === id);
            return res.slice(0, 4);
        },
        Remove() {
            this.openLoading();
            postAPI._delete(this.remove).then(res => {
                toast.success(res.data);
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.closeLoading();
                this.GetPosts();
                this.confirm = false;
            });
        },
    },
    mounted() {
        this.GetPosts();
        this.GetImagePost();
    }
}
</script>
<style scoped>
.custom-background-color {
    background-color: rgb(230, 223, 223);
    opacity: 0.5;
}
</style>
