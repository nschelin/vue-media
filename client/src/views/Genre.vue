<template>
    <div>
        <div v-for="g in genres" :key="g._id">
            {{g.title}}
            
        </div>
    </div>
</template>

<script>
    import genreService from '@/services/genreService';
    export default {
        data() {
            return {
                genres: []
            }
        },
        async created() {
            const response = await genreService.getGenres();
            this.genres = response.data;
        }
    }
</script>

<style scoped>

</style>