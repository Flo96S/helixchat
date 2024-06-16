import { createStore, Store } from 'vuex';
import type { Commit } from 'vuex/types/index.js';

interface State {
  fontSize: string;
  backgroundImage: string;
  theme: string;
  messages: string[];
}

const store = createStore<State>({
  state: {
    fontSize: localStorage.getItem('fontSize') || 'medium',
    backgroundImage: localStorage.getItem('backgroundImage') || 'Network',
    theme: localStorage.getItem('theme') || 'dark',
    messages: [],
  },
  mutations: {
    setFontSize(state: State, fontSize: string) {
      state.fontSize = fontSize;
      localStorage.setItem('fontSize', fontSize);
    },
    setBackgroundImage(state: State, image: string) {
      state.backgroundImage = image;
      localStorage.setItem('backgroundImage', image);
    },
    setTheme(state: State, theme: string) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
  },
  actions: {
    changeFontSize({ commit }: { commit: Commit }, fontSize: string) {
      commit('setFontSize', fontSize);
    },
    changeBackground({ commit }: { commit: Commit }, image: string) {
      commit('setBackground', image);
    },
    changeTheme({ commit }: { commit: Commit }, theme: string) {
      commit('setTheme', theme);
    },
  },
  getters: {
    fontSize: (state: State) => state.fontSize,
    backgroundImage: (state: State) => state.backgroundImage,
    theme: (state: State) => state.theme,
  },
});

export default store as Store<State>;