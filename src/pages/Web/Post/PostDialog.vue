<template>
    <div>
        <v-dialog v-model="dialogAction" max-width="1400" persistent>
            <v-card>
                <v-card-title class="text-center">
                    <span>{{ !currentData ? "Thêm mới thông tin" : "Cập nhập thông tin" }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col lg="12" md="6" sm="2">
                                    <v-text-field label="Nhập tiêu đề bài viết"
                                        v-model="formData.PostTittle"></v-text-field>
                                </v-col>
                                <v-col lg="12" md="6" sm="2">
                                    <v-textarea label="Nhập nội dung" clearable v-model="formData.PostContent">
                                    </v-textarea>
                                </v-col>
                                <v-col lg="12">
                                    <v-file-input v-model="images" multiple type="file" ref="fileInput" clearable
                                        accept="image/png, image/jpeg, image/bmp" placeholder="Chọn ảnh"
                                        prepend-icon="mdi-camera" label="Hình ảnh" @change="handleImageChange">
                                    </v-file-input>
                                    <div v-if="selectedImages.length > 0">
                                        <v-row>
                                            <v-col v-for="(image, index) in selectedImages" :key="index" cols="12" sm="1"
                                                md="1" style="position: relative; display: inline-block;">
                                                <v-img :src="image.url" style="height: 100px; width: 100px;"></v-img>
                                                <v-icon class="delete-icon"
                                                    @click="deleteImage(index)">mdi-close-circle</v-icon>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div>
                                        <v-row class="ml-2 mt-2" v-for="item in GetImagePostById(this.formData.PostId)"
                                            :key="item.id" v-show="!item.hideRow">
                                            <v-row>
                                                <v-col lg="8" md="4" sm="2">
                                                    <v-img :src="item.UrlApi + item.ImagePostUrl" cover
                                                        style="height: 50px;width: 100px;"></v-img>
                                                </v-col>
                                                <v-col lg="4" sm="2">
                                                    <v-btn class="ml-10" color="red"
                                                        @click="DeleteImagePost(item)">Xoá</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                    </div>
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
import { mapActions, mapGetters } from 'vuex';
import { useToast } from 'vue-toastification'
const toast = useToast()
import postAPI from '../../../services/post';
import imagepostAPI from '../../../services/imagepost';
export default {
    name: 'PostDialog',
    data() {
        return {
            formData: {
                PostId: '',
                PostTittle: '',
                PostContent: '',
                PostDate: '',
                UserId: '',
                IsStatus: ''
            },
            selectedImages: [],
            images: null,
            listImgaes: [],
            listDeleteImage: [],
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
                    this.listDeleteImage = [];
                    this.listImgaes.forEach(element => {
                        element.hideRow = false;
                    });
                    this.$emit('close');
                }
            }
        },
        ...mapGetters('authStore', ['getuserId'])

    },
    watch: {
        currentData: function () {
            this.formData.PostId = this.currentData.PostId;
            this.formData.PostContent = this.currentData.PostContent;
            this.formData.PostTittle = this.currentData.PostTittle;
            this.formData.UserId = this.currentData.UserId;
            this.formData.PostDate = this.currentData.PostDate;
            this.formData.IsStatus = this.currentData.IsStatus;
            this.GetImagePost();
            this.GetImagePostById(this.formData.PostId)
        },
    },
    methods: {
        reSetForm() {
            this.formData.PostId = '';
            this.formData.PostContent = '';
            this.formData.PostTittle = '';
            this.formData.UserId = '';
            this.formData.PostDate = '';
            this.formData.IsStatus = '';
            this.listDeleteImage = [];
            this.images = null;
            this.selectedImages = [];
        },
        ...mapActions('loadingStore', ['openLoading', 'closeLoading']),
        handleImageChange(event) {
            const selectedFiles = event.target.files;
            if (selectedFiles && (this.selectedImages.length + selectedFiles.length) <= 4) {
                for (let i = 0; i < selectedFiles.length; i++) {
                    const file = selectedFiles[i];
                    const imageUrl = URL.createObjectURL(file);
                    this.selectedImages.push({ file, url: imageUrl });
                }
            }
            else {
                toast.warning('Hình ảnh không quá 4 file');
            }
        },
        deleteImage(index) {
            this.selectedImages.splice(index, 1);
            this.images = null;
        },
        updateData() {
            this.openLoading();
            this.openLoading();
            if (this.formData.PostId === '' || this.formData.PostId === undefined) {
                const formData = new FormData();
                formData.append('PostContent', this.formData.PostContent)
                formData.append('PostTittle', this.formData.PostTittle)
                formData.append('PostId', '0');
                formData.append('UserId', this.getuserId);
                formData.append('IsStatus', 'false');
                const files = this.$refs.fileInput.files;
                for (let i = 0; i < files.length; i++) {
                    formData.append('listFile', files[i]);
                }
                postAPI._create(formData).then(res => {
                    toast.success(res.data);
                }).catch(err => {
                    console.log(err.data);
                }).finally(() => {
                    this.closeLoading();
                    this.$emit('updateData')
                    this.$emit('close')
                    this.reSetForm();
                })
            } else {
                const formData = new FormData();
                formData.append('PostContent', this.formData.PostContent)
                formData.append('PostTittle', this.formData.PostTittle)
                formData.append('UserId', this.formData.UserId);
                formData.append('IsStatus', this.formData.IsStatus);
                formData.append('PostId', this.formData.PostId);
                const files = this.$refs.fileInput.files;
                for (let i = 0; i < files.length; i++) {
                    formData.append('listFile', files[i]);
                }
                for (let i = 0; i < this.listDeleteImage.length; i++) {
                    formData.append(`ImageList[${i}].ImagePostId`, this.listDeleteImage[i].ImagePostId);
                    formData.append(`ImageList[${i}].ImagePostUrl`, this.listDeleteImage[i].ImagePostUrl);
                    formData.append(`ImageList[${i}].UrlApi`, this.listDeleteImage[i].UrlApi);
                    formData.append(`ImageList[${i}].PostId`, this.listDeleteImage[i].PostId);
                }
                postAPI._update(this.formData.PostId, formData).then(res => {
                    toast.success(res.data);
                }).catch(err => {
                    console.log(err.data);
                }).finally(() => {
                    this.closeLoading();
                    this.$emit('updateData')
                    this.$emit('close')
                    this.reSetForm();

                })
            }
        },
        DeleteImagePost(item) {
            if (item && item.ImagePostId) {
                this.listDeleteImage.push({ ...item });
                const index = this.listImgaes.findIndex((image) => image.ImagePostId === item.ImagePostId);
                if (index !== -1) {
                    this.listImgaes[index] = { ...item, hideRow: true };
                }
            }
        },
        GetImagePost() {
            imagepostAPI._getAll().then(res => {
                this.listImgaes = res.data;
            }).catch(err => {
                console.log(err.data);
            });
        },
        GetImagePostById(id) {
            const res = this.listImgaes.filter(x => x.PostId === id);
            return res.slice(0, 4);
        }
    },
    mounted() {
        this.GetImagePost();
    }
}
</script>

<style></style>