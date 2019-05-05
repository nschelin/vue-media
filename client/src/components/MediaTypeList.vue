<template>
  <div>
    <v-list two-lines>
      <v-list-tile v-for="mediaType in mediaTypes" :key="mediaType._id">
        <v-list-tile-content>
          <v-list-tile-title class="pl-2 title">
            {{ mediaType.title }}
          </v-list-tile-title>
          <v-list-tile-sub-title v-if="mediaType.isUsed" class="pl-2">
            <span class="caption red--text">
              Media Type is Currently in Use</span
            >
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action style="margin-right: 5px;">
          <v-btn small outline color="blue" @click="editMediaType(mediaType)">
            <span class="white-text">Edit</span>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action>
          <v-tooltip top>
            <v-btn
              slot="activator"
              small
              outline
              color="red"
              :disabled="mediaType.isUsed"
              @click="deleteMediaType(mediaType)"
            >
              <span class="white-text">Delete</span>
            </v-btn>
            <span>Media Type is Currently in Use</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-btn
      fab
      fixed
      bottom
      right
      style="margin-right: 20px;"
      color="blue"
      slot="activator"
      @click="showDialog()"
    >
      <v-icon>fa fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title primary-title>Add Media Type</v-card-title>
        <MediaTypeNewEdit
          v-model="mediaType"
          :dialog="dialog"
          @updated="saveMediaType"
          @cancelled="
            dialog = false;
            resetMediaType();
          "
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MediaTypeNewEdit from './MediaTypeNewEdit';

export default {
  data: () => ({
    dialog: false,
    mediaType: {
      title: ''
    }
  }),
  computed: mapState({
    mediaTypes: state => state.mediaTypes.mediaTypes
  }),
  methods: {
    showDialog() {
      this.dialog = true;
      // this.$nextTick(() => {
      //   const input = this.$refs.ng.$el.querySelector('input');
      //   input.focus();
      // });
    },
    resetMediaType() {
      delete this.mediaType._id;
      this.mediaType.title = '';
    },
    async editMediaType(mediaType) {
      this.mediaType = { ...mediaType };
      this.showDialog();
    },
    async saveMediaType(mediaType) {
      let result = null;
      if (!mediaType._id) {
        result = await this.$store.dispatch('addMediaType', mediaType);
      } else {
        result = await this.$store.dispatch('updateMediaType', mediaType);
      }

      if (result) {
        this.dialog = false;
        this.resetMediaType();
      }
    },
    async deleteMediaType(mediaType) {
      if (confirm(`Delete media type: ${mediaType.title}?`)) {
        this.$store.dispatch('deleteMediaType', mediaType);
      }
    }
  },
  async created() {
    await this.$store.dispatch('getMediaTypes');
  },
  components: {
    MediaTypeNewEdit
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
