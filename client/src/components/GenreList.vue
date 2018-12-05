<template>
    <div>
        <div v-for="(g, index) in genres" :key="g._id">
            <span v-if="editIndex === index">
                <input type="text" v-model="g.title" />
                <button type="button" @click="updateGenre(g)">Save</button>
                <button type="button" @click="editIndex = -1">Cancel</button>
            </span>
            <span v-else>
                {{g.title}} 
                <button type="button" @click="editIndex = index">Edit</button> 
                <button type="button" @click="deleteGenre(g)">Delete</button>
            </span>
        </div>
        <GenreNew v-model="isAdded" />
    </div>
</template>

<script>
    import GenreNew from '@/components/GenreNew';
    import genreService from '@/services/genreService';
    export default {
        data() {
            return {
                isAdded: '',
                editIndex: -1,
                genres: []
            }
        },
        watch: {
            async isAdded (newVal, oldVal) {
                if(newVal === true) {
                    await this.getGenres();
                    this.isAdded = false;
                }
            }
        },
        methods: {
            async updateGenre(genre) {
                
                const response = await genreService.updateGenre(genre);
                const newGenre = response.data;
                console.log(`newGenre title: ${newGenre.title}`)
                this.editIndex = -1;
            },
            async deleteGenre(genre) {
                const response = await genreService.deleteGenre(genre);
                const result = response.data;
                if(result.success) {
                    this.getGenres();
                }
                else {
                    console.log(result.error.message);
                }
            },
            async getGenres() {
                const response = await genreService.getGenres();
                this.genres = response.data;
            } 
        },
        async created() {
            await this.getGenres();
        },
        components: {
            GenreNew
        }    
    }
</script>

<style scoped>

</style>