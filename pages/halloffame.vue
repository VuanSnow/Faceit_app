<template>
  <v-layout pt-3>
    <v-flex>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3">
        <v-card-title class="justify-center">
          <h1>Most Mvp</h1>
        </v-card-title>
        <h2>{{getMost('mvps').nickname}} - {{getMost('mvps').total}}</h2>
      </v-card>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 mt-2">
        <v-card-title class="justify-center">
          <h1>Most Kills</h1>
        </v-card-title>
        <h2>{{getMost('kills').nickname}} - {{getMost('kills').total}}</h2>
      </v-card>
      <v-card :style="{borderRadius: '4px'}" class="text-xs-center pb-3 mt-2">
        <v-card-title class="justify-center">
          <h1>Most Deaths</h1>
        </v-card-title>
        <h2>{{getMost('deaths').nickname}} - {{getMost('deaths').total}}</h2>
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
      console.error('Title:', stat);
      console.table(playersArr);
      return playersArr[0];
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>