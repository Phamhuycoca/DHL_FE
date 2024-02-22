<template>
    <v-container>
        <div class="px-3">
            <v-row class="mt-3">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Chi tiết tin tức</h3>
                <v-spacer></v-spacer>
                <v-btn color="green" @click="dialog = true, currentData = ''">
                    Thêm mới
                </v-btn>
            </v-row>
            <v-row>
                <v-col lg="12" md="6" sm="3">
                    <v-card>
                        <v-card-title class="text-center">Tiêu đề :{{ news.TieuDeTinTuc }} </v-card-title>
                        <v-card-item>
                            Người đăng bài {{ news.UserId }} - ngày đăng {{ news.NgayDang }}
                        </v-card-item>
                        <div v-for="(item, index) in newscontent" :key="item" class="ma-10">
                            <v-card-title>Nội dung thứ {{ index+=1 }}</v-card-title>
                            <v-card-text style="font-size: 18px;line-height: 1.8;">
                                {{ item.Content }}
                            </v-card-text>
                            <v-row v-show="GetImageContentById(item.NewsContentId).length > 0" class="mx-auto">
                                <v-col lg="6" md="6" sm="3"
                                    v-for="(image, index) in GetImageContentById(item.NewsContentId)" :key="index">
                                    <v-img :src="image.UrlApi + image.ImageNewsUrl" height="250" cover></v-img>
                                    <p class="text-center ma-4">Hình {{ index +=1 }}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-card-actions class="mx-auto">
                                    <v-btn color="primary" @click="dialog = true, currentData = item">Chỉnh sửa nội
                                        dung</v-btn>
                                    <v-btn color="red" @click="confirm = true, remove = item.NewsContentId">Xóa nội
                                        dung</v-btn>
                                </v-card-actions>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <NewsContentDialog :dialog="dialog" :param="this.param" @updateData="GetContents()" :currentData="currentData"
            @close="dialog = false" />
        <Confirm :message="'Bạn có muốn xóa thông tin ?'" :confirm="confirm" @remove="Remove" @close="confirm = false" />
    </v-container>
</template>

<script>
import newsAPI from '../../../services/news';
import NewsContentDialog from './NewsContent/NewsContentDialog.vue';
import { mapActions } from 'vuex';
import newscontentAPI from '../../../services/newscontent';
import imagecontentAPI from '../../../services/imagecontent'
import Confirm from '@/components/Confirm/Confirm.vue';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'NewsDetail',
    data() {
        return {
            news: [],
            param: '',
            dialog: false,
            currentData: '',
            newscontent: [],
            imagecontent: [],
            confirm: false,
            remove: ''
        };
    },
    methods: {
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
        Remove() {
            this.openLoading();
            newscontentAPI._delete(this.remove).then(res => {
                toast.success(res.data);
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.closeLoading();
                this.GetContents();
                this.confirm = false;
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
        }
    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetDetailNews();
        this.GetImageContent();
    },
    components: { NewsContentDialog, Confirm }
}
</script>

<style></style>