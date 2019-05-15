<template>
  <v-layout v-if="currentPlayer">
    <v-flex text-xs-center>
      <v-tabs :style="{borderRadius: '4px'}" slider-color="cyan" fixed-tabs>
        <v-tab key="1">Overview</v-tab>
        <v-tab key="matches">Matches</v-tab>
        <p class="v-tabs__item" style="justify-content: flex-end;" v-if="currentPlayer.matches">
          <span style="color: #19E724;">{{ totalWins }}</span>/
          <span style="color: #FF0D00;">{{ totalDefeats }}</span>
          <span class="ml-1">{{ `(OUT OF ${totalMatches})` }}</span>
        </p>
        <v-tab-item key="1">
          <template v-if="!isMobile">
            <v-layout pt-3>
              <v-flex xs3>
                <v-card :style="{borderRadius: '4px'}" class="name-card elevation-10">
                  <v-img
                    :src="currentPlayer.avatar || defaultAvatar"
                    alt="Player Avatar"
                    :style="{borderRadius: '50%'}"
                  />
                  <v-card-title class="justify-center">
                    <h1>{{ currentPlayer.nickname }}</h1>
                  </v-card-title>
                </v-card>
                <v-card class="mt-2 elevation-10" :style="{borderRadius: '4px'}">
                  <v-card-text>
                    <div style="display: inline-flex;">
                      <v-icon>whatshot</v-icon>
                      <h2>Level {{currentPlayer.level}}</h2>
                    </div>
                    <br>
                    <div style="display: inline-flex;">
                      <v-icon>whatshot</v-icon>
                      <h2>Elo {{ currentPlayer.elo }}</h2>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex ml-2>
                <v-card :style="{borderRadius: '4px'}" class="elevation-10">
                  <v-card-title>
                    <v-flex>
                      <div>
                        <h1>Total kills</h1>
                        <span style="font-size: 30px">{{ totalKills }}</span>
                      </div>
                    </v-flex>
                    <v-flex>
                      <div>
                        <h1>Total Assists</h1>
                        <span>{{ totalAssists }}</span>
                      </div>
                    </v-flex>
                    <v-flex>
                      <div>
                        <h1>Total Deaths</h1>
                        <span>{{ totalDeaths }}</span>
                      </div>
                    </v-flex>
                  </v-card-title>
                  <v-card-title>
                    <v-flex>
                      <div>
                        <h1>Total MVPs</h1>
                        <span>{{ totalMvps }}</span>
                      </div>
                    </v-flex>
                    <v-flex>
                      <div>
                        <h1>Total Headshots</h1>
                        <span>{{ totalHeadshots }}</span>
                      </div>
                    </v-flex>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
          <template v-else>
            <v-layout pt-3 row wrap justify-center align-center>
              <v-flex>
                <v-card>
                  <v-img
                    alt="No image!"
                    max-height="200"
                    :src="currentPlayer.avatar || defaultAvatar"
                    style="border-radius: 4px"
                  />
                  <v-card-title class="justify-center">
                    <h1>{{ currentPlayer.nickname }}</h1>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div style="display: inline-flex;">
                      <v-icon>whatshot</v-icon>
                      <h2>Level {{ currentPlayer.level }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div style="display: inline-flex;">
                      <v-icon>whatshot</v-icon>
                      <h2>elo {{ currentPlayer.elo }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div>
                      <h2>Total kills</h2>
                      <h2>{{ totalKills }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div>
                      <h2>Total Assists</h2>
                      <h2>{{ totalAssists }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div>
                      <h2>Total Deaths</h2>
                      <h2>{{ totalDeaths }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div>
                      <h2>Total MVPs</h2>
                      <h2>{{ totalMvps }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
                <v-card class="mt-1">
                  <v-card-title class="justify-center">
                    <div>
                      <h2>Total Headshots</h2>
                      <h2>{{ totalHeadshots }}</h2>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </template>
        </v-tab-item>
        <v-tab-item key="matches">
          <matches-app :matches="currentPlayer.matches"/>
        </v-tab-item>
      </v-tabs>
      <v-fab-transition>
        <v-btn
          color="dark-gray"
          dark
          fixed
          bottom
          right
          fab
          @click="$vuetify.goTo(target, options)"
          v-if="scrollPos > 400"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import matches from '@/components/matches';

export default {
  components: {
    matchesApp: matches
  },
  data: () => ({
    defaultAvatar:
      'https://www.cochinvoyage.com/wp-content/uploads/2016/05/default-blue-personnel.png',
    isMobile: false,
    scrollPos: 0
  }),
  computed: {
    ...mapGetters(['currentPlayer']),
    target: function() {
      return 0;
    },
    options: function() {
      return {
        duration: 1100,
        offset: 100,
        easing: 'easeInOutQuart'
      };
    },
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
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    // SET ISMOBILE TO TRUE IF SCREEN SIZE < 800px
    onResize: function() {
      this.isMobile = window.innerWidth < 800;
    },
    // SET SCROLLPOS TO SCREEN SCROLL Y POSITION
    onScroll: function() {
      this.scrollPos = window.scrollY;
    },
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
  },
  created() {
    if (!this.currentPlayer.nickname) this.$router.push('/');
  }
};
</script>
<style lang="scss">
.v-tabs__wrapper {
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}
.match-card {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
