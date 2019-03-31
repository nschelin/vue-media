<template>
  <div>
    <v-list two-line>
      <v-list-tile class="tile" v-for="genre in genres" :key="genre._id">

        <!-- <template v-if="editIndex === index">

          <v-list-tile-content>
            
            <v-text-field label="Genre" color="white" v-model="g.title"></v-text-field>
            
            <v-select 
              :items="mediaTypes"
              v-model="g.mediaTypes"
              multiple
              chips
              item-text="title"
              item-value="_id"
              ></v-select>

          </v-list-tile-content>

          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="updateGenre(g)">
              <span class="white-text">Save</span>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn small outline color="red" @click="editIndex = -1">
              <span class="white-text">Cancel</span>
            </v-btn>
          </v-list-tile-action>
        
        </template> -->

        <!-- <template v-else> -->
        <template>  
          <v-list-tile-content>
            <v-list-tile-title class="pl-2 title">
                {{ genre.title }}
            </v-list-tile-title>
            <div>
              <v-chip label color="primary" 
                      outline 
                      text-color="white" 
                      v-for="mediaType in genre.mediaTypes" :key="mediaType._id">
                      {{ mediaType.title }}
                </v-chip>
            </div>
          </v-list-tile-content>

          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="editGenre(genre)">
              <span class="white-text">Edit</span>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn small outline color="red" @click="deleteGenre(genre)">
              <span class="white-text">Delete</span>
            </v-btn>
          </v-list-tile-action>

        </template>
      </v-list-tile>

    </v-list>

    <v-btn fab fixed bottom right style="margin-right: 20px;" color="blue" slot="activator" @click="showDialog()">
      <v-icon>fa fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title primary-title>Add/Edit Genre</v-card-title>
        <!-- <GenreNew v-model="isAdded" /> -->
        <v-container>
          <v-text-field
            ref="ng"
            label="Genre"
            color="white"
            v-model="genre.title"
            @keyup.enter="addGenre()"
          ></v-text-field>
          
          <!-- autocomplete deprecated -->
          <v-select 
              :items="mediaTypes"
              v-model="genre.mediaTypes"
              multiple
              chips
              deletable-chips
              autocomplete 
              item-text="title"
              item-value="_id"
              ></v-select>
        </v-container>
        <v-card-actions>
          <div style>
            <v-btn color="blue" @click="addUpdateGenre()">Save</v-btn>
            <v-btn color="red" @click="dialog = false; resetGenre()">Cancel</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import GenreNew from '@/components/GenreNew';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      genre: { 
        title: '',
        mediaTypes: []
      },
    };
  },
  computed: mapState({
    genres: state => state.genres.genres,
    mediaTypes: state => state.mediaTypes.mediaTypes
  }),
  methods: {
    editGenre(genre) {
      this.genre = Object.assign({}, genre);
      this.showDialog();
    },
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        const input = this.$refs.ng.$el.querySelector('input');
        input.focus();
      });
    },
    resetGenre() {
      this.genre.title = '';
      this.genre.mediaTypes = [];
    },

    async addUpdateGenre() {
      let result = null;
      if(this.genre._id) {
        result = await this.$store.dispatch('updateGenre', this.genre);
      }
      else {
        result = await this.$store.dispatch('addGenre', this.genre);
      }

      if(result) {
        this.dialog = false;
        this.resetGenre();
      }
    },

    async deleteGenre(genre) {
      if(confirm(`Delete genre: ${genre.title} ?`)){
        this.$store.dispatch('deleteGenre', genre);
      }
    },

    async updateGenre(genre) {
      const result = await this.$store.dispatch('updateGenre', genre);
      if(result) {
        this.resetGenre();
      }
    }
  },
  async created() {
      await Promise.all([
          this.$store.dispatch('getGenres'),
          this.$store.dispatch('getMediaTypes')
      ]);
  },
  components: {
    // GenreNew
  }
};
</script>

<style lang="scss" scoped>

.v-list > div {
  margin-bottom: 15px;
}

.white-text {
  color: white;
}

</style>
