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
import postAPI from '../../../services/post'
import imagepostAPI from '../../../services/imagepost';
import { mapActions } from 'vuex';
export default {
    name: 'PostDetail',
    data() {
        return {
            posts: [],
            imagepost: [],
            param: '',
            items: Array.from({ length: 50 }, (k, v) => v + 1),

        }
    },
    methods: {
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
    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetPost();
    }
}
</script>

<style></style>