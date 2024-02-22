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
                                    <v-text-field label="Nhập họ và tên" v-model="formData.FullName"></v-text-field>
                                </v-col>
                                <v-col lg="12" md="6" sm="3">
                                    <v-file-input auto-grow label="Hình ảnh" prepend-icon="mdi-file"
                                        @change="handleImageChange" v-model="image" type="file"
                                        accept="image/png, image/jpeg, image/bmp">
                                    </v-file-input>
                                </v-col>
                                <v-col lg="12" md="6" sm="3">
                                    <v-radio-group v-model="formData.Gender" inline>
                                        <v-radio label="Nam" :value="true"></v-radio>
                                        <v-radio label="Nữ" :value="false"></v-radio>
                                    </v-radio-group>
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
    name: 'AccountDialog',
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
            image: null,
            file: ''
        }
    },
    watch: {
        currentData: function () {
            this.formData.UserId = this.currentData.UserId;
            this.formData.FullName = this.currentData.FullName;
            this.formData.Email = this.currentData.Email;
            this.formData.Password = this.currentData.Password;
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
            this.file = '';
            this.image = null;
        },
        handleImageChange(event) {
            this.file = event.target.files[0];
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        updateData() {
            this.openLoading();
            const formData = new FormData();
            formData.append('UserId', this.formData.UserId);
            formData.append('FullName', this.formData.FullName);
            formData.append('Password', this.formData.Password);
            formData.append('Email', this.formData.Email);
            formData.append('Gender', this.formData.Gender);
            formData.append('IsAdmin', this.formData.IsAdmin);
            formData.append('Avatar', this.formData.Avatar);
            formData.append('file', this.file);
            userAPI._update(this.formData.UserId, formData).then(res => {
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
        }
    }
}
</script>

<style></style>