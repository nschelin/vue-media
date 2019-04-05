<template>
  <div class="home">
    <HomeList />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeList from '../components/HomeList';

export default {
  name: 'home',
  components: {
    HomeList
  }
};
</script>
