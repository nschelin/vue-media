<template>
  <div>
    <v-list>

      <v-list-tile class="list-title" v-for="(g, index) in genres" :key="g._id">
        
        <template v-if="editIndex === index">
          <v-list-tile-content>
            <v-text-field label="Genre" color="white" v-model="g.title"></v-text-field>
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
        
        </template>
        <template v-else>

          <v-list-tile-content>
            <v-list-tile-title>{{ g.title }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="editIndex = index">
              <span class="white-text">Edit</span>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn small outline color="red" @click="deleteGenre(g)">
              <span class="white-text">Delete</span>
            </v-btn>
          </v-list-tile-action>

        </template>
      </v-list-tile>

    </v-list>

    <v-btn fab fixed bottom right style="margin-right: 20px;" color="blue" slot="activator" @click="showDialog()">
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title primary-title>Add Genre</v-card-title>
        <!-- <GenreNew v-model="isAdded" /> -->
        <v-container>
          <v-text-field
            ref="ng"
            label="Genre"
            color="white"
            v-model="newGenre"
            @keyup.enter="addGenre()"
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <div style>
            <v-btn color="blue" @click="addGenre()">Save</v-btn>
            <v-btn color="red" @click="dialog = false; newGenre = ''">Cancel</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import GenreNew from '@/components/GenreNew';
import genreService from '@/services/genreService';
export default {
  data() {
    return {
      dialog: false,
      newGenre: '',
      editIndex: -1,
      genres: []
    };
  },
  methods: {
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        const input = this.$refs.ng.$el.querySelector('input');
        input.focus();
      });
    },
    async addGenre() {
      const response = await genreService.addGenre(this.newGenre);
      const result = response.data;
      if (result.error) {
        // error
        console.log(result.error.code);
      } else {
        this.newGenre = '';
        this.getGenres();
        this.dialog = false;
      }
    },
    async updateGenre(genre) {
      const response = await genreService.updateGenre(genre);
      const newGenre = response.data;
      console.log(`newGenre title: ${newGenre.title}`);
      this.editIndex = -1;
    },
    async deleteGenre(genre) {
      if(confirm(`Delege genre: ${genre.title} ?`)){
        const response = await genreService.deleteGenre(genre);
        const result = response.data;
        if (result.success) {
          this.getGenres();
        } else {
          console.log(result.error.message);
        }
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
    // GenreNew
  }
};
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
