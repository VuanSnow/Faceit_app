<template>
  <v-layout>
    <v-flex>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            xs12
            md6
            lg3
            v-for="(player, index) in players"
            :key="index"
            :style="{marginBottom: '1em', borderRadius: '4px'}"
          >
            <v-card class="elevation-10">
              <v-img alt="No image!" max-height="200" :src="player.avatar || defaultAvatar"/>
              <v-card-actions class="justify-center">
                <v-card-title @click="temp(player)">
                  <nuxt-link to="/stats" class="player-name">{{player.nickname}}</nuxt-link>
                </v-card-title>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    defaultAvatar:
      'https://www.cochinvoyage.com/wp-content/uploads/2016/05/default-blue-personnel.png'
  }),
  computed: {
    ...mapGetters(['players'])
  },

  methods: {
    nameLog: function(name) {
      console.log(name);
    },
    temp: function(player) {
      // const data = { id, name };
      this.setPlayer(player);
    },
    ...mapActions({
      setPlayer: 'setCurrentPlayer'
    })
  }
};
</script>
<style lang="scss" scoped>
.player-name {
  text-decoration: none;
  color: #ffffff;
  &:hover {
    color: #000000;
  }
}
</style>

