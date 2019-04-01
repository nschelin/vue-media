<template>
  <v-app id="app" dark>
      <v-navigation-drawer
        v-model="drawer"
        clipped
        fixed
        app
      >
        <v-list dense>
          <template v-for="nav in navigation">
          <v-list-tile v-if="nav.path" :key="nav.title" @click="$router.push(nav.path)">
              <v-list-tile-action>
                <v-icon>{{ nav.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ nav.title }}
                </v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>

          <v-list-group v-if="!nav.path" :key="nav.title" :prepend-icon="nav.icon" no-action>
            <v-list-tile slot="activator">
              {{ nav.title }}
            </v-list-tile>
            
            <v-list-tile v-for="subitem of nav.subitems" :key="subitem.title" @click="$router.push(subitem.path)">
              <v-list-tile-action>
                <v-icon>{{ subitem.icon }}</v-icon>
              </v-list-tile-action>
                <v-list-tile-title>
                  {{ subitem.title }}
                </v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link to="/" class="toolbar-title">
          <v-toolbar-title>
            {{ title }}  
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
        <span class="ml-3">&copy; {{ year }}</span>
      </v-footer>
  </v-app>
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
    title: 'Media Database',
    navigation: [
      {
        title: 'Home',
        icon: 'fas fa-home',
        path: '/'
      },
      {
        title: 'Music',
        icon: 'fas fa-music',
        path: '/music'
      },
      {
        title: 'Movies',
        icon: 'fas fa-film',
        path: '/movies'
      },
      {
        title: 'Video Games',
        icon: 'fas fa-gamepad',
        path: '/videogames'
      },
      {
        title: 'Books',
        icon: 'fas fa-book',
        path: '/books'
      },
      {
        title: 'Utilities',
        icon: 'fas fa-tools',
        path: '',
        subitems: [
          {
            title: 'Media Types',
            icon: 'fas fa-compact-disc',
            path: '/mediatypes'
          },
          {
            title: 'Genre',
            icon: 'fas fa-theater-masks',
            path: '/genres'
          },
        ]
      },

    ],
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
