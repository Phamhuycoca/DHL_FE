<template>
    <div>
        <v-dialog v-model="dialogAction" max-width="1000px" persistent>
            <v-card>
                <v-card-title class="text-center">
                    <span>{{ !currentData ? "Thêm mới thông tin" : "Cập nhập thông tin" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col lg="12" md="6" sm="3">
                                    <v-text-field label="Nhập mật khẩu mới" v-model="formData.Password"></v-text-field>
                                </v-col>
                                <v-col lg="12" md="6" sm="3">
                                    <v-text-field label="Nhập lại mật khẩu" v-model="PasswordConfirm"></v-text-field>
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
import userAPI from '../../../services/user';
import { mapActions } from 'vuex';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'PasswordDialog',
    data() {
        return {
            formData: {
                UserId: '',
                FullName: '',
                Email: '',
                Password: '',
                Avatar: '',
                Gender: '',
                IsAdmin: ''
            },
            PasswordConfirm: ''
        }
    },
    watch: {
        currentData: function () {
            this.formData.UserId = this.currentData.UserId;
            this.formData.FullName = this.currentData.FullName;
            this.formData.Email = this.currentData.Email;
            this.formData.Avatar = this.currentData.Avatar;
            this.formData.Gender = this.currentData.Gender;
            this.formData.IsAdmin = this.currentData.IsAdmin;
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
                    this.reSetForm();
                    this.$emit('close');
                }
            }
        }
    },
    methods: {
        reSetForm() {
            this.formData.UserId = '';
            this.formData.Avatar = '';
            this.formData.FullName = '';
            this.formData.Email = '';
            this.formData.Password = '';
            this.formData.Gender = '';
            this.formData.IsAdmin = '';
            this.PasswordConfirm = '';
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        updateData() {
            if (this.formData.Password === this.PasswordConfirm) {
                this.openLoading();
                userAPI._changepassword(this.formData.UserId, this.formData).then(res => {
                    console.log(res.data);
                    toast.success(res.data);
                }).catch(err => {
                    console.log(err.data);
                }).finally(() => {
                    this.reSetForm();
                    this.closeLoading();
                    this.$emit('close');
                    this.$emit('updateData')
                })
            } else {
                toast.error('Mật khẩu không trùng nhau');
            }
        }
    }
}
</script>

<style></style>