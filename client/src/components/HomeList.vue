<template>
  <div>
    <h1>Recent Changes</h1>
    <v-list two-line>
      <v-list-tile v-for="item in items" :key="item._id">
        <v-list-tile-content>
          <v-list-tile-title class="pl-2 title">
            {{ item.title }} ({{ item.model }}) - {{ item.artist.title }}
          </v-list-tile-title>
          <v-list-tile-sub-title class="pl-2">
            {{ item.modified | date }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      items: state => {
        const albums = state.music.albums; //.sort((a,b) => a.modified > b.modified ? 1 : -1).slice(0,10);
        // TODO: blend other types here
        const finalItems = [...albums].sort((a, b) =>
          a.modified > b.modified ? 1 : -1
        );
        return finalItems;
      }
    })
  },
  async created() {
    await this.$store.dispatch('getAlbums');
  }
};
</script>

<style scoped></style>
