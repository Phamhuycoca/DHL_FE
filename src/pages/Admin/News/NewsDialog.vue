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
                                    <v-text-field label="Nhập tiêu đề" v-model="formData.TieuDeTinTuc">
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
import { mapActions } from 'vuex';
import newsAPI from '../../../services/news';

import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'NewsDialog',
    data() {
        return {
            formData: {
                NewsId: '',
                TieuDeTinTuc: '',
                DepartmentId: '',
                NgayDang: '',
                UserId: '1'
            },
        }
    },
    props: ['dialog', 'currentData', 'param'],
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
            this.formData.NewsId = this.currentData.NewsId;
            this.formData.DepartmentId = this.currentData.DepartmentId;
            this.formData.UserId = this.currentData.UserId;
            this.formData.NgayDang = this.currentData.NgayDang;
            this.formData.TieuDeTinTuc = this.currentData.TieuDeTinTuc;
        },
    },
    methods: {
        reSetForm() {
            this.formData.NewsId = '';
            this.formData.DepartmentId = '';
            this.formData.NgayDang = '';
            this.formData.TieuDeTinTuc = '';
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        updateData() {
            this.openLoading();
            if (this.currentData.NewsId === '' || this.currentData.DepartmentId === undefined) {
                this.formData.NewsId = 0;
                this.formData.DepartmentId = this.param;
                newsAPI._create(this.formData).then(res => {
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
                newsAPI._update(this.formData.NewsId, this.formData)
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
        },
    },
}
</script>

<style></style>