<template>
    <v-container>
      <v-layout row >
        <v-text-field
          ref="ng"
          label="Genre"
          color="white"
          v-model="value.title"
          @keyup.enter="addGenre()"
        ></v-text-field>
      </v-layout>
      <v-layout row>
        <v-autocomplete 
            :items="mediaTypes"
            v-model="value.mediaTypes"
            multiple
            small-chips
            deletable-chips
            autocomplete 
            item-text="title"
            item-value="_id"
            >
        </v-autocomplete>
      </v-layout>        
      <v-layout row justify-end>
        <div>
          <v-btn color="blue" @click="save()">Save</v-btn>
          <v-btn color="red" @click="cancel()">Cancel</v-btn>
        </div>
      </v-layout>
    </v-container>
</template>

<script>

import { mapState } from 'vuex';

export default {
  props: ['value'],
  computed: {
    ...mapState({
      mediaTypes: state => state.mediaTypes.mediaTypes
    })
  },
methods: {
    save() {
      this.$emit('updated', this.value);
    },
    cancel() {
      this.$emit('cancelled');
    }
  },
};
</script>

<style scoped>
</style>
