<template>
    <div>
        <div class="text-h6 font-weight-regular mb-2">Bài viết mới nhất</div>
        <v-row>
            <v-col lg="12">
                <v-carousel v-if="!loading" cycle hide-delimiter-background show-arrows="hover">
                    <v-carousel-item v-for="(item, index) in posts" :key="index">
                        <v-card height="500">
                            <v-card-title>{{ item.PostTittle }}</v-card-title>
                            <v-card-item>
                                <v-row v-show="GetImagePostById(item.PostId).length > 0" class="mx-auto">
                                    <v-col lg="6" v-for="(image, index) in GetImagePostById(item.PostId)" :key="index"
                                        class="text-center mx-auto">
                                        <v-img :src="image.UrlApi + image.ImagePostUrl" height="100" cover></v-img>
                                    </v-col>
                                </v-row>
                            </v-card-item>
                            <v-card-text style="font-size: 14px;line-height: 1.8;">
                                {{ truncateText(item.PostContent) }}
                            </v-card-text>
                        </v-card>
                    </v-carousel-item>
                </v-carousel>
                <v-skeleton-loader v-else height="300"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import postAPI from '../../../services/post';
import imagepostAPI from '../../../services/imagepost';
import { mapActions } from 'vuex';

export default {
    name: 'PostHot',
    data() {
        return {
            posts: [],
            imagepost: [],
            loading: true,
        };
    },
    methods: {

        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        truncateText(text) {
            const wordLimit = 180;
            if (text.split(' ').length > wordLimit) {
                const words = text.split(' ');
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return text;
        },
        GetPost() {
            this.openLoading();
            postAPI._getAlls()
                .then(res => {
                    this.posts = res.data.slice(0, 5);
                    console.log(this.posts)
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    this.closeLoading();
                    this.GetImagePost();
                });
        },
        GetImagePost() {
            imagepostAPI._getAll()
                .then(res => {
                    console.log(res.data);
                    this.imagepost = res.data;
                })
                .catch(err => {
                    console.error(err);
                    // Handle error gracefully, show a user-friendly message, etc.
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        GetImagePostById(id) {
            const res = this.imagepost.filter(x => x.PostId === id);
            return res.slice(0, 1);
        },
    },
    mounted() {
        this.GetPost();
    },
};
</script>
  
<style></style>
  