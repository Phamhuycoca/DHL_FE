<template>
    <v-container>
        <h1 class="text-center mx-auto ma-10">Đăng nhập tài khoản</h1>
        <v-card class="mx-auto pa-12 pb-8" max-width="600" rounded="lg" variant="flat"
            style="margin-bottom: 100px;margin-top: 50px;">
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
            <v-text-field v-model="taikhoan.email" :rules="taikhoanRule.email" density="compact" placeholder="Nhập email"
                prepend-inner-icon="mdi-email" variant="outlined" clearable></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Mật khẩu</div>
            <v-text-field v-model="taikhoan.password" :rules="taikhoanRule.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Nhập mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="togglePasswordVisibility" clearable></v-text-field>
            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
                Đăng nhập
            </v-btn>
            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
                    Đăng ký ngay <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
                <a class="text-red text-decoration-none" href="/forgot" rel="noopener noreferrer">
                    Quên mật khẩu <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import authAPI from '../../../services/auth'
import { mapActions } from 'vuex'
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'LoginView',
    data() {
        return {
            visible: false,
            taikhoan: {
                email: '',
                password: ''
            },
            taikhoanRule: {
                email: [
                    value => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (emailRegex.test(value)) {
                            return true;
                        }
                        this.validate = false;
                        return 'Email không hợp lệ';
                    },
                ],
                password: [
                    value => {
                        if (value?.length > 5) { return true; }
                        return 'Mật khẩu ít nhất 6 kí tự!'
                    },
                ]
            },
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.visible = !this.visible;
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        ...mapActions('authStore', ['Login', 'ResetToken']),
        login() {
            this.openLoading();
            authAPI._login(this.taikhoan).then(res => {
                this.Login(res.data);
                toast.success(res.data.message)
                if (res.data.role) {
                    setTimeout(() => {
                        window.location.href = '/admin'
                    }, 3000)
                } else {
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000)
                }

            }).catch(err => {
                if (err.response.status === 404) {
                    toast.error(err.response.data.message)
                } else {
                    toast.error(err.response.data.message)
                }
            }).finally(() => {
                this.closeLoading();
            })
        }
    },
    mounted() {
        this.ResetToken();
    }
}
</script>

<style></style>