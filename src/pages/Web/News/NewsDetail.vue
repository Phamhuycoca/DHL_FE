<template>
    <div class="ma-10">
        <div class="d-flex justify-center">
            <v-card width="1500">
                <v-card-title class="text-center">Tiêu đề :{{ news.TieuDeTinTuc }} </v-card-title>
                <v-card-item>
                    Người đăng {{ news.UserId }} - ngày {{ formatDateTime(news.NgayDang) }}
                </v-card-item>
                <div v-for="(item, index) in newscontent" :key="index" class="ma-10">
                    <v-card-text style="font-size: 20px;line-height: 1.8;">
                        {{ item.Content }}
                    </v-card-text>
                    <v-row v-show="GetImageContentById(item.NewsContentId).length > 0" class="d-flex justify-center">
                        <v-col lg="6" md="6" sm="3" v-for="(image, index) in GetImageContentById(item.NewsContentId)"
                            :key="index">
                            <v-img :src="image.UrlApi + image.ImageNewsUrl" height="250" cover></v-img>
                            <p class="text-center ma-4">Hình {{ index +=1 }}</p>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </div>
        <v-divider class="border-opacity-25 ma-10" inset></v-divider>
        <div>
            <v-virtual-scroll :items="GetsCommentsById(news.NewsId)" item-height="48" class="ma-4"
                style="max-height: 700px; overflow-y: auto;">
                <template v-slot:default="{ item }">
                    <v-list-item :title="item.UserId == getuserId ? `Tôi` : `${item.FullName}`"
                        :subtitle="`${item.CommentContent}`" :item="ol">
                        <template v-slot:prepend>
                            <v-icon v-if="item.Avatar === null"
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
                                    @click="DeleteComment(item.CommentNewsId)" variant="tonal"></v-btn>
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
        <div class="ma-4">Bình luận: {{ GetsCommentsById(news.NewsId).length }}</div>
        <div class="mt-4">
            <v-row>
                <v-col lg="11" md="6" sm="2">
                    <v-textarea label="Nhập nội dung bình luận" v-model="comment" clearable></v-textarea>
                </v-col>
                <v-col lg="1" md="1" sm="1">
                    <v-btn v-if="getuserId" color="primary" @click="CommentNews(news.NewsId)">Bình luận</v-btn>
                    <v-btn v-else class="mb-5 ml-5" @click="ToastMess()">Gửi</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import newsAPI from '../../../services/news';
import imagecontentAPI from '../../../services/imagecontent';
import newscontentAPI from '../../../services/newscontent';
import commentsNewsAPI from '../../../services/commentsNews';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'NewsDetail',
    data() {
        return {
            param: '',
            news: [],
            newscontent: [],
            imagecontent: [],
            items: Array.from({ length: 50 }, (k, v) => v + 1),
            userId: '',
            comments: [],
            comment: ''
        }
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
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
        GetDetailNews() {
            this.openLoading();
            newsAPI._getById(this.param).then(res => {
                this.news = res.data;
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.closeLoading();
                this.GetContents();
            });
        },
        GetContents() {
            this.openLoading();
            newscontentAPI._getAll(this.param).then(res => {
                this.newscontent = res.data;
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.closeLoading();
                this.GetImageContent();
            });
        },
        GetImageContent() {
            imagecontentAPI._getAll().then(res => {
                this.imagecontent = res.data;
            }).catch(err => {
                console.log(err.data);
            });
        },
        GetImageContentById(id) {
            const res = this.imagecontent.filter(x => x.NewsContentId === id);
            return res.slice(0, 4);
        },
        GetsComments() {
            commentsNewsAPI._getAll().then(res => {
                this.comments = res.data;
            }).catch(err => {
                console.log(err.data);
            })
        },
        GetsCommentsById(id) {
            const data = this.comments.filter(x => x.NewsId == id);
            return data;
        },
        CommentNews(id) {
            if (this.comment === '') {
                toast.warning('Vui lòng nhập nội dung')
            } else {
                const formData = new FormData();
                formData.append('CommentNewsId', '0');
                formData.append('UserId', this.getuserId);
                formData.append('NewsId', id);
                formData.append('CommentContent', this.comment)
                commentsNewsAPI._create(formData).then(res => {
                    console.log(res.data);
                    this.GetsComments();

                }).catch(err => {
                    console.log(err.data);
                })
                this.GetsComments();
                this.GetsCommentsById(id);
                this.comment = '';
            }
        },
        saveEditedComment(item) {
            this.openLoading();
            console.log(item);
            const formData = new FormData();
            formData.append('CommentNewsId', item.CommentNewsId);
            formData.append('UserId', item.UserId);
            formData.append('NewsId', item.NewsId);
            formData.append('CommentContent', item.editedComment)
            commentsNewsAPI._update(item.CommentNewsId, formData).then(res => {
                console.log(res.data);
                this.GetsComments();
                this.GetsCommentsById(item.NewsId);
            }).catch(error => {
                console.log(error);
            });
            item.inEditMode = false;
            this.closeLoading();
        },
        DeleteComment(id) {
            this.openLoading();
            commentsNewsAPI._delete(id).then(res => {
                console.log(res.data);
                this.GetsComments();
            }).catch(error => {
                console.log(error);
            });
            this.closeLoading();
        },
        toggleEditMode(item) {
            item.inEditMode = !item.inEditMode;
            if (item.inEditMode) {
                item.editedComment = item.CommentContent;
            }
        },
        cancelEdit(item) {
            item.inEditMode = false;
        },
        ToastMess() {
            toast.error('Vui lòng đăng nhập');
        }
    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetDetailNews();
        this.GetsComments();
    }
}
</script>

<style></style>