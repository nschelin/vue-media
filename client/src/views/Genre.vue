<template>
  <div>
    <div>
      <h1>Genres</h1>
    </div>
    <div>
      <GenreList />
    </div>
  </div>
</template>

<script>
import GenreList from '@/components/GenreList';
export default {
  name: 'genres',

  components: {
    GenreList
  }
};
</script>

<style scoped></style>
