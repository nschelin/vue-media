<template>
  <div>
    <v-list two-line>

      <v-list-tile  v-for="(mt, index) in mediaTypes" :key="mt._id">
        
        <template v-if="editIndex === index">
          <v-list-tile-content>
            <v-text-field label="Media Type" color="white" v-model="mt.title"></v-text-field>
          </v-list-tile-content>
          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="">
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
                {{ mt.title }}
            </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action style="margin-right: 5px;">
            <v-btn small outline color="blue" @click="editIndex = index">
              <span class="white-text">Edit</span>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-action>
            <v-btn small outline color="red" @click="">
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
        <v-card-title primary-title>Add Media Type</v-card-title>
        <v-container>
          <v-text-field
            ref="ng"
            label="Media Type"
            color="white"
            v-model="newMediaType"
            @keyup.enter=""
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <div style>
            <v-btn color="blue" @click="">Save</v-btn>
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
  data() {
    return {
      dialog: false,
      newMediaType: '',
      editIndex: -1,
    };
  },
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
