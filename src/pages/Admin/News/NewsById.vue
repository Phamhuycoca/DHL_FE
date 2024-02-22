<template>
    <v-container>
        <div class="px-3">
            <v-row class="mt-3">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Danh sách tin tức</h3>
                <v-spacer></v-spacer>
                <v-btn color="green" @click="dialog = true, currentData = ''">
                    Thêm mới
                </v-btn>
            </v-row>
            <v-row class="mt-8">
                <v-col>
                    <v-card>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Tin tức</th>
                                    <th class="text-center">Ngày đăng</th>
                                    <th class="text-center">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in news " :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ item.TieuDeTinTuc }}</td>
                                    <td class="text-center">{{ item.NgayDang }}</td>
                                    <td class="text-center">
                                        <!-- <v-btn icon color="green" size="small" @click="dialog = true,
                                            currentData = item">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon color="red" size="small" @click="confirm = true, remove = item.NewsId">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn> -->
                                        <v-btn color="primary">
                                            Tùy chọn
                                            <v-menu activator="parent" style="cursor:pointer;">
                                                <v-list>
                                                    <v-list-item @click="dialog = true, currentData = item"
                                                        title="Sửa thông tin"></v-list-item>
                                                    <v-list-item title="Xóa thông tin"
                                                        @click="confirm = true, remove = item.NewsId"></v-list-item>
                                                    <v-list-item :to="'/admin/newsdetail/' + item.NewsId"
                                                        title="Xem chi tiết"></v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-col>
            </v-row>
            <NewsDialog :dialog="dialog" :param="this.param" :currentData="currentData" @close="dialog = false"
                @updateData="GetNews()" />
            <Confirm :message="'Bạn có muốn xóa thông tin ?'" :confirm="confirm" @remove="Remove"
                @close="confirm = false" />
        </div>
    </v-container>
</template>

<script>
import newsAPI from '@/services/news';
import { mapActions } from 'vuex';
import NewsDialog from './NewsDialog.vue';
import Confirm from '@/components/Confirm/Confirm.vue';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'NewsById',
    data() {
        return {
            news: [],
            dialog: false,
            currentData: '',
            confirm: false,
            remove: '',
            param: ''
        };
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetNews() {
            this.openLoading();
            newsAPI._getAll(this.param).then(res => {
                this.news = res.data;
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.closeLoading();
            });
        },
        Remove() {
            this.openLoading();
            newsAPI._delete(this.remove).then(res => {
                toast.success(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.remove = '';
                this.GetNews();
                this.confirm = false;
                this.closeLoading();
            });
        }
    },
    mounted() {
        this.param = this.$route.params.id;
        this.GetNews();
    },
    components: { NewsDialog, Confirm }
}
</script>

<style></style>