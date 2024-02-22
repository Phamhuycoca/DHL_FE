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
        <div class="ma-4">Bình luận: 0</div>
        <div>
            <v-virtual-scroll :items="items" height="500" item-height="50">
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
            </v-virtual-scroll>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import newsAPI from '../../../services/news';
import imagecontentAPI from '../../../services/imagecontent';
import newscontentAPI from '../../../services/newscontent';
export default {
    name: 'NewsDetail',
    data() {
        return {
            param: '',
            news: [],
            newscontent: [],
            imagecontent: [],
            items: Array.from({ length: 50 }, (k, v) => v + 1),
            userId: ''
        }
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

    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetDetailNews();
    }
}
</script>

<style></style>