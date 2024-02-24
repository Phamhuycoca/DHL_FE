<template>
    <div>
        <v-container>
            <v-row class="mt-3">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Danh sách bài viết</h3>
            </v-row>
            <v-row class="mt-8">
                <v-col>
                    <v-card>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Ngày</th>
                                    <th class="text-center">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in posts " :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ item.PostDate }}</td>
                                    <td class="text-center">
                                        <v-btn color="green" size="small" @click="DuyetBai(item)">
                                            Duyệt bài
                                        </v-btn>
                                        <v-btn color="red" size="small" @click="confirm = true, remove = item.PostId">
                                            Xóa bài
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn>Duyệt tất cả</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import postAPI from '../../../services/post'
import { mapActions } from 'vuex';
export default {
    name: 'PostView',
    data() {
        return {
            posts: [],
            currentData: '',
            confirm: false,
            remove: ''
        }
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetPost() {
            this.openLoading();
            postAPI._getAllss().then(res => {
                this.posts = res.data;
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.closeLoading();
            });
        },
        DuyetBai(item) {
            this.openLoading();
            item.IsStatus = true;
            postAPI._update(item.PostId, item).then(res => {
                console.log(res.data);
                console.log(item);
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.GetPost();
                this.closeLoading();

            });
        }
    },
    mounted() {
        this.GetPost();
    }
}
</script>

<style></style>