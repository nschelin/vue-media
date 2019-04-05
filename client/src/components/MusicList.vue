<template>
    <div>
        <v-list two-line>
            <v-list-tile v-for="album in albums" :key="album._id">
                <v-list-tile-content>
                    <v-list-tile-title class="pl-2 title">
                        {{ album.title }} ({{ album.model }})
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="pl-2">
                        {{ album.artist.title }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action style="margin-right: 5px;">
                    <v-btn small outline color="blue" @click="editAlbum(album)">
                    <span class="white-text">Edit</span>
                    </v-btn>
                </v-list-tile-action>

                <v-list-tile-action>
                    <v-tooltip top>
                    <v-btn slot="activator" small outline color="red" @click="deleteAlbum(album)">
                        <span class="white-text">Delete</span>
                    </v-btn>
                    </v-tooltip>
                </v-list-tile-action>
            </v-list-tile>

        </v-list>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data:() => ({
            album: {
                title: null,
                year: null,
                genres: [],
                media: [],
            }
        }),
        computed: {
            ...mapState({
                albums: state => state.music.albums
            })
        },
        async created() {
            await this.$store.dispatch('getAlbums');
        }
    }
</script>

<style lang="scss" scoped>

.v-list > div {
  margin-bottom: 15px;
}

.white-text {
  color: white;
}

</style>