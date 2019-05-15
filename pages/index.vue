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
              <nuxt-link to="/stats">
                <v-img
                  alt="No image!"
                  max-height="200"
                  :src="player.avatar || defaultAvatar"
                  @click="setCurrentPlayer(player)"
                />
              </nuxt-link>
              <v-card-actions class="justify-center">
                <v-card-title @click="setCurrentPlayer(player)">
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
    ...mapActions({
      setPlayer: 'setCurrentPlayer'
    }),
    setCurrentPlayer: function(player) {
      this.setPlayer(player);
    }
  }
};
</script>
<style lang="scss">
.player-name {
  text-decoration: none;
  color: #ffffff;
  &:hover {
    color: #000000;
  }
}
</style>

