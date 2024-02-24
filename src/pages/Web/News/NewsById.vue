<template>
    <div>
        <v-row class="mt-4">
            <v-spacer></v-spacer>
            <v-col class="mr-7" cols="3" lg="3" sm="12">
                <v-text-field v-model="search" @change="SearchData" placeholder="Nhập thông tin tìm kiếm"></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center" v-for="(item, index) in news" :key="index">
            <v-card width="1410" class="ma-5" variant="outlined" hover height="140">
                <v-card-title>Tiêu đề {{ item.TieuDeTinTuc }} <span class="font-weight-regular">by {{
                    item.UserId }}</span></v-card-title>
                <v-card-subtitle>Ngày {{ formatDateTime(item.NgayDang) }}</v-card-subtitle>
                <v-card-actions>
                    <v-btn color="primary" :to="'/news-detail/' + item.NewsId">Đọc thêm</v-btn>
                    <v-btn>Share</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </div>
</template>

<script>
import newsAPI from '@/services/news';
export default {
    name: 'NewsView',
    data() {
        return {
            news: [],
            param: '',
            search: ''
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
            return `${day}/${month}/${year}`;
        },
        GetNews() {
            newsAPI._getAll(this.param).then(res => {
                this.news = res.data;
            }).catch(err => {
                console.log(err.data);
            }).finally(() => { })
        },
        SearchData() {
            alert(this.search)
        }
    },
    mounted() {
        this.param = this.$route.params.id;

        this.GetNews();
    }
}
</script>

<style></style>