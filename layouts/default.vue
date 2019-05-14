<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'apps',
          title: 'Players',
          to: '/'
        },
        {
          icon: 'stars',
          title: 'Stats',
          to: '/halloffame'
        }
      ],
      title: ''
    };
  },
  methods: {
    ...mapActions(['setPlayers'])
  },
  computed: {
    ...mapGetters(['players'])
  },
  async created() {
    let players = [];
    axios
      .get(`/api`)
      .then(response => (players = response.data))
      .then(() => {
        players.map((player, index) => {
          const { player_guid: id } = player;
          // GET MATCHES FOR ALL PLAYERS
          axios
            .get(`/api/matches?id=${id}`)
            .then(response => this.$set(player, 'matches', response.data))
            .catch(err => console.error('Matches endpoint error:', err));
          // GET ELO FOR ALL PLAYERS
          axios
            .get(`/api/elo?id=${id}`)
            .then(response => this.$set(player, 'elo', response.data))
            .catch(err => console.error('Elo endpoint error:', err));
          // GET FACEIT DATA FOR ALL PLAYERS (FACEIT LEVEL AND AVATAR LINK)
          axios
            .get(`/api/faceit?id=${id}`)
            .then(response => {
              const { avatar, level } = response.data;
              this.$set(player, 'avatar', avatar);
              this.$set(player, 'level', level);
            })
            .catch(err => console.error('Faceit endpoint error:', err));
        });
      })
      .catch(err => console.error('Api endpoint error:', err))
      .finally(() => this.setPlayers(players));
  }
};
</script>
<style lang="scss">
body {
  background-color: #303030;
}
</style>
