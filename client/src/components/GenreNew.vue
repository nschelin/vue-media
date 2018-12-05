<template>
    <div>
        <label for="genreTitle">
            <input id="genreTitle" type="text" v-model="genreTitle" @keyup.enter="addGenre()" />
        </label>
        <button type="button" @click="addGenre()">Add</button> 
    </div>
</template>

<script>
    import genreService from '@/services/genreService';

    export default {
        model: {
            prop: 'isAdded',
            event: 'added'
        },
        data() {
            return {
                genreTitle: ''
            }
        },
        methods: {
            async addGenre() {
                let isAdded = true;
                const response = await genreService.addGenre(this.genreTitle);
                const result = response.data;
                if(result.error) { // error
                    console.log(result.error.code);
                    isAdded = false;
                }
                else {
                    this.genreTitle = '';
                }

                this.$emit('added', isAdded);
            }
        },
        created() {
            this.genreTitle = '';
        }
    }
</script>

<style scoped>

</style>