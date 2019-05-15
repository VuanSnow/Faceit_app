<template>
  <div>
    <v-card
      v-for="(match, i) in matches"
      :key="i"
      class="mt-2 match-card"
      :style="{marginBottom: '4px', borderRadius: '4px'}"
      :color="match.win ? '#43A047' : '#C6443E'"
    >
      <v-card-title primary-title>
        <v-flex xs3>
          <p>{{ match.win ? 'Victory' : 'Defeat' }}</p>
          <span>{{ matchDateDiff(match.finished_at) }}</span>
          <p>{{ matchTotalTime(match.started_at, match.finished_at) }}</p>
        </v-flex>
        <v-flex xs3>
          <h3>
            {{ match.win ? `${match.winner_team_score}/${match.loser_team_score}` :
            `${match.loser_team_score}/${match.winner_team_score}`}}
          </h3>
        </v-flex>
        <v-flex xs3>
          <h3>{{ match.kills }}/{{ match.assists }}/{{ match.deaths }}</h3>
          <small>({{ match.kd_ratio }} kdr)</small>
        </v-flex>
        <v-flex xs3>
          <h3>{{ match.map }}</h3>
        </v-flex>
      </v-card-title>
      <v-divider/>
      <v-card-actions>
        <v-list-tile class="grow">
          <v-layout align-center justify-center>
            <v-spacer/>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-img
                  contain
                  class="mr-2"
                  max-height="60"
                  max-width="60"
                  src="https://www.freeiconspng.com/uploads/ak47-hud-csgo-png-icon-25.png"
                  v-on="on"
                />
                <small v-on="on">{{ match.kills }}</small>
              </template>
              <span>Kills</span>
            </v-tooltip>
            <v-spacer/>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-img
                  contain
                  class="mr-2"
                  max-height="40"
                  max-width="40"
                  src="https://cdn2.iconfinder.com/data/icons/bullet-hits-on-different-parts-of-the-body/256/man-shot-bullet-009-512.png"
                  v-on="on"
                />
                <small v-on="on">{{ match.headshots_percentage }}%</small>
              </template>
              <span>Headshot percentage</span>
            </v-tooltip>
            <v-spacer/>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon color="black" medium v-on="on">stars</v-icon>
                <small class="pl-2" v-on="on">{{ match.mvps }}</small>
              </template>
              <span>MVPs</span>
            </v-tooltip>
            <v-spacer/>
          </v-layout>
        </v-list-tile>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['matches'],
  computed: {
    // GET TOTAL KILLS FROM ALL MATCHES
    totalKills: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.map((e, i) => {
          total += e.kills;
        });
      }
      return total;
    },
    // GET TOTAL DEATHS FROM ALL MATCHES
    totalDeaths: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.map((e, i) => {
          total += e.deaths;
        });
      }
      return total;
    },
    // GET TOTAL ASSISTS FROM ALL MATCHES
    totalAssists: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.map((e, i) => {
          total += e.assists;
        });
      }
      return total;
    },
    // GET TOTAL MVP FROM ALL MATCHES
    totalMvps: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.map((e, i) => {
          total += e.mvps;
        });
      }
      return total;
    },
    // GET TOTAL HEADSHOTS FROM ALL MATCHES
    totalHeadshots: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.map((e, i) => {
          total += e.headshots;
        });
      }
      return total;
    },
    // GET TOTAL WIN FROM ALL MATCHES
    totalWins: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.filter((e, i) => {
          if (e.win) total++;
        });
      }
      return total;
    },
    // GET TOTAL DEFEATS FROM ALL MATCHES
    totalDefeats: function() {
      let total = 0;
      if (this.currentPlayer.matches) {
        this.currentPlayer.matches.filter((e, i) => {
          if (!e.win) total++;
        });
      }
      return total;
    },
    // GET AMOUNT OF MATCHES
    totalMatches: function() {
      if (this.currentPlayer.matches) {
        return this.currentPlayer.matches.length;
      }
    }
  },
  methods: {
    // GET MATCH DATE DIFFERENCE FROM CURRENT DATE
    matchDateDiff: function(time) {
      const dateDiff = moment().diff(moment.unix(time), 'days');
      const hourDiff = moment().diff(moment.unix(time), 'hours');
      const minDiff = moment().diff(moment.unix(time), 'minutes');

      if (dateDiff < 1) {
        if (hourDiff < 1) {
          return `${minDiff} minutes ago`;
        } else {
          return `${hourDiff} hours ago`;
        }
      } else if (dateDiff === 1) {
        return `a day ago`;
      } else {
        return `${dateDiff} days ago`;
      }
    },
    // GET MATCH TIME IN MINUTES AND SECONDS
    matchTotalTime: function(start, end) {
      const startTime = moment.unix(start);
      const endTime = moment.unix(end);
      const minDiff = moment(endTime.diff(startTime)).format('m');
      const secDiff = moment(endTime.diff(startTime)).format('s');

      return `${minDiff}m ${secDiff}s`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>