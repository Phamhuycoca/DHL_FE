<template>
    <div class="px-3">
        <v-row>
            <v-col cols="6">
                <v-card hover variant="flat" height="400">
                    <v-card-title class="text-center" align="center" justify="center">Biểu đồ thống kê số lượng bài
                        viết</v-card-title>
                    <PostChart />
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card hover height="400" variant="flat">
                    <v-card-title class="text-center" align="center" justify="center">Biểu đồ thống kê bài viết theo
                        tuần</v-card-title>
                    <ThongKe style="max-height: 350px;min-width: 100%;" />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card height="500" hover variant="flat">
                    <v-card-title>Danh sách bài viết</v-card-title>
                    <v-card-text v-if="baiviets.length > 0">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center mx-auto">
                                        <v-checkbox color="primary" v-model="duyettatca" @change="selectAll" label="tất cả"
                                            class="mt-8">
                                        </v-checkbox>
                                    </th>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Ngày</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in baiviets " :key="index">
                                    <td class="text-center">
                                        <v-checkbox color="primary" v-model="item.IsStatus"></v-checkbox>
                                    </td>
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ item.PostDate }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <v-pagination prev-icon="mdi-menu-left" next-icon="mdi-menu-right" :length="totalPages"
                            v-model="currentPage"></v-pagination>
                    </v-card-text>
                    <v-card-actions v-if="baiviets.length > 0">
                        <v-spacer></v-spacer>
                        <v-btn class="mr-10" color="primary" @click="DuyetBaiViet">Duyệt tất cả bài viết</v-btn>
                    </v-card-actions>
                    <v-card-text v-else class="text-center">
                        Không có bài viết nào
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import postAPI from '@/services/post';
import PostChart from './PostChart.vue';
import ThongKe from './ThongKe.vue';
import { mapActions } from 'vuex';

export default {
    name: 'IndexView',
    data() {
        return {
            duyettatca: false,
            baiviets: [],
            loading: false,
            currentPage: 1,
            itemsPerPage: 3,
        };
    },
    computed: {
        displayed() {
            if (this.baiviets && this.baiviets.length > 0) {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.baiviets.slice(startIndex, endIndex);
            }
            else {
                return [];
            }
        },
        totalPages() {
            return Math.ceil(this.baiviets.length / this.itemsPerPage);
        }
    },
    watch: {
        duyettatca: function (newValue) {
            this.baiviets.forEach(item => {
                item.IsStatus = newValue;
            });
        },
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),

        // truncateText(text) {
        //     const wordLimit = 10;
        //     if (text.split(' ').length > wordLimit) {
        //         const words = text.split(' ');
        //         return words.slice(0, wordLimit).join(' ') + '...';
        //     }
        //     return text;
        // },
        formatDateTime(dateTimeString) {
            const dateObject = new Date(dateTimeString);
            const day = String(dateObject.getDate()).padStart(2, '0');
            const month = String(dateObject.getMonth() + 1).padStart(2, '0');
            const year = String(dateObject.getFullYear()).slice(0);
            return `${day}/${month}/${year}`;
        },
        getBaiViets() {
            this.openLoading();
            postAPI._getAllss().then(res => {
                this.baiviets = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err());
            }).finally(() => {
                this.closeLoading();
            });
        },
        DuyetBaiViet() {
            this.openLoading();
            const selectedItems = this.baiviets.filter(item => item.IsStatus === true);
            selectedItems.forEach(item => {
                item.IsStatus = 1;
            });
            postAPI._duyetBai(selectedItems).then(res => {
                console.log(res.data);
                this.getBaiViets();
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                this.closeLoading();

            });
        },
    },
    created() {
        this.getBaiViets();
    },
    components: { ThongKe, PostChart }
}
</script>

<style></style>