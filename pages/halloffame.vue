<template>
  <v-layout row wrap pt-3 v-if="players.length > 1">
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Mvps</h1>
        </v-card-title>
        <h2>{{getMost('mvps') }}</h2>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Kills</h1>
        </v-card-title>
        <h2>{{ getMost('kills') }}</h2>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Deaths</h1>
        </v-card-title>
        <h2>{{ getMost('deaths') }}</h2>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Assists</h1>
        </v-card-title>
        <h2>{{ getMost('assists') }}</h2>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Aces</h1>
        </v-card-title>
        <h2>{{ getMost('penta_kills') }}</h2>
      </v-card>
    </v-flex>
    <v-flex xs12 md6 lg4>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 ma-2">
        <v-card-title class="justify-center">
          <h1>Most Headshots</h1>
        </v-card-title>
        <h2>{{ getMost('headshots') }}</h2>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['players'])
  },
  methods: {
    getMost: function(stat) {
      var playersArr = [];
      this.players.map((player, index) => {
        var total = 0;
        player.matches.map(match => (total = total + match[stat]));
        playersArr.push({ nickname: player.nickname, total });
      });
      playersArr.sort((a, b) =>
        a.total < b.total ? 1 : b.total < a.total ? -1 : 0
      );
      return playersArr[0].nickname + ' - ' + playersArr[0].total;
    }
  },
  created() {
    if (this.players.length < 1) this.$router.push('/');
  }
};
</script>

<style lang="scss" scoped>
</style>