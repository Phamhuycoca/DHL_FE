<template>
    <v-container>
        <h1 class="text-center mx-auto ma-10">Quên mật khẩu</h1>
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="600" rounded="lg"
            style="margin-bottom: 100px;margin-top: 50px;">
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
            <v-text-field v-model="taikhoan.email" :rules="taikhoanRule.email" density="compact" placeholder="Nhập email"
                prepend-inner-icon="mdi-email" variant="outlined" clearable></v-text-field>
            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="SeenEmail">
                Gửi mã
            </v-btn>
            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="/login" rel="noopener noreferrer">
                    Đăng nhập ngay <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import authAPI from '../../../services/auth';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'ForGot',
    data() {
        return {
            dialogContent: "",
            visible: false,
            check: false,
            errorContent: "",
            taikhoan: {
                email: "",
            },
            taikhoanRule: {
                email: [
                    value => {
                        if (value.length > 0) {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (emailRegex.test(value)) {
                                return true;
                            }
                            this.validate = false;
                            return 'Email không hợp lệ';
                        }
                        this.validate = false;
                        return 'Email không được bỏ trống';
                    },
                ],
            },
        };
    },
    methods: {
        SeenEmail() {
            authAPI._forgot(this.taikhoan.email).then(res => {
                toast.success(res.data);
                setTimeout(() => {
                    window.location.href = '/login'
                }, 3000)
            }).catch(error => {
                toast.error(error.response.data);
            })
        }
    }
}
</script>

<style></style>