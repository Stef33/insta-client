import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api_url: 'http://localhost:3000/',
    isAuthenticated: false,
    feed: [
      {
        id: 0,
        user_id: 0,
        display_name: 'Darth Vador',
        image: 'https://media.anakinworld.com/uploads/entries/page_maxi/personnage-darth-vader.jpg',
        desc: 'Your lack of faith is disturbing...',
        timestamp: 1618790400000
      },
      {
        id: 1,
        user_id: 1,
        display_name: 'General Grievous',
        image: 'https://static.wikia.nocookie.net/frstarwars/images/d/d9/Grievous_t%C3%AAte.jpg/revision/latest/scale-to-width-down/700?cb=20160514112949',
        desc: 'Your lightsabers will make a fine addition to my collection.',
        timestamp: 1618876800000
      },
      {
        id: 2,
        user_id: 2,
        display_name: 'Moff Gideon',
        image: 'https://www.tomsguide.fr/content/uploads/sites/2/2020/09/moff-gideon.jpg',
        desc: 'Your astute panic suggests that you understand your situation.',
        timestamp: 1618963200000
      }
    ]
  },
  mutations: {
    isAuthenticated (state) {
      if (localStorage.getItem('jwt') != null) {
        state.isAuthenticated = true
      } else {
        state.isAuthenticated = false
      }
    },
    login (state, token) {
      state.isAuthenticated = true
      localStorage.setItem('jwt', token)
      this.$router.push('/')
    },
    logout (state) {
      state.isAuthenticated = false
      localStorage.removeItem('jwt')
      this.$router.push('/login')
    }
  }
});
