<template>
    <div class="px-6 py-4">
        <v-row>
            <v-col lg="9" md="9" sm="2">
                <NewsVue />
            </v-col>
            <v-col lg="3" md="3" sm="1">
                <PostHotVue />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import NewsVue from '../News/News.vue';
import PostHotVue from '../Post/PostHot.vue'
export default {
    name: 'MainView',
    components: { NewsVue, PostHotVue }
}
</script>

<style></style>