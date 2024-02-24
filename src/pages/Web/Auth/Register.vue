<template>
    <div>
        <v-container>
            <h1 class="text-center mx-auto ma-10">Đăng ký tài khoản</h1>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg"
                style="margin-bottom: 100px;margin-top: 50px;">
                <div class="text-subtitle-1 text-medium-emphasis">Tên người dùng</div>
                <v-text-field :rules="taiKhoanRule.fullName" v-model="taiKhoan.fullName" density="compact"
                    placeholder="Tên người dùng" prepend-inner-icon="mdi-account" variant="outlined"
                    clearable></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                <v-text-field :rules="taiKhoanRule.email" v-model="taiKhoan.email" density="compact" placeholder="Email"
                    prepend-inner-icon="mdi-email" variant="outlined" clearable></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu</div>
                <v-text-field v-model="taiKhoan.password" :rules="taiKhoanRule.password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Nhập mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    @click:append-inner="togglePasswordVisibility" clearable></v-text-field>
                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" type="submit" @click="register">
                    Đăng ký
                </v-btn>
                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
                        Đăng nhập ngay <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-card>
        </v-container>
        <toast style="z-index: 1000;" v-model="showAlert.show" :content="showAlert.content" :color="showAlert.color"
            :icon="showAlert.icon" />
    </div>
</template>
    
<script>
import authAPI from '../../../services/auth';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'RegisterView',
    data() {
        return {
            visible: false,
            dialogContent: "",
            taiKhoan: {
                email: "",
                fullName: "",
                password: "",
            },
            showAlert: {
                show: false,
                icon: "$success",
                content: "",
                color: "success"
            },
            taiKhoanRule: {
                password: [
                    value => {
                        if (value?.length > 5) {
                            return true;
                        }
                        return 'Mật khẩu ít nhất 6 kí tự!';
                    },
                ],
                fullName: [
                    value => {
                        if (value?.length > 5) {
                            return true;
                        }
                        return 'Vui lòng nhập họ tên người dùng!';
                    },
                ],
                email: [
                    value => {
                        if (!value) {
                            return 'Vui lòng nhập email!';
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test(value)) {
                            return true;
                        }
                        this.validate = false;
                        return 'Email không hợp lệ';
                    },
                ],
            },
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.visible = !this.visible;
        },
        register() {
            authAPI._resgiter(this.taiKhoan).then(res => {
                toast.success(res.data.message);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000)
            }).catch(error => {
                toast.error(error.response.data.message);
            });
        },
    },
};
</script>
    
<style></style>
    