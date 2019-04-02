<template>
  <div>
    <v-list>

      <v-list-tile  v-for="mediaType in mediaTypes" :key="mediaType._id">
          <v-list-tile-content>
            <v-list-tile-title class="pl-2 title">
                {{ mediaType.title }}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="editMediaType(mediaType)">
              <span class="white-text">Edit</span>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn small outline color="red" @click="deleteMediaType(mediaType)">
              <span class="white-text">Delete</span>
            </v-btn>
          </v-list-tile-action>

      </v-list-tile>

    </v-list>

    <v-btn fab fixed bottom right style="margin-right: 20px;" color="blue" slot="activator" @click="showDialog()">
      <v-icon>fa fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title primary-title>Add Media Type</v-card-title>
        <v-container>
          <v-text-field
            ref="ng"
            label="Media Type"
            color="white"
            v-model="mediaType.title"
            @keyup.enter=""
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <div style>
            <v-btn color="blue" @click="saveMediaType()">Save</v-btn>
            <v-btn color="red" @click="dialog = false; newMediaType = ''">Cancel</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    mediaType: {
        title: ''
    },
  }),
  computed: mapState({
      mediaTypes: state => state.mediaTypes.mediaTypes
  }),
  methods: {
    showDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        const input = this.$refs.ng.$el.querySelector('input');
        input.focus();
      });
    },
    resetMediaType() {
        delete this.mediaType._id;
        this.mediaType.title = '';
    },
    async editMediaType (mediaType) {
        this.mediaType = { ...mediaType };
        this.showDialog();
    },
    async saveMediaType() {
        let result = null;
        if(!this.mediaType._id) {
            result = await this.$store.dispatch('addMediaType', this.mediaType);
        }
        else {
            result = await this.$store.dispatch('updateMediaType', this.mediaType);
        }

        if(result) {
            this.dialog = false;
            this.resetMediaType();
        }
    },
    async deleteMediaType(mediaType) {
    if(confirm(`Delete media type: ${mediaType.title}?`)){
        this.$store.dispatch('deleteMediaType', mediaType);
      }
    }
  },
  async created() {
    await this.$store.dispatch('getMediaTypes');  
  },
  components: {
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
