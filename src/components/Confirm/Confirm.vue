<template>
    <v-row justify="center">
        <v-dialog v-model="dialogAction" persistent width="auto">
            <v-card>
                <v-card-title class="text-h5">Thông báo</v-card-title>
                <v-card-text>{{ message }}</v-card-text>
                <v-card-actions>
                    <v-btn color="red-darken-1" variant="text" @click="$emit('remove')">Có</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="$emit('close')">Không</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: 'ConfirmView',
    props: ['confirm', 'message'],
    computed: {
        dialogAction: {
            get() {
                return this.confirm;
            },
            set(value) {
                if (!value) {
                    this.$emit('close');
                }
            }
        }
    },
}
</script>

<style></style>