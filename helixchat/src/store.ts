import { createStore, Store } from 'vuex';
import type { Commit } from 'vuex/types/index.js';

interface State {
  fontSize: string;
  backgroundImage: string;
}

const store = createStore<State>({
  state: {
    fontSize: localStorage.getItem('fontSize') || 'medium',
    messages: [],
    backgroundImage: localStorage.getItem('backgroundImage') || 'stars',
  },
  mutations: {
    setFontSize(state: State, fontSize: string) {
      state.fontSize = fontSize;
      localStorage.setItem('fontSize', fontSize);
    },
    setBackground(state: State, image: string) {
      state.backgroundImage = image;
      localStorage.setItem('backgroundImage', image);
    },
  },
  actions: {
    changeFontSize({ commit }: { commit: Commit }, fontSize: string) {
      commit('setFontSize', fontSize);
    },
  },
  getters: {
    fontSize: (state: State) => state.fontSize,
    backgroundImage: (state: State) => state.backgroundImage,
  },
});

export default store as Store<State>;
