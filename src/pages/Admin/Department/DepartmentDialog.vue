<template>
    <div>
        <v-dialog v-model="dialogAction" max-width="500px" persistent>
            <v-card>
                <v-card-title class="text-center">
                    <span>{{ !currentData ? "Thêm mới thông tin" : "Cập nhập thông tin" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nhập tên khoa" v-model="formData.DepartmentName">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="green" @click="updateData">
                        Lưu
                    </v-btn>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="red" @click="$emit('close'), reSetForm">
                        Hủy
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import departmentAPI from '../../../services/department';
import { useToast } from 'vue-toastification'
import { mapActions } from 'vuex';

const toast = useToast()
export default {
    name: 'DepartmentDialog',
    data() {
        return {
            formData: {
                DepartmentId: '',
                DepartmentName: ''
            }
        }
    },
    props: ['dialog', 'currentData'],
    computed: {
        dialogAction: {
            get() {
                return this.dialog;
            },
            set(value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        }
    },
    watch: {
        currentData: function () {
            this.formData.DepartmentName = this.currentData.DepartmentName;
            this.formData.DepartmentId = this.currentData.DepartmentId;
        },
    },
    methods: {
        reSetForm() {
            this.formData.DepartmentId = '';
            this.formData.DepartmentName = '';
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        updateData() {
            this.openLoading();
            if (this.currentData.DepartmentId === '' || this.currentData.DepartmentId === undefined) {
                this.formData.DepartmentId = 0;
                departmentAPI._create(this.formData).then(res => {
                    toast.success(res.data);
                }).catch(err => {
                    console.log(err)
                }).finally(() => {
                    this.closeLoading();
                    this.$emit('updateData')
                    this.$emit('close')
                    this.reSetForm();
                })
            } else {
                departmentAPI._update(this.formData.DepartmentId, this.formData)
                    .then(res => {
                        toast.success(res.data);
                    }).catch(err => {
                        console.log(err)
                    }).finally(() => {
                        this.closeLoading();
                        this.$emit('updateData')
                        this.$emit('close')
                        this.reSetForm();

                    })
            }
        }
    }
}
</script>

<style></style>