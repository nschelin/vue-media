<template>
  <div>
    <div>
      <h1>Albums</h1>
    </div>
    <div>
      <MusicList />
    </div>
  </div>
</template>

<script>
import MusicList from '../components/MusicList';

export default {
  name: 'music',
  components: {
    MusicList
  }
};
</script>

<style scoped></style>
