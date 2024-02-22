<template>
    <v-container>
        <div class="px-3">
            <v-row class="mt-3">
                <v-icon>mdi-home</v-icon>
                <h3 class="ml-2">Danh sách khoa của trường</h3>
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
                                    <th class="text-center">Tên khoa</th>
                                    <th class="text-center">Tùy chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in departments " :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td class="text-center">{{ item.DepartmentName }}</td>
                                    <td class="text-center">
                                        <v-btn icon color="green" size="small" @click="dialog = true,
                                            currentData = item">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon color="red" size="small"
                                            @click="confirm = true, remove = item.DepartmentId">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card>
                </v-col>
            </v-row>
            <DepartmentDialog :dialog="dialog" :currentData="currentData" @close="dialog = false"
                @updateData="GetDepartments()" />
            <Confirm :message="'Bạn có muốn xóa thông tin ?'" :confirm="confirm" @remove="Remove"
                @close="confirm = false" />
        </div>
    </v-container>
</template>
<script>
import departmentAPI from '../../../services/department'
import DepartmentDialog from '../Department/DepartmentDialog.vue'
import Confirm from '../../../components/Confirm/Confirm.vue'
import { mapActions } from 'vuex'
import { useToast } from 'vue-toastification'
const toast = useToast()

export default {
    components: {
        DepartmentDialog,
        Confirm
    },
    name: 'DepartmentView',
    data() {
        return {
            currentData: '',
            dialog: false,
            departments: [],
            confirm: false,
            remove: ''
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
        Remove() {
            this.openLoading();
            departmentAPI._delete(this.remove).then(res => {
                toast.success(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                this.remove = '';
                this.GetDepartments();
                this.confirm = false;
                this.closeLoading();
            });
        }
    },
    mounted() {
        this.GetDepartments();
    }
}
</script>

<style></style>