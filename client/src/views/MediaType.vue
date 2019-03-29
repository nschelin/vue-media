<template>
    <div>
        <div>
          <h1>Media Types</h1>
        </div>
        <div>
          <MediaTypeList />
        </div>
    </div>
</template>

<script>
import MediaTypeList from '@/components/MediaTypeList';
export default {
  name: 'mediaTypes',

  components: {
    MediaTypeList
  }
};</script>

<style scoped>

</style>