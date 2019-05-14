export const strict = false;

export const state = () => ({
  players: [],
  currentPlayer: {}
});

export const getters = {
  players: state => state.players,
  currentPlayer: state => state.currentPlayer
};

export const mutations = {
  SET_PLAYERS: (state, payload) => (state.players = payload),
  SET_CURRENTPLAYER: (state, payload) => (state.currentPlayer = payload)
};

export const actions = {
  setPlayers: ({ commit }, payload) => commit('SET_PLAYERS', payload),
  setCurrentPlayer: ({ commit }, payload) => commit('SET_CURRENTPLAYER', payload)
};