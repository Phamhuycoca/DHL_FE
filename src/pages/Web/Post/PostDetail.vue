<template>
    <div class="ma-10">
        <div>
            <v-row class="mt-8">
                <v-col lg="12">
                    <v-card class="ma-10" variant="flat">
                        <v-card-title>
                            {{ posts.PostTittle }}
                        </v-card-title>
                        <v-card-item>
                            <v-row v-show="GetImagePostById(posts.PostId).length > 0" class="mx-auto">
                                <v-col lg="6" md="6" sm="3" v-for="(image, index) in GetImagePostById(posts.PostId)"
                                    :key="index" class="text-center mx-auto">
                                    <v-img :src="image.UrlApi + image.ImagePostUrl" height="250" cover></v-img>
                                    <p class="text-center ma-4">Hình {{ index +=1 }}</p>
                                </v-col>
                            </v-row>
                        </v-card-item>
                        <v-card-text style="font-size: 20px;line-height: 2.0;margin: 10px 200px 10px 200px;">
                            {{ posts.PostContent }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-divider class="border-opacity-25 ma-10" inset></v-divider>
        <div>
            <!-- <v-virtual-scroll :items="GetsCommentsById(posts.PostId)" height="500" item-height="50">
                <template v-slot:default="{ item }">
                    <v-list-item :title="`Employee Name`" :subtitle="`Badge #${item}`">
                        <template v-slot:prepend>
                            <v-icon class="bg-primary">mdi-account</v-icon>
                        </template>
                        <template v-slot:append>
                            <v-btn icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
                        </template>
                    </v-list-item>
                </template>
            </v-virtual-scroll> -->
            <v-virtual-scroll :items="GetsCommentsById(posts.PostId)" item-height="48" class="ma-4"
                style="max-height: 700px; overflow-y: auto;">
                <template v-slot:default="{ item }">
                    <v-list-item :title="item.UserId == getuserId ? `Tôi` : `${item.FullName}`"
                        :subtitle="`${item.CommentContent}`" :item="ol">
                        <template v-slot:prepend>
                            <v-icon v-if="item.Avatar === null || item.Avatar === ''"
                                :color="item.UserId == getId ? 'blue' : 'black'">mdi-account</v-icon>
                            <v-avatar v-else>
                                <v-img :src="item.Avatar"></v-img>
                            </v-avatar>
                        </template>
                        <template v-slot:append>
                            <div v-if="item.UserId == getuserId">
                                <v-btn icon="mdi-pencil" color="black" size="x-small" variant="tonal"
                                    @click="toggleEditMode(item)"></v-btn>
                                <v-btn icon="mdi-delete" color="black" size="x-small"
                                    @click="DeleteComment(item.CommentPostId)" variant="tonal"></v-btn>
                            </div>
                            <v-btn v-else icon="mdi-heart" size="x-small" variant="tonal"></v-btn>
                        </template>
                        <div class="text-caption">{{ formatDateTime(item.CreateComment) }}</div>
                        <v-divider></v-divider>
                        <v-row v-if="item.inEditMode">
                            <v-col cols="12">
                                <v-textarea v-model="item.editedComment" label="Chỉnh sửa bình luận"></v-textarea>
                                <div class="ma-2">
                                    <v-btn class="mr-1" @click="saveEditedComment(item)">Lưu</v-btn>
                                    <v-btn class="mr-1" color="red" @click="cancelEdit(item)">Hủy bỏ</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-list-item>
                </template>
            </v-virtual-scroll>
        </div>
        <div class="ma-4">Bình luận: {{ comments.length }}</div>
        <div class="mt-4">
            <v-row>
                <v-col lg="11" md="6" sm="2">
                    <v-textarea label="Nhập nội dung bình luận" v-model="commentPost.commentContent" clearable></v-textarea>
                </v-col>
                <v-col lg="1" md="1" sm="1">
                    <v-btn v-if="getuserId" color="primary" @click="CommentPost(posts.PostId)">Bình luận</v-btn>
                    <v-btn v-else class="mb-5 ml-5" @click="ToastMess()">Gửi</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import postAPI from '../../../services/post'
import imagepostAPI from '../../../services/imagepost';
import { mapActions, mapGetters } from 'vuex';
import commentsPostAPI from '../../../services/commentPost';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'PostDetail',
    data() {
        return {
            posts: [],
            imagepost: [],
            param: '',
            comments: [],
            commentPost: {
                commentNewsId: '',
                userId: '',
                newsId: '',
                commentContent: ''
            }

        }
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
        toggleEditMode(item) {
            item.inEditMode = !item.inEditMode;
            if (item.inEditMode) {
                item.editedComment = item.CommentContent;
            }
        },
        cancelEdit(item) {
            item.inEditMode = false;
        },
        formatDateTime(dateTimeString) {
            const dateObject = new Date(dateTimeString);
            const day = String(dateObject.getDate()).padStart(2, '0');
            const month = String(dateObject.getMonth() + 1).padStart(2, '0');
            const year = String(dateObject.getFullYear()).slice(0);
            const hours = String(dateObject.getHours()).padStart(2, '0');
            const minutes = String(dateObject.getMinutes()).padStart(2, '0');
            const seconds = String(dateObject.getSeconds()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetPost() {
            this.openLoading();
            postAPI._getById(this.param).then(res => {
                this.posts = res.data;
            }).catch(error => {
                console.log(error.data);
            }).finally(() => {
                this.GetImagePost();
                this.closeLoading();
            });
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
        GetsComments() {
            commentsPostAPI._getAll().then(res => {
                console.log(res.data);
                this.comments = res.data;
            }).catch(err => {
                console.log(err.data);
            })
        },
        GetsCommentsById(id) {
            const data = this.comments.filter(x => x.PostId == id);
            return data;
        },
        CommentPost(id) {
            if (this.commentPost.commentContent === '') {
                toast.warning('Vui lòng nhập nội dung')
            } else {
                const formData = new FormData();
                formData.append('commentPostId', '0');
                formData.append('userId', this.getuserId);
                formData.append('postId', id);
                formData.append('commentContent', this.commentPost.commentContent)
                commentsPostAPI._create(formData).then(res => {
                    console.log(res.data);
                    this.GetsComments();

                }).catch(err => {
                    console.log(err.data);
                })
                this.GetsComments();
                this.GetsCommentsById(id);
                this.commentPost.commentContent = '';
            }
        },
        saveEditedComment(item) {
            this.openLoading();
            console.log(item);
            const formData = new FormData();
            formData.append('commentPostId', item.CommentPostId);
            formData.append('userId', item.UserId);
            formData.append('postId', item.PostId);
            formData.append('commentContent', item.editedComment)
            commentsPostAPI._update(item.CommentPostId, formData).then(res => {
                console.log(res.data);
                this.GetsComments();
                this.GetsCommentsById(item.PostId);
            }).catch(error => {
                console.log(error);
            });
            item.inEditMode = false;
            this.closeLoading();
        },
        DeleteComment(id) {
            this.openLoading();
            commentsPostAPI._delete(id).then(res => {
                console.log(res.data);
                this.GetsComments();
            }).catch(error => {
                console.log(error);
            });
            this.closeLoading();
        },
        ToastMess() {
            toast.error('Vui lòng đăng nhập');
        }
    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetPost();
        this.GetsComments();
    }
}
</script>

<style></style>