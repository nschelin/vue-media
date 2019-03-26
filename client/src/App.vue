<template>
  <v-app id="app" dark>
      <v-navigation-drawer
        v-model="drawer"
        clipped
        fixed
        app
      >
        <v-list dense>
          <v-list-tile @click="$router.push('/')">
              <v-list-tile-action>
                <v-icon>fas fa-home</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Home
                </v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/genres')">
            <v-list-tile-action>
              <v-icon>fas fa-theater-masks</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              Genre
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push('/music')">
            <v-list-tile-action>
              <v-icon>fas fa-music</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              Music
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link to="/" class="toolbar-title">
          <v-toolbar-title>
            Media Database    
          </v-toolbar-title>
        </router-link>
      </v-toolbar>
      <v-content>
        <v-container>
          <v-layout align-center justify-center row>
            <v-flex sm12 md12 lg12>
              <router-view />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>&copy; {{ year }}</span>
      </v-footer>
  </v-app>

  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/genres">Genres</router-link>
    </div>
    <router-view/>
  </div> -->
</template>

<script>
export default {
  watch: {
    // eslint-disable-next-line
    $route(from, to) {
      this.drawer = false;
    }
  },
  data: () => ({
    drawer: false,
    year: new Date().getFullYear()
  })
};
</script>


<style lang="scss">
#app {
  .toolbar-title {
    text-decoration: none;
    color: #fff;
  }
}
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
