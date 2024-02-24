<template>
    <div class="ma-10">
        <v-row>
            <v-spacer></v-spacer>
            <v-col class="mr-7" cols="3" lg="3" sm="12">
                <v-text-field v-model="search" @change="SearchData" placeholder="Nhập thông tin tìm kiếm"></v-text-field>
            </v-col>
        </v-row>
        <v-row justify="center" v-for="(item, index) in posts" :key="index">
            <v-col sm="3">
                <router-link :to="'/post-detail/' + item.PostId">
                    <v-img class="align-end text-white img-zoom" height="300" :src="GetImagePostById(item.PostId)"
                        :lazy-src="GetImagePostById(item.PostId)" cover></v-img>
                </router-link>
            </v-col>
            <v-col sm="7" class="d-flex flex-column">
                <span class="font-weight-normal grey--text text-subtitle-1">
                    by <span class="font-weight-bold" style="cursor: pointer;">{{ item.FullName }}
                    </span>
                    &trade; {{ item.PostDate
                    }}
                </span>
                <router-link :to="'/post-detail/' + item.PostId" class="blue--text text-decoration-none">
                    <span class="font-weight-light text-h6">{{ truncateText(item.PostContent) }}</span>
                </router-link>
            </v-col>
            <v-divider inset :thickness="1" class="border-opacity-100 ma-4"></v-divider>
        </v-row>
    </div>
</template> 
  
<script>
import postAPI from '../../../services/post';
import imagepostAPI from '../../../services/imagepost';
import { mapActions } from 'vuex';

export default {
    name: 'PostList',
    data() {
        return {
            posts: [],
            imagepost: [],
            loading: true,
            search: ''
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
                    this.posts = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    this.GetImagePost();
                    this.closeLoading();
                });
        },
        GetImagePost() {
            imagepostAPI._getAll()
                .then(res => {
                    this.imagepost = res.data;
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        GetImagePostById(id) {
            const res = this.imagepost.filter(x => x.PostId === id);
            if (res.length > 0) {
                const { UrlApi, ImagePostUrl } = res[0];
                const imageUrl = UrlApi + ImagePostUrl;
                return imageUrl;
            }
            return 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
        },
        SearchData() {
            alert(this.search)
        }
    },
    mounted() {
        this.GetPost();

    },
};
</script>
  
<style></style>