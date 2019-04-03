<template>
  <div>
    <v-list two-line>
      <!-- Data -->
      <v-list-tile class="tile" v-for="genre in sortedGenres" :key="genre._id">
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

          <!-- Edit/Delete Action Buttons -->
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
      </v-list-tile>

    </v-list>

    <!-- Add Button -->
    <v-btn fab fixed bottom right style="margin-right: 20px;" color="blue" slot="activator" @click="showDialog()">
      <v-icon>fa fa-plus</v-icon>
    </v-btn>

    <!-- Dialog -->
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title primary-title>Add/Edit Genre</v-card-title>
        <GenreNewEdit v-model="genre" :dialog="dialog" @updated="saveGenre" @cancelled="dialog = false; resetGenre();" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
 import GenreNewEdit from '@/components/GenreNewEdit';
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    genre: { 
      title: '',
      mediaTypes: []
    },
  }),
  computed: {
    ...mapState({
      genres: state => state.genres.genres,
    }),
    sortedGenres() {
      return this.genres.sort((a,b) => a.title > b.title ? 1 : -1);
    } 
  },
  methods: {
    editGenre(genre) {
      this.genre = Object.assign({}, genre);
      this.showDialog();
    },
    showDialog() {
      this.dialog = true;
      // this.$nextTick(() => {
      //   const input = this.$refs.ng.$el.querySelector('input');
      //   input.focus();
      // });
    },
    resetGenre() {
      delete this.genre._id;
      this.genre.title = '';
      this.genre.mediaTypes = [];
    },

    async saveGenre(genre) {
      let result = null;
      if(genre._id) {
        result = await this.$store.dispatch('updateGenre', genre);
      }
      else {
        result = await this.$store.dispatch('addGenre', genre);
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
      ]);
  },
  components: {
     GenreNewEdit
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
