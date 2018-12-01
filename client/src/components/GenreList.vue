<template>
    <div>
        <div v-for="(g, index) in genres" :key="g._id">
            <span v-if="editIndex === index">
                <input type="text" v-model="g.title" /><button type="button" @click="updateGenre(g)">Save</button>
            </span>
            <span v-else>
                {{g.title}} <button type="button" @click="editIndex = index">Edit</button>
            </span>
        </div>
    </div>
</template>

<script>
    import genreService from '@/services/genreService';
    export default {
        data() {
            return {
                editIndex: -1,
                genres: []
            }
        },
        methods: {
            async updateGenre(genre) {
                console.log(genre.title);
                const response = await genreService.updateGenre(genre);
                const newGenre = response.data;
                console.log(`newGenre title: ${newGenre.title}`)
                this.editIndex = -1;
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