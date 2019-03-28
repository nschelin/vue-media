<template>
  <div>
    <v-list two-line>

      <v-list-tile  v-for="(g, index) in genres" :key="g._id">
        
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
            <v-list-tile-title class="pl-2 title">
                {{ g.title }}
            </v-list-tile-title>
            <div>
              <v-chip label color="primary" outline text-color="white" v-for="mt in g.mediaTypes" :key="mt._id">{{ mt.title }}</v-chip>
            </div>
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
      <v-icon>fa fa-plus</v-icon>
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
import { mapState } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      newGenre: '',
      editIndex: -1,
    };
  },
  computed: mapState(['genres']),
  methods: {
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        const input = this.$refs.ng.$el.querySelector('input');
        input.focus();
      });
    },
    async addGenre() {
      const result = await this.$store.dispatch('addGenre', this.newGenre);
      if(result) {
        this.newGenre = '';
        this.dialog = false;
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
        this.editIndex = -1;
      }
    }
    // async addGenre() {
    //   const response = await genreService.addGenre(this.newGenre);
    //   const result = response.data;
    //   if (result.error) {
    //     // error
    //     console.log(result.error.code);
    //   } else {
    //     this.newGenre = '';
    //     this.getGenres();
    //     this.dialog = false;
    //   }
    // },
    // async updateGenre(genre) {
    //   const response = await genreService.updateGenre(genre);
    //   const newGenre = response.data;
    //   console.log(`newGenre title: ${newGenre.title}`);
    //   this.editIndex = -1;
    // },
    // async deleteGenre(genre) {
    //   if(confirm(`Delete genre: ${genre.title} ?`)){
    //     const response = await genreService.deleteGenre(genre);
    //     const result = response.data;
    //     if (result.success) {
    //       this.getGenres();
    //     } else {
    //       console.log(result.error.message);
    //     }
    //   }
    // },
  },
  async created() {
    await this.$store.dispatch('getGenres');  
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
// .list-tile,
// .list-title {
//   height: 60px !important;
// }

// .list-title > .v-list__tile {
//   height: 60px !important;
// }

.white-text {
  color: white;
}
</style>
