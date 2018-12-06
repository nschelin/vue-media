<template>
    <div>
        <v-list>
            <v-list-tile 
                class="list-title"
                v-for="(g, index) in genres" :key="g._id"
                >
                <template v-if="editIndex === index">
                    <v-list-tile-content>
                        <v-text-field label="Genre" color="white" v-model="g.title"></v-text-field>
                    </v-list-tile-content>
                    <v-list-tile-action style="margin-right: 5px;">
                        <v-btn small outline color="blue" @click="updateGenre(g)">
                            <span class="white-text">
                                Save
                            </span>
                        </v-btn>
                    </v-list-tile-action>
                    
                    <v-list-tile-action>
                        <v-btn small outline color="red" @click="editIndex = -1">
                            <span class="white-text">
                                Cancel
                            </span>
                        </v-btn>
                    </v-list-tile-action>
                </template> 
                <template v-else>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ g.title }}
                        </v-list-tile-title>
                    </v-list-tile-content>

                
                    <v-list-tile-action style="margin-right: 5px;">
                        <v-btn small outline color="blue" @click="editIndex = index">
                            <span class="white-text">
                                Edit
                            </span>
                        </v-btn>
                    </v-list-tile-action>
                    
                    <v-list-tile-action>
                        <v-btn small outline color="red" @click="deleteGenre(g)">
                            <span class="white-text">
                                Delete
                            </span>
                        </v-btn>
                    </v-list-tile-action>
                </template>
            </v-list-tile>
        </v-list>
        <!-- <div v-for="(g, index) in genres" :key="g._id">
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
        </div> -->
        <!-- <GenreNew v-model="isAdded" /> -->
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

<style lang="scss" scoped>
    .list-tile, 
    .list-title {
        height: 60px !important;
    }

    .list-title > .v-list__tile {
        height: 60px !important;
    }

    .white-text {
        color: white;
    }
</style>