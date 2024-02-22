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
                                <v-col cols="12">
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
                                        <v-row class="ml-2 mt-2"
                                            v-for="item in GetImageContentById(this.formData.NewsContentId)" :key="item.id"
                                            v-show="!item.hideRow">
                                            <v-row>
                                                <v-col lg="8" md="4" sm="2">
                                                    <v-img :src="item.UrlApi + item.ImageNewsUrl" cover
                                                        style="height: 50px;width: 100px;"></v-img>
                                                </v-col>
                                                <v-col lg="4" sm="2">
                                                    <v-btn class="ml-10" color="red"
                                                        @click="DeleteImageBlog(item)">Xoá</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-row>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea counter clearable variant="filled" auto-grow label="Nhập nội dung"
                                        v-model="formData.Content">
                                    </v-textarea>
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
import newscontentAPI from '../../../../services/newscontent';
import { mapActions } from 'vuex';
import imagecontentAPI from '../../../../services/imagecontent';
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
    name: 'NewsContent',
    data() {
        return {
            formData: {
                NewsContentId: '',
                Content: '',
                NewsId: ''
            },
            selectedImages: [],
            images: null,
            listImgaes: [],
            listDeleteImage: [],
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
                    this.listDeleteImage = [];
                    this.listImgaes.forEach(element => {
                        element.hideRow = false;
                    });
                    this.$emit('close');
                }
            }
        }
    },
    watch: {
        currentData: function () {
            this.formData.NewsContentId = this.currentData.NewsContentId;
            this.formData.Content = this.currentData.Content;
            this.formData.NewsId = this.currentData.NewsId;
            this.GetImageContent();
            this.GetImageContentById(this.formData.NewsContentId);
        }
    },
    methods: {
        reSetForm() {
            this.formData.NewsContentId = '';
            this.formData.Content = '';
            this.formData.NewsId = '';
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
            if (this.formData.NewsContentId === '' || this.formData.NewsContentId === undefined) {
                const formData = new FormData();
                formData.append('NewsId', parseInt(this.param))
                formData.append('Content', this.formData.Content)
                formData.append('NewsContentId', '0');
                const files = this.$refs.fileInput.files;
                for (let i = 0; i < files.length; i++) {
                    formData.append('listFile', files[i]);
                }
                newscontentAPI._create(formData).then(res => {
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
                formData.append('NewsId', this.formData.NewsId)
                formData.append('Content', this.formData.Content)
                formData.append('NewsContentId', this.formData.NewsContentId);
                const files = this.$refs.fileInput.files;
                for (let i = 0; i < files.length; i++) {
                    formData.append('listFile', files[i]);
                }
                for (let i = 0; i < this.listDeleteImage.length; i++) {
                    //console.log("update" + this.listDeleteImage[i].ImageNewsId);
                    formData.append(`ImageContentList[${i}].ImageNewsId`, this.listDeleteImage[i].ImageNewsId);
                    formData.append(`ImageContentList[${i}].ImageNewsUrl`, this.listDeleteImage[i].ImageNewsUrl);
                    formData.append(`ImageContentList[${i}].UrlApi`, this.listDeleteImage[i].UrlApi);
                    formData.append(`ImageContentList[${i}].NewsContentId`, this.listDeleteImage[i].NewsContentId);
                }
                newscontentAPI._update(this.formData.NewsContentId, formData).then(res => {
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
        DeleteImageBlog(item) {
            if (item && item.ImageNewsId) {
                this.listDeleteImage.push({ ...item });
                const index = this.listImgaes.findIndex((image) => image.ImageNewsId === item.ImageNewsId);
                if (index !== -1) {
                    this.listImgaes[index] = { ...item, hideRow: true };
                }
            }
        },
        GetImageContent() {
            imagecontentAPI._getAll().then(res => {
                this.listImgaes = res.data;
            }).catch(err => {
                console.log(err.data);
            });
        },
        GetImageContentById(id) {
            const res = this.listImgaes.filter(x => x.NewsContentId === id);
            return res.slice(0, 4);
        }
    },
    mounted() {
        this.GetImageContent();
    }
}
</script>

<style></style>