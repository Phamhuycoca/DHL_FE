<template>
    <v-container>
        <div class="px-3">
            <v-row class="mt-3">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Danh sách tin tức</h3>
            </v-row>
            <v-row class="mt-8">
                <v-col sm="12" md="6" lg="6" v-for="(item, index) in departments " :key="index">
                    <v-card elevation="4" height="50">
                        <v-row>
                            <v-col sm="12" md="12" lg="6">
                                <v-card-title>{{ item.DepartmentName }}</v-card-title>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                <v-card-actions>
                                    <v-btn color="white" class="bg-green" :to="'newsbyid/' + item.DepartmentId">Tạo mới tin
                                        tức</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import departmentAPI from '../../../services/department';
export default {
    name: 'NewsView',
    data() {
        return {
            departments: []
        }
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetDepartments() {
            this.openLoading();
            departmentAPI._getAll().then(res => {
                this.departments = res.data;
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.closeLoading();
            });
        },
    },
    mounted() {
        this.GetDepartments();
    }
}
</script>

<style></style>