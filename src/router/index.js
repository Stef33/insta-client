import Vue from "vue";
import VueRouter from "vue-router";
import axios from 'axios';
import store from "../store";
import Home from "../views/Home.vue";
import Post from "../views/Post.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [ 
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newpost',
    name: 'Post',
    component: Post,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.onReady(() => {
  store.commit('isAuthenticated')

  axios.get(store.state.api_url + 'post/getposts')
    .then(response => {
      store.commit('getFeed', response.data)
    })
    .catch(err => {
      if (err) throw err
    })
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (localStorage.getItem('jwt') != null) {
      next({
        path: '/',
        params: { nextUrl: '/' }
      })
    } else {
      next()
    }
  }
})

export default router;
