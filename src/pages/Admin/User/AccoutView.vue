<template>
    <div>
        <v-container class="px-10">
            <v-row>
                <v-col lg="6" class="d-flex justify-center align-center">
                    <v-img :width="400" aspect-ratio="16/9" height="100%" cover :src="user.Avatar"></v-img>
                </v-col>
                <v-col>
                    <v-card height=600>
                        <v-card-title class="text-center">Thông tin tài khoản</v-card-title>
                        <v-card-text class="text-h6 font-weight-regular mt-10 ml-10">Email :{{ user.Email
                        }}</v-card-text>
                        <v-card-text class="text-h6 font-weight-regular mt-2 ml-10">Người dùng :{{ user.FullName
                        }}</v-card-text>
                        <v-card-text class="text-h6 font-weight-regular mt-2 ml-10">
                            Giới tính: {{ user.Gender ? 'Nam' : 'Nữ' }}
                        </v-card-text>
                        <v-card-text class="text-h6 font-weight-regular mt-2 ml-10">Trạng thái tài khoản :{{ user.IsAdmin ?
                            'Admin' : 'Người dùng'
                        }}</v-card-text>
                        <v-card-actions style="height: 300px;">
                            <v-btn class="mt-auto" color="primary" @click="dialog = true, currentData = user">Thay đổi thông
                                tin</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn class="mt-auto" color="red" @click="confirm = true, currentData = user">Thay đổi mật
                                khẩu</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <AccountDialog :dialog="dialog" :currentData="currentData" @updateData="GetUser()" @close="dialog = false" />
        <PasswordDialog :dialog="confirm" :currentData="currentData" @updateData="GetUser()" @close="confirm = false" />
    </div>
</template>

<script>
import userAPI from '../../../services/user'
import { mapGetters, mapActions } from 'vuex';
import AccountDialog from './AccountDialog.vue';
import PasswordDialog from './PasswordDialog.vue';
export default {
    name: 'AccountView',
    components: {
        AccountDialog,
        PasswordDialog,
        AccountDialog,
        PasswordDialog
    },
    data() {
        return {
            user: '',
            dialog: false,
            currentData: '',
            confirm: false
        }
    },
    computed: {
        ...mapGetters('authStore', ['getuserId'])
    },
    methods: {
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        GetUser() {
            this.openLoading();
            userAPI._getById(this.getuserId).then(res => {
                this.user = res.data;
            }).catch(err => {
                console.log(err.data);
            }).finally(() => {
                this.closeLoading();
            });
        }
    },
    mounted() {
        this.GetUser();
    }
}
</script>

<style></style>